document.addEventListener("DOMContentLoaded", function () {

```
/* =========================================
   FILTRO DO CATÁLOGO
   ========================================= */

const formFiltros = document.getElementById("form-filtros");
const campoBusca = document.getElementById("busca");
const campoCategoria = document.getElementById("categoria");

const cards = document.querySelectorAll(".card-peca");
const mensagemVazia = document.getElementById("mensagem-vazia");


function filtrarPecas() {

    const textoBusca = campoBusca.value
        .toLowerCase()
        .trim();

    const categoriaSelecionada = campoCategoria.value;

    let quantidadeVisivel = 0;


    cards.forEach(function (card) {

        const nome = card
            .querySelector("h3")
            .textContent
            .toLowerCase();

        const categoria = card.dataset.categoria;

        const correspondeBusca =
            nome.includes(textoBusca);

        const correspondeCategoria =
            categoriaSelecionada === "todas" ||
            categoria === categoriaSelecionada;


        if (correspondeBusca && correspondeCategoria) {

            card.style.display = "";

            quantidadeVisivel++;

        } else {

            card.style.display = "none";

        }

    });


    if (quantidadeVisivel === 0) {

        mensagemVazia.hidden = false;

    } else {

        mensagemVazia.hidden = true;

    }

}


formFiltros.addEventListener("submit", function (event) {

    event.preventDefault();

    filtrarPecas();

});


campoBusca.addEventListener("input", filtrarPecas);

campoCategoria.addEventListener("change", filtrarPecas);


/* =========================================
   FORMULÁRIO DE INDICAÇÃO
   ========================================= */

const formPeca = document.getElementById("form-peca");

const mensagemFormulario =
    document.getElementById("mensagem-formulario");


formPeca.addEventListener("submit", function (event) {

    event.preventDefault();

    const nome =
        document.getElementById("nome-peca").value.trim();

    const categoria =
        document.getElementById("tipo-peca").value;

    const descricao =
        document.getElementById("descricao-peca").value.trim();


    if (
        nome === "" ||
        categoria === "" ||
        descricao === ""
    ) {

        mensagemFormulario.textContent =
            "Preencha todos os campos do formulário.";

        return;

    }


    mensagemFormulario.textContent =
        "Indicação enviada com sucesso.";


    formPeca.reset();

});


/* =========================================
   CANVAS - AULA 05
   ========================================= */

const canvas =
    document.getElementById("grafico-pecas");


if (canvas) {

    const ctx = canvas.getContext("2d");


    const dados = [

        {
            nome: "Processador",
            valor: 85
        },

        {
            nome: "Memória RAM",
            valor: 70
        },

        {
            nome: "Placa de vídeo",
            valor: 95
        },

        {
            nome: "SSD",
            valor: 80
        }

    ];


    let progresso = 0;


    function desenharGrafico() {

        /*
         * Limpa o canvas antes de desenhar
         * o próximo quadro da animação.
         */
        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        /* TÍTULO */

        ctx.fillStyle = "#1f4e79";

        ctx.font = "bold 16px Arial";

        ctx.textAlign = "center";

        ctx.fillText(
            "Comparação das peças",
            canvas.width / 2,
            25
        );


        /* LINHAS DO GRÁFICO */

        ctx.strokeStyle = "#cccccc";

        ctx.lineWidth = 1;


        for (let i = 0; i <= 4; i++) {

            const y = 50 + i * 30;

            ctx.beginPath();

            ctx.moveTo(45, y);

            ctx.lineTo(400, y);

            ctx.stroke();

        }


        /* EIXO */

        ctx.strokeStyle = "#555555";

        ctx.beginPath();

        ctx.moveTo(45, 50);

        ctx.lineTo(45, 170);

        ctx.lineTo(400, 170);

        ctx.stroke();


        /* BARRAS */

        const larguraBarra = 55;

        const espacamento = 30;

        const baseY = 170;

        const escala = 1.1;


        dados.forEach(function (item, index) {

            const x =
                60 +
                index *
                (larguraBarra + espacamento);


            const altura =
                Math.min(
                    progresso,
                    item.valor
                ) * escala;


            const y =
                baseY - altura;


            /* Barra */

            ctx.fillStyle = "#2e75b6";

            ctx.fillRect(
                x,
                y,
                larguraBarra,
                altura
            );


            /* Valor */

            ctx.fillStyle = "#222222";

            ctx.font = "bold 12px Arial";

            ctx.textAlign = "center";

            ctx.fillText(
                item.valor,
                x + larguraBarra / 2,
                y - 8
            );


            /* Nome */

            ctx.font = "11px Arial";

            ctx.fillText(
                item.nome,
                x + larguraBarra / 2,
                190
            );

        });


        /*
         * Continua a animação enquanto
         * o progresso não atingir 100.
         */
        if (progresso < 100) {

            progresso += 1;

            requestAnimationFrame(
                desenharGrafico
            );

        }

    }


    desenharGrafico();

}
```

});
