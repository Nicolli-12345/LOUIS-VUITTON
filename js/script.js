/* =====================================================
   PRODUTOS INICIAIS
===================================================== */

let produtos = [

    {
        nome: "Robe Lumière",
        categoria: "Roupas",
        preco: 4800,
        estoque: 12
    },

    {
        nome: "Sac Étoile",
        categoria: "Bolsas",
        preco: 8500,
        estoque: 10
    },

    {
        nome: "Portefeuille Royale",
        categoria: "Carteiras",
        preco: 3200,
        estoque: 15
    },

    {
        nome: "Foulard Élégance",
        categoria: "Lenços",
        preco: 1800,
        estoque: 18
    },

    {
        nome: "Bijoux Éclat",
        categoria: "Joias",
        preco: 7200,
        estoque: 7
    },

    {
        nome: "Sneakers Prestige",
        categoria: "Tênis",
        preco: 4500,
        estoque: 8
    },

    {
        nome: "Escarpin Élégance",
        categoria: "Saltos",
        preco: 5900,
        estoque: 6
    },

    {
        nome: "Accessoire Luxe",
        categoria: "Acessórios",
        preco: 2100,
        estoque: 20
    }

];


let vendas = [];



/* =====================================================
   DINHEIRO
===================================================== */

function dinheiro(valor) {

    return valor.toLocaleString("pt-BR", {

        style: "currency",

        currency: "BRL"

    });

}



/* =====================================================
   ATUALIZAR PRODUTOS
===================================================== */

function atualizarProdutos() {

    const lista =
        document.getElementById("listaProdutos");


    const select =
        document.getElementById("produtoVenda");


    lista.innerHTML = "";


    select.innerHTML =
        '<option value="">Escolha o produto</option>';



    produtos.forEach((produto, index) => {


        /* TABELA */

        lista.innerHTML += `

            <tr>

                <td>
                    ${produto.nome}
                </td>

                <td>
                    ${produto.categoria}
                </td>

                <td>
                    ${dinheiro(produto.preco)}
                </td>

                <td>
                    ${produto.estoque}
                </td>

                <td>

                    <button
                        class="btn-excluir"
                        onclick="excluirProduto(${index})">

                        Excluir

                    </button>

                </td>

            </tr>

        `;



        /* PRODUTOS DISPONÍVEIS PARA VENDA */

        if (produto.estoque > 0) {

            select.innerHTML += `

                <option value="${index}">

                    ${produto.nome}
                    — ${produto.categoria}
                    — ${dinheiro(produto.preco)}

                </option>

            `;

        }

    });


    atualizarIndicadores();

}



/* =====================================================
   EXCLUIR PRODUTO
===================================================== */

function excluirProduto(index) {


    const produto =
        produtos[index];


    const confirmar =
        confirm(
            `Deseja realmente excluir "${produto.nome}"?`
        );


    if (!confirmar) {

        return;

    }


    produtos.splice(index, 1);


    atualizarProdutos();


    alert(
        "Produto excluído com sucesso!"
    );

}



/* =====================================================
   CADASTRAR PRODUTO
===================================================== */

document
    .getElementById("produtoForm")
    .addEventListener(
        "submit",
        function(e) {

            e.preventDefault();


            const nome =
                document
                    .getElementById("produtoNome")
                    .value
                    .trim();


            const categoria =
                document
                    .getElementById("categoria")
                    .value;


            const preco =
                Number(
                    document
                        .getElementById("preco")
                        .value
                );


            const estoque =
                Number(
                    document
                        .getElementById("quantidade")
                        .value
                );



            const novoProduto = {

                nome: nome,

                categoria: categoria,

                preco: preco,

                estoque: estoque

            };


            produtos.push(
                novoProduto
            );


            this.reset();


            atualizarProdutos();


            alert(
                "Produto cadastrado com sucesso!"
            );

        }
    );



/* =====================================================
   REGISTRAR VENDA
===================================================== */

