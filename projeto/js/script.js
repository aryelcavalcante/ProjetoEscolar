/* ========================================
   1. ELEMENTOS DA PÁGINA
======================================== */

const trilha = document.getElementById("trilha-tabuleiro");
const tabuleiro = document.getElementById("tabuleiro");
const botaoDado = document.getElementById("btn-jogar-dado");
const botaoNovaPartida = document.getElementById("btn-nova-partida");
const resultadoDado = document.getElementById("resultado-dado");

const mensagem = document.getElementById("mensagem");
const jogadorAtualTexto = document.getElementById("jogador-atual");

const modal = document.getElementById("modal-casa");
const janela = document.getElementById("janela");
const tituloModal = document.getElementById("titulo-modal");
const descricaoModal = document.getElementById("descricao-modal");
const consequenciaModal = document.getElementById("consequencia-modal");
const linkModal = document.getElementById("link-modal");
const botaoFecharModal = document.getElementById("btn-fechar-modal");
const botaoX = document.getElementById("btn-x");

const listaRanking = document.getElementById("lista-ranking");
const botaoReiniciarRanking = document.getElementById("btn-reiniciar-ranking");


/* ========================================
   2. CASAS (monta a partir do casas.js)
======================================== */

// Junta posição + texto de cada casa, na ordem do mapa.
const filaNeutras = [...NEUTRAS];
const filaRuins = [...RUINS];

const casas = POSICOES.map(function (pos, i) {
    const texto = pos.t === "r" ? filaRuins.shift() : filaNeutras.shift();

    if (!texto) {
        console.error("Faltam textos para a casa " + (i + 1) + " (" + pos.t + ")");
    }

    return Object.assign({ x: pos.x, y: pos.y, tipo: pos.t === "r" ? "ruim" : "neutra" }, texto);
});

const TOTAL_CASAS = casas.length;
const ULTIMA = TOTAL_CASAS - 1;


/* ========================================
   3. JOGADORES E ESTADO
======================================== */

const jogadores = [
    { id: 1, nome: "Jogador 1", cor: "azul", posicao: 0, vitorias: 0 },
    { id: 2, nome: "Jogador 2", cor: "vermelho", posicao: 0, vitorias: 0 },
    { id: 3, nome: "Jogador 3", cor: "verde", posicao: 0, vitorias: 0 },
    { id: 4, nome: "Jogador 4", cor: "amarelo", posicao: 0, vitorias: 0 }
];

const IMAGEM_PEAO = {
    azul: "assets/peoes/azul.png",
    vermelho: "assets/peoes/vermelho.png",
    verde: "assets/peoes/verde.png",
    amarelo: "assets/peoes/amarelo.png"
};

let indiceJogadorAtual = 0;
let ocupado = false;          // true enquanto uma jogada está acontecendo
let partidaEncerrada = false;
let chegada = [];             // jogadores na ordem em que terminaram

// As vitórias ficam salvas no navegador (se ele permitir)
function carregarVitorias() {
    try {
        const salvo = JSON.parse(localStorage.getItem("rumoEnemVitorias"));
        if (salvo) {
            jogadores.forEach(j => { j.vitorias = salvo[j.id] || 0; });
        }
    } catch (e) { /* sem armazenamento: segue sem salvar */ }
}

function salvarVitorias() {
    try {
        const dados = {};
        jogadores.forEach(j => { dados[j.id] = j.vitorias; });
        localStorage.setItem("rumoEnemVitorias", JSON.stringify(dados));
    } catch (e) { /* ignora */ }
}


/* ========================================
   4. UTILIDADES
======================================== */

function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function jogadorJaChegou(jogador) {
    return chegada.includes(jogador);
}


/* ========================================
   5. PEÕES
======================================== */

function criarPeoes() {
    jogadores.forEach(jogador => {
        const img = document.createElement("img");

        img.classList.add("peao");
        img.src = IMAGEM_PEAO[jogador.cor];
        img.alt = jogador.nome;
        img.title = jogador.nome;
        img.id = "peao-" + jogador.id;

        trilha.appendChild(img);
    });
}

// Quando há mais de um peão na mesma casa, eles ficam lado a lado
const DESLOCAMENTOS = [
    ["-55%", "0%"], ["55%", "0%"], ["-55%", "35%"], ["55%", "35%"]
];

function atualizarPeoes() {
    jogadores.forEach(jogador => {
        const img = document.getElementById("peao-" + jogador.id);
        const casa = casas[jogador.posicao];

        const mesmaCasa = jogadores.filter(j => j.posicao === jogador.posicao);
        const lugar = mesmaCasa.indexOf(jogador);
        const [dx, dy] = mesmaCasa.length > 1 ? DESLOCAMENTOS[lugar] : ["0%", "0%"];

        img.style.setProperty("--x", casa.x + "%");
        img.style.setProperty("--y", casa.y + "%");
        img.style.setProperty("--dx", dx);
        img.style.setProperty("--dy", dy);

        const elemento = document.querySelector("#jogador-" + jogador.id + " .posicao");
        if (elemento) elemento.textContent = jogador.posicao + 1;
    });

    destacarJogadorAtual();
}

