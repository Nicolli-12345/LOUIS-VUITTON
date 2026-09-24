let produtos = [
    {
        nome: "Bolsa Elegance",
        categoria: "Bolsas",
        preco: 8500,
        estoque: 10
    },
    {
        nome: "Carteira Premium",
        categoria: "Carteiras",
        preco: 3200,
        estoque: 20
    },
    {
        nome: "Tênis Luxury",
        categoria: "Tênis",
        preco: 4500,
        estoque: 8
    }
];

let vendas = [];


/* DINHEIRO */

function dinheiro(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


/* MOSTRAR PRODUTOS */

function atualizarProdutos() {

    const lista =
        document.getElementById("listaProdutos");

    const select =
        document.getElementById("produtoVenda");

    lista.innerHTML = "";

    select.innerHTML =
        '<option value="">Escolha o produto</option>';


    produtos.forEach((produto, index) => {

        lista.innerHTML += `
            <tr>

                <td>${produto.nome}</td>

                <td>${produto.categoria}</td>

                <td>${dinheiro(produto.preco)}</td>

                <td>${produto.estoque}</td>

                <td>
                    <button
                        class="btn-excluir"
                        onclick="excluirProduto(${index})">
                        Excluir
                    </button>
                </td>

            </tr>
        `;


        if (produto.estoque > 0) {

            select.innerHTML += `
                <option value="${index}">
                    ${produto.nome}
                </option>
            `;
        }

    });

    atualizarIndicadores();
}


/* EXCLUIR PRODUTO */

function excluirProduto(index) {

    const produto = produtos[index];

    const confirmar =
        confirm(
            `Deseja realmente excluir "${produto.nome}"?`
        );

    if (!confirmar) {
        return;
    }

    produtos.splice(index, 1);

    atualizarProdutos();

    alert("Produto excluído com sucesso!");
}


/* CADASTRAR PRODUTO */

document
.getElementById("produtoForm")
.addEventListener("submit", function(e) {

    e.preventDefault();


    const novoProduto = {

        nome:
            document.getElementById("produtoNome").value,

        categoria:
            document.getElementById("categoria").value,

        preco:
            Number(
                document.getElementById("preco").value
            ),

        estoque:
            Number(
                document.getElementById("quantidade").value
            )
    };


    produtos.push(novoProduto);

    this.reset();

    atualizarProdutos();

    alert("Produto cadastrado com sucesso!");
});


/* REGISTRAR VENDA */

document
.getElementById("vendaForm")
.addEventListener("submit", function(e) {

    e.preventDefault();


    const index =
        Number(
            document.getElementById("produtoVenda").value
        );

    const quantidade =
        Number(
            document.getElementById("qtdVenda").value
        );

    const produto = produtos[index];


    if (!produto) {

        alert("Escolha um produto.");

        return;
    }


    if (quantidade > produto.estoque) {

        alert("Estoque insuficiente.");

        return;
    }


    produto.estoque -= quantidade;


    vendas.push({

        produto: produto.nome,

        quantidade: quantidade,

        valor:
            produto.preco * quantidade,

        pagamento:
            document.getElementById("pagamento").value
    });


    this.reset();

    atualizarProdutos();

    alert("Venda registrada com sucesso!");
});


/* INDICADORES */

function atualizarIndicadores() {

    let faturamento = 0;

    let estoque = 0;

    let produtosVendidos = {};

    let pagamentos = {};


    vendas.forEach(venda => {

        faturamento += venda.valor;


        produtosVendidos[venda.produto] =
            (produtosVendidos[venda.produto] || 0)
            + venda.quantidade;


        pagamentos[venda.pagamento] =
            (pagamentos[venda.pagamento] || 0) + 1;

    });


    produtos.forEach(produto => {

        estoque += produto.estoque;

    });


    const ticket =
        vendas.length
        ? faturamento / vendas.length
        : 0;


    document.getElementById("faturamento")
        .textContent = dinheiro(faturamento);


    document.getElementById("totalVendas")
        .textContent = vendas.length;


    document.getElementById("ticketMedio")
        .textContent = dinheiro(ticket);


    document.getElementById("estoque")
        .textContent = estoque;


    /* PRODUTO MAIS VENDIDO */

    let maisVendido = "-";


    for (let produto in produtosVendidos) {

        if (
            maisVendido === "-" ||
            produtosVendidos[produto] >
            produtosVendidos[maisVendido]
        ) {

            maisVendido = produto;

        }

    }


    document.getElementById("maisVendido")
        .textContent = maisVendido;


    /* PAGAMENTO MAIS USADO */

    let pagamentoMaisUsado = "-";


    for (let pagamento in pagamentos) {

        if (
            pagamentoMaisUsado === "-" ||
            pagamentos[pagamento] >
            pagamentos[pagamentoMaisUsado]
        ) {

            pagamentoMaisUsado = pagamento;

        }

    }


    document.getElementById("pagamentoMaisUsado")
        .textContent = pagamentoMaisUsado;


    /* ESTOQUE BAIXO */

    const baixos = produtos
        .filter(produto => produto.estoque <= 5)
        .map(produto => produto.nome);


    document.getElementById("estoqueBaixo")
        .textContent =
        baixos.length
        ? baixos.join(", ")
        : "Nenhum";
}


/* CLIENTES */

document
.getElementById("clienteForm")
.addEventListener("submit", function(e) {

    e.preventDefault();


    document.getElementById("mensagem")
        .textContent =
        "✓ Cliente cadastrado com sucesso!";


    this.reset();

});


/* INICIAR */

atualizarProdutos();