document
    .getElementById("vendaForm")
    .addEventListener(
        "submit",
        function(e) {

            e.preventDefault();



            const index =
                Number(
                    document
                        .getElementById("produtoVenda")
                        .value
                );



            const quantidade =
                Number(
                    document
                        .getElementById("qtdVenda")
                        .value
                );



            const pagamento =
                document
                    .getElementById("pagamento")
                    .value;



            const produto =
                produtos[index];



            /* VERIFICAR PRODUTO */

            if (!produto) {

                alert(
                    "Escolha um produto."
                );

                return;

            }



            /* VERIFICAR QUANTIDADE */

            if (quantidade <= 0) {

                alert(
                    "Digite uma quantidade válida."
                );

                return;

            }



            /* VERIFICAR ESTOQUE */

            if (
                quantidade >
                produto.estoque
            ) {

                alert(

                    `Estoque insuficiente!\n\n` +

                    `Produto: ${produto.nome}\n` +

                    `Categoria: ${produto.categoria}\n` +

                    `Disponível: ${produto.estoque}`

                );

                return;

            }



            /* DIMINUIR ESTOQUE */

            produto.estoque -= quantidade;



            /* REGISTRAR VENDA */

            vendas.push({

                produto:
                    produto.nome,

                categoria:
                    produto.categoria,

                quantidade:
                    quantidade,

                valor:
                    produto.preco *
                    quantidade,

                pagamento:
                    pagamento

            });



            /* LIMPAR */

            this.reset();



            /* ATUALIZAR */

            atualizarProdutos();



            /* CONFIRMAÇÃO */

            alert(

                `Venda registrada com sucesso!\n\n` +

                `Produto: ${produto.nome}\n` +

                `Categoria: ${produto.categoria}\n` +

                `Quantidade: ${quantidade}\n` +

                `Pagamento: ${pagamento}\n` +

                `Total: ${dinheiro(
                    produto.preco *
                    quantidade
                )}`

            );

        }
    );



/* =====================================================
   INDICADORES
===================================================== */

function atualizarIndicadores() {


    let faturamento = 0;

    let estoque = 0;

    let produtosVendidos = {};

    let pagamentos = {};



    /* CALCULAR VENDAS */

    vendas.forEach(venda => {


        faturamento +=
            venda.valor;



        produtosVendidos[
            venda.produto
        ] =

            (
                produtosVendidos[
                    venda.produto
                ] || 0
            )

            +

            venda.quantidade;



        pagamentos[
            venda.pagamento
        ] =

            (
                pagamentos[
                    venda.pagamento
                ] || 0
            )

            +

            1;

    });



    /* CALCULAR ESTOQUE */

    produtos.forEach(
        produto => {

            estoque +=
                produto.estoque;

        }
    );



    /* TICKET MÉDIO */

    const ticket =

        vendas.length

            ? faturamento /
              vendas.length

            : 0;



    document
        .getElementById("faturamento")
        .textContent =
        dinheiro(faturamento);



    document
        .getElementById("totalVendas")
        .textContent =
        vendas.length;



    document
        .getElementById("ticketMedio")
        .textContent =
        dinheiro(ticket);



    document
        .getElementById("estoque")
        .textContent =
        estoque;



    /* =================================================
       PRODUTO MAIS VENDIDO
    ================================================= */

    let maisVendido = "-";


    for (
        let produto in produtosVendidos
    ) {

        if (

            maisVendido === "-" ||

            produtosVendidos[produto] >

            produtosVendidos[
                maisVendido
            ]

        ) {

            maisVendido =
                produto;

        }

    }


    document
        .getElementById("maisVendido")
        .textContent =
        maisVendido;



    /* =================================================
       PAGAMENTO MAIS UTILIZADO
    ================================================= */

    let pagamentoMaisUsado = "-";


    for (
        let pagamento in pagamentos
    ) {

        if (

            pagamentoMaisUsado === "-" ||

            pagamentos[pagamento] >

            pagamentos[
                pagamentoMaisUsado
            ]

        ) {

            pagamentoMaisUsado =
                pagamento;

        }

    }


    document
        .getElementById(
            "pagamentoMaisUsado"
        )
        .textContent =
        pagamentoMaisUsado;



    /* =================================================
       ESTOQUE BAIXO
    ================================================= */

    const baixos =

        produtos

            .filter(
                produto =>
                    produto.estoque <= 5
            )

            .map(
                produto =>
                    produto.nome
            );



    document
        .getElementById(
            "estoqueBaixo"
        )
        .textContent =

        baixos.length

            ? baixos.join(", ")

            : "Nenhum";

}



/* =====================================================
   CLIENTES
===================================================== */

document
    .getElementById("clienteForm")
    .addEventListener(
        "submit",
        function(e) {

            e.preventDefault();


            document
                .getElementById("mensagem")
                .textContent =
                "Cliente cadastrado com sucesso!";


            this.reset();

        }
    );



/* =====================================================
   INICIAR SISTEMA
===================================================== */

atualizarProdutos();