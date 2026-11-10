document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
       AULA 10 - JS FUNDAMENTOS (PARTE 2)
       Carrinho de Compras, Reduce e Find
       ========================================== */
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
    
    // Elementos do Carrinho
    const containerCarrinho = document.getElementById("itens-carrinho");
    const totalCarrinhoElement = document.getElementById("total-carrinho");
    let carrinho = [];

    // Função para renderizar as peças na tela
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

                card.innerHTML = `
                    <img src="${peca.imagem}" alt="${peca.nome}">
                    <h3>${peca.nome}</h3>
                    <p style="font-weight: bold; color: #2e75b6; margin: 10px 0;">R$ ${peca.preco.toFixed(2)}</p>
                    <button class="btn-comprar" data-id="${peca.id}" style="padding: 8px; cursor: pointer; background: #2e75b6; color: white; border: none; border-radius: 5px; width: 100%;">Comprar</button>
                `;
                containerCards.appendChild(card);
            });

            // Ativa os botões de comprar
            const botoesComprar = document.querySelectorAll(".btn-comprar");
            botoesComprar.forEach(function (botao) {
                botao.addEventListener("click", function(e) {
                    const idDaPeca = parseInt(e.target.getAttribute("data-id"));
                    adicionarAoCarrinho(idDaPeca);
                });
            });
        }
    }

    // Lógica do Carrinho
    function adicionarAoCarrinho(id) {
        const pecaSelecionada = catalogoPecas.find(function(peca) { return peca.id === id; });
        if(pecaSelecionada) {
            carrinho.push(pecaSelecionada);
            renderizarCarrinho();
        }
    }

    function renderizarCarrinho() {
        if(!containerCarrinho) return;

        if(carrinho.length === 0) {
            containerCarrinho.innerHTML = "<p>O carrinho está vazio.</p>";
            totalCarrinhoElement.textContent = "0.00";
            return;
        }

        containerCarrinho.innerHTML = "";
        carrinho.forEach(function(item, index) {
            const div = document.createElement("div");
            div.style.display = "flex";
            div.style.justifyContent = "space-between";
            div.style.marginBottom = "8px";
            div.style.borderBottom = "1px solid #ccc";
            div.style.paddingBottom = "8px";
            
            div.innerHTML = `
                <span>${item.nome}</span>
                <span>R$ ${item.preco.toFixed(2)} 
                    <button class="btn-remover" data-index="${index}" style="margin-left: 10px; background: red; color: white; border: none; border-radius: 3px; cursor: pointer; padding: 2px 6px;">X</button>
                </span>
            `;
            containerCarrinho.appendChild(div);
        });

        // Soma o total do carrinho usando reduce
        const valorTotal = carrinho.reduce(function(total, item) { return total + item.preco; }, 0);
        totalCarrinhoElement.textContent = valorTotal.toFixed(2);

        const botoesRemover = document.querySelectorAll(".btn-remover");
        botoesRemover.forEach(function(botao) {
            botao.addEventListener("click", function(e) {
                const index = e.target.getAttribute("data-index");
                carrinho.splice(index, 1);
                renderizarCarrinho();
            });
        });
    }

    /* ==========================================
       FILTRO DO CATÁLOGO
       ========================================== */
    const formFiltros = document.getElementById("form-filtros");
    const campoBusca = document.getElementById("busca");
    const campoCategoria = document.getElementById("categoria");

    renderizarPecas(catalogoPecas);

    function filtrarPecas() {
        const textoBusca = campoBusca ? campoBusca.value.toLowerCase().trim() : "";
        const categoriaSelecionada = campoCategoria ? campoCategoria.value : "todas";

        const pecasFiltradas = catalogoPecas.filter(function (peca) {
            const correspondeBusca = peca.nome.toLowerCase().includes(textoBusca);
            const correspondeCategoria = categoriaSelecionada === "todas" || peca.categoria === categoriaSelecionada;
            
            return correspondeBusca && correspondeCategoria;
        });

        renderizarPecas(pecasFiltradas);
    }

    if (formFiltros) {
        formFiltros.addEventListener("submit", function (event) {
            event.preventDefault();
            filtrarPecas();
        });
    }

    if (campoBusca) campoBusca.addEventListener("input", filtrarPecas);
    if (campoCategoria) campoCategoria.addEventListener("change", filtrarPecas);

    /* ==========================================
       FORMULÁRIO
       ========================================== */
    const formPeca = document.getElementById("form-peca");
    const mensagemFormulario = document.getElementById("mensagem-formulario");

    if (formPeca) {
        formPeca.addEventListener("submit", function (event) {
            event.preventDefault();

            const nome = document.getElementById("nome-peca").value.trim();
            const categoria = document.getElementById("tipo-peca").value;
            const descricao = document.getElementById("descricao-peca").value.trim();

            if (nome === "" || categoria === "" || descricao === "") {
                if(mensagemFormulario) mensagemFormulario.textContent = "Preencha todos os campos do formulário.";
                return;
            }

            if(mensagemFormulario) mensagemFormulario.textContent = "Indicação enviada com sucesso.";
            formPeca.reset();
        });
    }

    /* ==========================================
       AULA 11 - FUNÇÃO E DOM BÁSICO (Modo Escuro)
       ========================================== */
    const btnTema = document.getElementById("btn-tema");
    
    if (btnTema) {
        // Função atrelada ao evento de clique no botão (Manipulação de DOM)
        btnTema.addEventListener("click", function() {
            // Alterna a classe 'tema-escuro' no body da página
            document.body.classList.toggle("tema-escuro");
            
            // Muda o texto do botão dependendo do estado do body
            if (document.body.classList.contains("tema-escuro")) {
                btnTema.textContent = "☀️ Modo Claro";
                btnTema.style.background = "#f4f4f4";
                btnTema.style.color = "#333";
            } else {
                btnTema.textContent = "🌙 Modo Escuro";
                btnTema.style.background = "#333";
                btnTema.style.color = "white";
            }
        });
    }

});