function destacarJogadorAtual() {
    const atual = jogadores[indiceJogadorAtual];

    jogadores.forEach(jogador => {
        const ativo = !partidaEncerrada && jogador === atual;
        document.getElementById("peao-" + jogador.id).classList.toggle("ativo", ativo);
        document.getElementById("jogador-" + jogador.id).classList.toggle("ativo", ativo);
    });
}

// Move o peão casa por casa (para frente ou para trás)
async function moverPeao(jogador, destino) {
    const passo = destino > jogador.posicao ? 1 : -1;

    while (jogador.posicao !== destino) {
        jogador.posicao += passo;
        atualizarPeoes();
        await esperar(230);
    }
}


/* ========================================
   6. POP-UP
======================================== */

// Impede que a tecla Esc feche o pop-up e trave o jogo
modal.addEventListener("cancel", evento => evento.preventDefault());

/*
  Abre o pop-up e espera o jogador fechar (OK ou X).
  tipo: "neutro" ou "negativo"
*/
function mostrarModal({ tipo, titulo, descricao, consequencia = "", link = "" }) {
    return new Promise(resolve => {

        janela.className = tipo;
        tituloModal.textContent = titulo;
        descricaoModal.textContent = descricao;
        consequenciaModal.textContent = consequencia;

        if (link) {
            linkModal.href = link;
            linkModal.hidden = false;
        } else {
            linkModal.removeAttribute("href");
            linkModal.hidden = true;
        }

        function fechar() {
            botaoFecharModal.onclick = null;
            botaoX.onclick = null;
            modal.close();
            resolve();
        }

        botaoFecharModal.onclick = fechar;
        botaoX.onclick = fechar;

        modal.showModal();
        botaoFecharModal.focus();
    });
}


/* ========================================
   7. JOGAR DADO
======================================== */

async function jogarDado() {

    if (ocupado || partidaEncerrada) return;

    ocupado = true;
    botaoDado.disabled = true;

    const jogador = jogadores[indiceJogadorAtual];

    // Animação rápida do dado
    for (let i = 0; i < 8; i++) {
        resultadoDado.textContent = Math.floor(Math.random() * 6) + 1;
        await esperar(70);
    }

    const resultado = Math.floor(Math.random() * 6) + 1;
    resultadoDado.textContent = resultado;
    mensagem.textContent = jogador.nome + " tirou " + resultado + " no dado!";

    await esperar(300);

    await moverPeao(jogador, Math.min(jogador.posicao + resultado, ULTIMA));
    await esperar(250);

    await resolverCasa(jogador);

    if (!partidaEncerrada) {
        proximoJogador();
    }

    ocupado = false;
}


/* ========================================
   8. RESOLVER CASA
======================================== */

async function resolverCasa(jogador) {

    // Chegou ao fim do tabuleiro
    if (jogador.posicao === ULTIMA) {
        await registrarChegada(jogador);
        return;
    }

    const casa = casas[jogador.posicao];

    if (casa.tipo === "ruim") {

        await mostrarModal({
            tipo: "negativo",
            titulo: casa.titulo,
            descricao: casa.descricao,
            consequencia: "Volte " + casa.voltar + " casa(s)!",
            link: casa.link
        });

        const destino = Math.max(0, jogador.posicao - casa.voltar);
        mensagem.textContent = jogador.nome + " voltou " + casa.voltar + " casa(s).";
        await moverPeao(jogador, destino);
        await esperar(250);

    } else {

        await mostrarModal({
            tipo: "neutro",
            titulo: casa.titulo,
            descricao: casa.descricao,
            link: casa.link
        });
    }
}


/* ========================================
   9. CHEGADA E FIM DA PARTIDA
======================================== */

function sufixoLugar(n) {
    return n + "º lugar";
}

async function registrarChegada(jogador) {

    chegada.push(jogador);
    atualizarRanking();

    const lugar = chegada.length;
    const casa = casas[ULTIMA];

    mensagem.textContent = jogador.nome + " chegou em " + sufixoLugar(lugar) + "!";

    await mostrarModal({
        tipo: "neutro",
        titulo: "🏁 " + sufixoLugar(lugar) + "!",
        descricao: jogador.nome + " chegou ao fim do percurso. " + casa.descricao,
        link: casa.link
    });

    // A partida acaba quando só resta um jogador
    if (chegada.length >= jogadores.length - 1) {
        await encerrarPartida();
    }
}

