document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
       FILTRO DO CATÁLOGO
       ========================================== */

    const formFiltros = document.getElementById("form-filtros");
    const campoBusca = document.getElementById("busca");
    const campoCategoria = document.getElementById("categoria");

    const cards = document.querySelectorAll(".card-peca");
    const mensagemVazia = document.getElementById("mensagem-vazia");


    function filtrarPecas() {

        const textoBusca = campoBusca.value
            .toLowerCase()
            .trim();

        const categoriaSelecionada =
            campoCategoria.value;

        let quantidadeVisivel = 0;


        cards.forEach(function (card) {

            const nome = card
                .querySelector("h3")
                .textContent
                .toLowerCase();

            const categoria =
                card.dataset.categoria;


            const correspondeBusca =
                nome.includes(textoBusca);

            const correspondeCategoria =
                categoriaSelecionada === "todas" ||
                categoria === categoriaSelecionada;


            if (
                correspondeBusca &&
                correspondeCategoria
            ) {

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


    formFiltros.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            filtrarPecas();

        }
    );


    campoBusca.addEventListener(
        "input",
        filtrarPecas
    );


    campoCategoria.addEventListener(
        "change",
        filtrarPecas
    );


    /* ==========================================
       FORMULÁRIO
       ========================================== */

    const formPeca =
        document.getElementById("form-peca");

    const mensagemFormulario =
        document.getElementById(
            "mensagem-formulario"
        );


    formPeca.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const nome =
                document
                    .getElementById("nome-peca")
                    .value
                    .trim();


            const categoria =
                document
                    .getElementById("tipo-peca")
                    .value;


            const descricao =
                document
                    .getElementById("descricao-peca")
                    .value
                    .trim();


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

        }
    );


    /* ==========================================
       CANVAS - AULA 05
       TESTE COM BOLINHAS
       ========================================== */

    const canvas =
        document.getElementById(
            "canvas-bolinhas"
        );


    if (canvas) {

        const ctx =
            canvas.getContext("2d");


        /* ======================================
           CONFIGURAÇÃO DAS BOLINHAS
           ====================================== */

        const bolinhas = [];


        const quantidadeBolinhas = 20;


        for (
            let i = 0;
            i < quantidadeBolinhas;
            i++
        ) {

            bolinhas.push({

                x:
                    Math.random() *
                    canvas.width,

                y:
                    Math.random() *
                    canvas.height,

                raio:
                    5 +
                    Math.random() * 7,

                velocidadeX:
                    (Math.random() - 0.5) * 2,

                velocidadeY:
                    (Math.random() - 0.5) * 2

            });

        }


        /* ======================================
           DESENHAR BOLINHA
           ====================================== */

        function desenharBolinhas() {

            bolinhas.forEach(
                function (bolinha) {

                    ctx.beginPath();

                    ctx.arc(
                        bolinha.x,
                        bolinha.y,
                        bolinha.raio,
                        0,
                        Math.PI * 2
                    );

                    ctx.fillStyle = "#2e75b6";

                    ctx.fill();

                }
            );

        }


        /* ======================================
           ATUALIZAR MOVIMENTO
           ====================================== */

        function atualizarBolinhas() {

            bolinhas.forEach(
                function (bolinha) {

                    bolinha.x +=
                        bolinha.velocidadeX;

                    bolinha.y +=
                        bolinha.velocidadeY;


                    /*
                     * Quando a bolinha chega
                     * à lateral, ela muda
                     * de direção.
                     */

                    if (
                        bolinha.x -
                            bolinha.raio <= 0 ||

                        bolinha.x +
                            bolinha.raio >=
                            canvas.width
                    ) {

                        bolinha.velocidadeX *= -1;

                    }


                    /*
                     * Quando a bolinha chega
                     * ao topo ou ao fundo,
                     * ela muda de direção.
                     */

                    if (
                        bolinha.y -
                            bolinha.raio <= 0 ||

                        bolinha.y +
                            bolinha.raio >=
                            canvas.height
                    ) {

                        bolinha.velocidadeY *= -1;

                    }

                }
            );

        }


        /* ======================================
           ANIMAÇÃO
           ====================================== */

        function animar() {

            /*
             * Limpa o Canvas antes de
             * desenhar o próximo quadro.
             */

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );


            atualizarBolinhas();

            desenharBolinhas();


            /*
             * Solicita ao navegador
             * o próximo quadro da animação.
             */

            requestAnimationFrame(animar);

        }


        /*
         * Inicia a animação.
         */

        animar();

    }

});