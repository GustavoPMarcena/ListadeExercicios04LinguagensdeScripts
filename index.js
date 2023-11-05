import { adicionar, remover, marcar, desmarcar, listar, verificarID } from "./lista.js"

const inputButton = document.getElementById("inputButton");
const parentTable = document.querySelector("#listId");

document.onload = carregarPagina();

inputButton.addEventListener("click", () => {
    const nome = document.getElementById("itemName").value;
    const preco = document.getElementById("itemCost").value;

    if (nome && preco) {
        adicionarItem(nome, preco);

        document.getElementById("itemName").value = '';
        document.getElementById("itemCost").value = '';
    }

})

function adicionarItem(nome, preco) {
    let numeroAleatorio = Math.floor(Math.random() * 10000);
    if (verificarID(numeroAleatorio)) return adicionarItem(nome, preco); // Caso o id se repita, vai gerar novamente
    const novoObjeto = {
        id: numeroAleatorio,
        nome: nome,
        preco: preco,
        comprado: false
    }
    adicionar(novoObjeto);
    recarregarLista();
}

function recarregarLista() {
    parentTable.replaceChildren();
    listar().forEach((element) => {
        const nomeTable = document.createElement("td");
        nomeTable.textContent = element.nome;
        const precoTable = document.createElement("td");
        precoTable.textContent = parseFloat(element.preco);

        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        if (element.comprado) checkBox.checked = true;

        // Função para marcar a checkbox
        checkBox.addEventListener("change", (e) => {
            (e.target.checked) ? marcar(element) : desmarcar(element);
            recarregarLista();
        })

        const checkBoxTd = document.createElement("td");
        checkBoxTd.appendChild(checkBox);

        const removerButton = document.createElement("button");
        removerButton.textContent = "Remover";
        removerButton.onclick = () => {
            remover(element);
            recarregarLista();
        }
        const removerButtonTd = document.createElement("td");
        removerButtonTd.appendChild(removerButton);

        const novaTable = document.createElement("tr");

        novaTable.appendChild(nomeTable);
        novaTable.appendChild(precoTable);
        novaTable.appendChild(checkBoxTd);
        novaTable.appendChild(removerButtonTd);

        parentTable.appendChild(novaTable);
    });
    salvarDados();

    console.log("Função dentro do recarregar lista");
    console.log(listar());

}


function salvarDados() {
    localStorage.setItem("list", JSON.stringify(listar()));
}

function carregarPagina() {
    let listaCompras = JSON.parse(localStorage.getItem("list"));
    if (listaCompras && listaCompras.length > 0) {
        listaCompras.forEach((element) => {
            adicionar(element);
        });
        recarregarLista();
    }
}
