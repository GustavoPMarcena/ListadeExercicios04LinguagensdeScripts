const listaDeCompras = []; 

function adicionar(item) {
  listaDeCompras.push(item);
}

function remover(item) {
  listaDeCompras.forEach((element, index) => {
    if(element.id == item.id) listaDeCompras.splice(index, 1);
  });
}

function marcar(item) {
    listaDeCompras.forEach((element) => {
        if(element.id == item.id) element.comprado = true;
      });
}

function desmarcar(item) {
    listaDeCompras.forEach((element) => {
        if(element.id == item.id) element.comprado = false;
      });
}

function listar() {
  return listaDeCompras;
}

function verificarID(id) {
    listaDeCompras.forEach((element) => {
      if(id == element.id) return 1;
    })
    return 0;
}

export { adicionar, remover, marcar, desmarcar, listar, verificarID };