async function encerrarPartida() {

    // O último que sobrou fica com a última colocação
    jogadores.forEach(j => {
        if (!chegada.includes(j)) chegada.push(j);
    });

    partidaEncerrada = true;

    chegada[0].vitorias++;
    salvarVitorias();
    atualizarRanking();
    destacarJogadorAtual();

    jogadorAtualTexto.textContent = "Partida encerrada!";
    mensagem.textContent = chegada[0].nome + " venceu a partida!";

    botaoDado.hidden = true;
    botaoNovaPartida.hidden = false;

    const resumo = chegada.map((j, i) => (i + 1) + "º " + j.nome).join("  |  ");

    await mostrarModal({
        tipo: "neutro",
        titulo: "🏆 " + chegada[0].nome + " venceu!",
        descricao: "Resultado final: " + resumo,
        consequencia: "Vitórias de " + chegada[0].nome + ": " + chegada[0].vitorias
    });
}


/* ========================================
   10. TURNOS
======================================== */

function proximoJogador() {

    do {
        indiceJogadorAtual = (indiceJogadorAtual + 1) % jogadores.length;
    } while (jogadorJaChegou(jogadores[indiceJogadorAtual]));

    atualizarJogadorAtual();
    mensagem.textContent = "Sua vez de jogar!";
    botaoDado.disabled = false;
}

function atualizarJogadorAtual() {
    const jogador = jogadores[indiceJogadorAtual];
    jogadorAtualTexto.textContent = "Vez do " + jogador.nome;
    destacarJogadorAtual();
}


/* ========================================
   11. RANKING
======================================== */

function ordemAtual() {

    // Quem já chegou vem primeiro (na ordem de chegada); os outros, pela casa em que estão
    const quemFalta = jogadores
        .filter(j => !chegada.includes(j))
        .sort((a, b) => b.posicao - a.posicao || a.id - b.id);

    return chegada.concat(quemFalta);
}

function atualizarRanking() {

    listaRanking.innerHTML = "";

    ordemAtual().forEach(jogador => {

        const item = document.createElement("div");
        item.classList.add("item-ranking");

        const terminou = chegada.includes(jogador);
        const status = terminou ? "chegou" : "casa " + (jogador.posicao + 1);

        item.innerHTML =
            '<img src="' + IMAGEM_PEAO[jogador.cor] + '" alt="">' +
            '<span class="nome">' + jogador.nome + '</span>' +
            '<span class="status">' + status + '</span>' +
            '<span class="vitorias">🏆 ' + jogador.vitorias + '</span>';

        listaRanking.appendChild(item);
    });
}


/* ========================================
   12. NOVA PARTIDA / ZERAR VITÓRIAS
======================================== */

function novaPartida() {

    jogadores.forEach(j => { j.posicao = 0; });

    chegada = [];
    indiceJogadorAtual = 0;
    partidaEncerrada = false;
    ocupado = false;

    botaoNovaPartida.hidden = true;
    botaoDado.hidden = false;
    botaoDado.disabled = false;

    resultadoDado.textContent = "-";
    mensagem.textContent = "Nova partida! Boa sorte!";

    atualizarPeoes();
    atualizarJogadorAtual();
    atualizarRanking();
}

function reiniciarRanking() {

    if (!confirm("Deseja realmente zerar todas as vitórias?")) return;

    jogadores.forEach(j => { j.vitorias = 0; });
    salvarVitorias();
    atualizarRanking();
}


/* ========================================
   13. MODO DEBUG (index.html?debug)
   Mostra os pontos das casas e as coordenadas
   do lugar clicado, para ajustar o casas.js
======================================== */

function ativarDebug() {

    const info = document.getElementById("debug-info");
    info.hidden = false;
    info.textContent = "Modo debug: clique no mapa para ver as coordenadas.";

    casas.forEach((casa, i) => {
        const ponto = document.createElement("div");
        ponto.className = "ponto-debug" + (casa.tipo === "ruim" ? " ruim" : "");
        ponto.style.setProperty("--x", casa.x + "%");
        ponto.style.setProperty("--y", casa.y + "%");
        ponto.textContent = i + 1;
        trilha.appendChild(ponto);
    });

    tabuleiro.addEventListener("click", evento => {
        const r = tabuleiro.getBoundingClientRect();
        const x = ((evento.clientX - r.left) / r.width * 100).toFixed(1);
        const y = ((evento.clientY - r.top) / r.height * 100).toFixed(1);
        info.textContent = "{x:" + x + ",y:" + y + ',t:"n"}';
    });
}


/* ========================================
   14. EVENTOS E INICIALIZAÇÃO
======================================== */

botaoDado.addEventListener("click", jogarDado);
botaoNovaPartida.addEventListener("click", novaPartida);
botaoReiniciarRanking.addEventListener("click", reiniciarRanking);

carregarVitorias();
criarPeoes();
atualizarPeoes();
atualizarRanking();
atualizarJogadorAtual();

resultadoDado.textContent = "-";
mensagem.textContent = "Prepare-se para começar!";

if (location.search.includes("debug")) {
    ativarDebug();
}
