document.addEventListener("DOMContentLoaded", function () {

    const catalogoPecas = [
        { id: 1, nome: "Processador Intel Core i7", categoria: "processador", preco: 1500.00, imagem: "assets/images/processador.jpg" },
        { id: 2, nome: "Placa de Vídeo RTX 3060", categoria: "placa-video", preco: 2200.00, imagem: "assets/images/placa-video.jpg" },
        { id: 3, nome: "Memória RAM 16GB", categoria: "memoria", preco: 350.00, imagem: "assets/images/memoria.jpg" },
        { id: 4, nome: "SSD NVMe 1TB", categoria: "armazenamento", preco: 450.00, imagem: "assets/images/ssd.jpg" },
        { id: 5, nome: "Fonte 650W Corsair", categoria: "fonte", preco: 400.00, imagem: "assets/images/fonte.jpg" },
        { id: 6, nome: "Placa Mãe B550", categoria: "placa-mae", preco: 800.00, imagem: "assets/images/placa-mae.jpg" }
    ];

    const containerCards = document.getElementById("container-cards");
    const mensagemVazia = document.getElementById("mensagem-vazia");
    const containerCarrinho = document.getElementById("itens-carrinho");
    const totalCarrinhoElement = document.getElementById("total-carrinho");
    let carrinho = [];

    /* ==========================================
       AULA 12 - EVENTOS, DOM AVANÇADO E MODAL
       ========================================== */
    const modal = document.getElementById("modal-peca");
    const btnFecharModal = document.getElementById("btn-fechar-modal");
    const modalImg = document.getElementById("modal-img");
    const modalTitulo = document.getElementById("modal-titulo");
    const modalCategoria = document.getElementById("modal-categoria");
    const modalPreco = document.getElementById("modal-preco");
    const modalBtnComprar = document.getElementById("modal-btn-comprar");
    let pecaAtualModal = null; // Guarda a peça aberta no modal

    function abrirModal(id) {
        const peca = catalogoPecas.find(p => p.id === id);
        if (peca) {
            pecaAtualModal = peca;
            modalImg.src = peca.imagem;
            modalImg.alt = peca.nome;
            modalTitulo.textContent = peca.nome;
            modalCategoria.textContent = `Categoria: ${peca.categoria.toUpperCase()}`;
            modalPreco.textContent = `R$ ${peca.preco.toFixed(2)}`;
            modal.style.display = "block";
        }
    }

    function fecharModal() {
        modal.style.display = "none";
        pecaAtualModal = null;
    }

    // Fecha ao clicar no X
    if(btnFecharModal) btnFecharModal.addEventListener("click", fecharModal);

    // BOM: Fecha ao clicar fora do conteúdo do modal (na janela/window)
    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            fecharModal();
        }
    });

    // Botão comprar de dentro do modal
    if(modalBtnComprar) {
        modalBtnComprar.addEventListener("click", function() {
            if(pecaAtualModal) {
                adicionarAoCarrinho(pecaAtualModal.id);
                fecharModal();
            }
        });
    }

    function renderizarPecas(pecas) {
        if (!containerCards) return;
        containerCards.innerHTML = "";

        if (pecas.length === 0) {
            if(mensagemVazia) mensagemVazia.hidden = false;
        } else {
            if(mensagemVazia) mensagemVazia.hidden = true;
            pecas.forEach(function (peca) {
                const card = document.createElement("div");
                card.classList.add("card-peca");
                card.dataset.categoria = peca.categoria;
                // Cursor pointer na imagem para indicar que é clicável
                card.innerHTML = `
                    <img src="${peca.imagem}" alt="${peca.nome}" data-id="${peca.id}" style="cursor:pointer;" class="img-modal-trigger">
                    <h3>${peca.nome}</h3>
                    <p style="font-weight: bold; color: #2e75b6; margin: 10px 0;">R$ ${peca.preco.toFixed(2)}</p>
                    <button class="btn-comprar" data-id="${peca.id}" style="padding: 8px; cursor: pointer; background: #2e75b6; color: white; border: none; border-radius: 5px; width: 100%;">Comprar</button>
                `;
                containerCards.appendChild(card);
            });

            const botoesComprar = document.querySelectorAll(".btn-comprar");
            botoesComprar.forEach(botao => {
                botao.addEventListener("click", e => adicionarAoCarrinho(parseInt(e.target.getAttribute("data-id"))));
            });

            // Ativa os cliques nas imagens para abrir o Modal (Aula 12)
            const imgsModais = document.querySelectorAll(".img-modal-trigger");
            imgsModais.forEach(img => {
                img.addEventListener("click", e => abrirModal(parseInt(e.target.getAttribute("data-id"))));
            });
        }
    }

    function adicionarAoCarrinho(id) {
        const peca = catalogoPecas.find(p => p.id === id);
        if(peca) { carrinho.push(peca); renderizarCarrinho(); }
    }

    function renderizarCarrinho() {
        if(!containerCarrinho) return;
        if(carrinho.length === 0) {
            containerCarrinho.innerHTML = "<p>O carrinho está vazio.</p>";
            totalCarrinhoElement.textContent = "0.00";
            return;
        }
        containerCarrinho.innerHTML = "";
        carrinho.forEach((item, index) => {
            const div = document.createElement("div");
            div.style.display = "flex";
            div.style.justifyContent = "space-between";
            div.style.marginBottom = "8px";
            div.style.borderBottom = "1px solid #ccc";
            div.style.paddingBottom = "8px";
            div.innerHTML = `<span>${item.nome}</span><span>R$ ${item.preco.toFixed(2)} <button class="btn-remover" data-index="${index}" style="margin-left: 10px; background: red; color: white; border: none; border-radius: 3px; cursor: pointer; padding: 2px 6px;">X</button></span>`;
            containerCarrinho.appendChild(div);
        });
        const total = carrinho.reduce((acc, item) => acc + item.preco, 0);
        totalCarrinhoElement.textContent = total.toFixed(2);
        
        document.querySelectorAll(".btn-remover").forEach(botao => {
            botao.addEventListener("click", e => {
                carrinho.splice(e.target.getAttribute("data-index"), 1);
                renderizarCarrinho();
            });
        });
    }

    /* FILTROS E THEMA (Mantidos) */
    const formFiltros = document.getElementById("form-filtros");
    const campoBusca = document.getElementById("busca");
    const campoCategoria = document.getElementById("categoria");
    renderizarPecas(catalogoPecas);

    function filtrarPecas() {
        const textoBusca = campoBusca ? campoBusca.value.toLowerCase().trim() : "";
        const categoriaSelecionada = campoCategoria ? campoCategoria.value : "todas";
        const filtradas = catalogoPecas.filter(p => p.nome.toLowerCase().includes(textoBusca) && (categoriaSelecionada === "todas" || p.categoria === categoriaSelecionada));
        renderizarPecas(filtradas);
    }
    if (formFiltros) formFiltros.addEventListener("submit", e => { e.preventDefault(); filtrarPecas(); });
    if (campoBusca) campoBusca.addEventListener("input", filtrarPecas);
    if (campoCategoria) campoCategoria.addEventListener("change", filtrarPecas);

    const btnTema = document.getElementById("btn-tema");
    if (btnTema) {
        btnTema.addEventListener("click", () => {
            document.body.classList.toggle("tema-escuro");
            btnTema.textContent = document.body.classList.contains("tema-escuro") ? "☀️ Modo Claro" : "🌙 Modo Escuro";
            btnTema.style.background = document.body.classList.contains("tema-escuro") ? "#f4f4f4" : "#333";
            btnTema.style.color = document.body.classList.contains("tema-escuro") ? "#333" : "white";
        });
    }
});