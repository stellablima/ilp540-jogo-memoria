function criarCartas(el, linha, coluna) {
  const rows = [];
  for (let i = 0; i < linha ; i++) {
    const cells = [];
    for (let j = 0; j < coluna ; j++) {
      const id = coluna * i + j;
      cells.push(`<td class="cell" data-id="${id}"></td>`);
    }
    rows.push(`<tr>${cells.join('')}</tr>`);
  }

  el.innerHTML = `
      <table id="tabuleiro">${rows.join('')}</table>
      <p class="winner"></p>
    `;
}

function sorteioDeMotivos(tabela, linha, coluna, dificuldade){

  var motivosPossiveis = ["cellNull","cellStart","cellPassagem","cellPorta","cellLivre"];
  var motivosDoJogo = []; //ordenado
  var motivos = []; //embaralhado randomicamente
  var qtdCelulas = linha * coluna;

  motivosPossiveis = motivosPossiveis.slice(0,dificuldade);
  console.log("motivosPossiveis  :"+motivosPossiveis);
  
  for(let i = 0 ; i < qtdCelulas; i++){
    motivosDoJogo.push(motivosPossiveis[i%dificuldade]);//Math.floor(i/dificuldade)
  }
  console.log("motivosDoJogo  :"+motivosDoJogo);


  for(let i = 0 ; i < qtdCelulas; i++){
    var tamanho = motivosDoJogo.length;
    var j = Math.floor(Math.random()*tamanho);
    motivos.push(motivosDoJogo.splice(j,1));
  }
  console.log("motivos  :"+motivos);


  for (let i = 0; i < linha ; i++) {
    for (let j = 0; j < coluna ; j++) {
      const id = coluna * i + j;
      tabela.rows[i].cells[j].className += " " + motivos[id];
    }
  }
}

//usando uma classe de um jeito maluco pra empilhar dados, sem get ou set
//depois pode ter construtor e metodos de sobrecarga, ou substituir por outra logica melhor
function preConfiguracao(){
  var c = 6
  var l = 5
  var diff = 5;
  var jogo = new Object();
  jogo.coluna = c;
  jogo.linha = l;
  jogo.dificuldade = diff;
  return jogo
}


window.onload = async function () {
  var preConfig = await preConfiguracao();
  await criarCartas(document.querySelector('#app'),preConfig.linha, preConfig.coluna);
  await sorteioDeMotivos(document.getElementById('tabuleiro'),preConfig.linha, preConfig.coluna, preConfig.dificuldade);
}