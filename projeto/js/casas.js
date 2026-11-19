/* ========================================
   DADOS DAS CASAS
   ----------------------------------------
   O mapa (assets/mapa.jpg) já traz as casas desenhadas.
   Aqui ficam: onde cada casa está (x, y em % do mapa),
   se é neutra ou ruim, e o texto/link de cada uma.

   Para achar uma coordenada: abra o jogo com ?debug
   no final do endereço (index.html?debug) e clique no
   mapa. As coordenadas aparecem logo abaixo dele.
======================================== */

// t: "n" = neutra | "r" = ruim (penalidade)
const POSICOES = [
  {x:2.8,y:98.6,t:"n"}, {x:2.8,y:95.3,t:"r"}, {x:2.8,y:92.1,t:"n"}, {x:3.2,y:88.9,t:"n"},
  {x:7.0,y:87.1,t:"n"}, {x:11.1,y:88.5,t:"n"}, {x:15.3,y:89.9,t:"n"}, {x:19.4,y:91.4,t:"n"},
  {x:23.6,y:92.8,t:"r"}, {x:26.8,y:91.2,t:"n"}, {x:27.4,y:88.1,t:"n"}, {x:27.4,y:84.8,t:"n"},
  {x:27.4,y:81.5,t:"r"}, {x:27.4,y:78.2,t:"n"}, {x:27.4,y:75.0,t:"n"}, {x:30.6,y:72.6,t:"n"},
  {x:34.9,y:72.6,t:"n"}, {x:38.5,y:74.5,t:"n"}, {x:41.5,y:77.0,t:"r"}, {x:45.3,y:78.7,t:"n"},
  {x:49.3,y:77.7,t:"n"}, {x:51.7,y:74.9,t:"n"}, {x:51.7,y:71.7,t:"n"}, {x:51.7,y:68.4,t:"r"},
  {x:51.7,y:65.1,t:"n"}, {x:51.7,y:61.9,t:"r"}, {x:53.3,y:59.1,t:"n"}, {x:57.4,y:58.1,t:"n"},
  {x:61.8,y:58.7,t:"r"}, {x:65.6,y:60.5,t:"n"}, {x:69.5,y:62.3,t:"n"}, {x:73.7,y:62.3,t:"n"},
  {x:76.3,y:60.4,t:"r"}, {x:76.3,y:57.2,t:"n"}, {x:76.3,y:53.9,t:"n"}, {x:76.3,y:50.6,t:"n"},
  {x:79.1,y:48.2,t:"r"}, {x:82.4,y:46.0,t:"n"}, {x:81.6,y:43.0,t:"n"}, {x:77.6,y:41.4,t:"r"},
  {x:73.5,y:39.9,t:"n"}, {x:69.4,y:38.4,t:"n"}, {x:65.3,y:36.8,t:"r"}, {x:61.3,y:35.2,t:"n"},
  {x:59.0,y:32.5,t:"n"}, {x:59.9,y:30.1,t:"n"}, {x:63.9,y:28.4,t:"n"}, {x:68.1,y:27.3,t:"n"},
  {x:72.2,y:26.3,t:"r"}, {x:75.5,y:24.0,t:"n"}, {x:73.7,y:21.8,t:"n"}, {x:70.2,y:19.7,t:"n"},
  {x:66.3,y:17.9,t:"r"}, {x:62.3,y:16.3,t:"n"}, {x:58.4,y:14.5,t:"r"}, {x:54.7,y:12.6,t:"n"},
  {x:51.9,y:10.1,t:"n"}, {x:51.3,y:7.5,t:"n"}, {x:55.7,y:6.4,t:"n"}, {x:60.1,y:5.4,t:"n"},
  {x:63.7,y:3.9,t:"r"}, {x:65.8,y:0.9,t:"n"}
];


/* ========================================
   TEXTOS DAS CASAS NEUTRAS
   (usados na ordem em que aparecem no mapa)
   link: "" -> sem botão. Cole aqui a URL quando tiver.
======================================== */

const NEUTRAS = [
  { titulo: "Sua jornada começou!", descricao: "Você decidiu se preparar para o ENEM. Organize seus materiais e estabeleça seus objetivos!", link: "" },
  { titulo: "Organize seus estudos!", descricao: "Monte um cronograma de estudos, distribuindo as matérias ao longo da semana.", link: "" },
  { titulo: "Conheça o ENEM!", descricao: "Pesquise a estrutura da prova, as áreas de conhecimento e a quantidade de questões.", link: "" },
  { titulo: "Estabeleça uma rotina!", descricao: "Defina horários de estudo e procure manter a frequência.", link: "" },
  { titulo: "Início da isenção!", descricao: "Chegou a hora de solicitar a isenção da taxa de inscrição, se você tiver direito. Fique atento ao prazo!", link: "" },
  { titulo: "Faça sua inscrição!", descricao: "Confira o período de inscrição e preencha seus dados com atenção.", link: "" },
  { titulo: "Pratique redação!", descricao: "Treine sua escrita e conheça as cinco competências avaliadas na redação do ENEM.", link: "" },
  { titulo: "Faça simulados!", descricao: "Resolver provas anteriores ajuda a conhecer o estilo das questões.", link: "" },
  { titulo: "Estude matemática!", descricao: "Revise porcentagem, regra de três, funções e interpretação de gráficos.", link: "" },
  { titulo: "Descanse também!", descricao: "Uma boa rotina de estudos precisa de pausas e momentos de descanso.", link: "" },
  { titulo: "Você está evoluindo!", descricao: "Seu desempenho melhorou depois de uma sequência de estudos.", link: "" },
  { titulo: "Revise ciências da natureza!", descricao: "Dedique tempo à biologia, química e física.", link: "" },
  { titulo: "Leia mais!", descricao: "A leitura frequente melhora sua interpretação de textos.", link: "" },
  { titulo: "Faça resumos!", descricao: "Escrever com suas palavras ajuda a fixar o conteúdo. Resuma o que você estudou na semana.", link: "" },
  { titulo: "Estude história!", descricao: "Revise os principais acontecimentos históricos do Brasil e do mundo.", link: "" },
  { titulo: "Pratique interpretação!", descricao: "Resolva questões de interpretação de textos, charges e gráficos.", link: "" },
  { titulo: "Sua dedicação foi recompensada!", descricao: "Você conseguiu manter uma rotina de estudos durante a semana.", link: "" },
  { titulo: "Conheça a TRI!", descricao: "O ENEM usa a Teoria de Resposta ao Item. Entenda como funciona para não perder pontos à toa.", link: "" },
  { titulo: "Cuide da sua saúde!", descricao: "Alimentação, sono e atividade física também influenciam seu rendimento.", link: "" },
  { titulo: "Revise geografia!", descricao: "Estude questões ambientais, geopolítica e problemas sociais.", link: "" },
  { titulo: "Estude linguagens!", descricao: "Revise gramática, variação linguística, gêneros textuais e as questões de língua estrangeira.", link: "" },
  { titulo: "Estude em grupo!", descricao: "Explicar o conteúdo para um colega é uma ótima forma de aprender.", link: "" },
  { titulo: "Tire suas dúvidas!", descricao: "Não deixe dúvidas acumularem. Procure professores, colegas e videoaulas.", link: "" },
  { titulo: "Estude filosofia e sociologia!", descricao: "Conheça os principais pensadores e conceitos dessas áreas.", link: "" },
  { titulo: "Faça uma redação completa!", descricao: "Produza um texto dissertativo-argumentativo e pratique a proposta de intervenção.", link: "" },
  { titulo: "Você melhorou seu desempenho!", descricao: "Sua prática constante trouxe bons resultados.", link: "" },
  { titulo: "Revise fórmulas!", descricao: "Monte uma folha com as fórmulas de física, química e matemática que mais caem.", link: "" },
  { titulo: "Confira seu local de prova!", descricao: "Verifique antecipadamente o endereço onde realizará o exame.", link: "" },
  { titulo: "Cartão de confirmação!", descricao: "Consulte seu cartão de confirmação e confira local, horário e informações de acessibilidade.", link: "" },
  { titulo: "Prepare seus documentos!", descricao: "Confira seus documentos de identificação e os materiais permitidos.", link: "" },
  { titulo: "Revise os conteúdos!", descricao: "Retome os assuntos que apresentam maior dificuldade.", link: "" },
  { titulo: "Você conseguiu uma ótima revisão!", descricao: "Sua preparação está dando resultado. Continue assim!", link: "" },
  { titulo: "Controle o tempo!", descricao: "Treine resolver questões dentro do tempo disponível para a prova.", link: "" },
  { titulo: "Revise seus erros!", descricao: "Entender por que errou uma questão é tão importante quanto acertá-la.", link: "" },
  { titulo: "Estude temas recorrentes!", descricao: "Alguns assuntos aparecem todo ano. Analise provas anteriores e priorize esses temas.", link: "" },
  { titulo: "Treine o cartão-resposta!", descricao: "Marque as respostas com atenção e reserve tempo no fim para passar tudo para o gabarito.", link: "" },
  { titulo: "Prepare-se para o grande dia!", descricao: "Separe tudo que precisa levar e evite imprevistos.", link: "" },
  { titulo: "Você está quase lá!", descricao: "Sua dedicação está levando você cada vez mais perto do seu objetivo.", link: "" },
  { titulo: "Não desista!", descricao: "Mesmo diante das dificuldades, continue acreditando no seu potencial.", link: "" },
  { titulo: "Alimente-se bem!", descricao: "No dia da prova, faça um café da manhã leve e leve uma garrafa de água e um lanche.", link: "" },
  { titulo: "Última revisão!", descricao: "Faça uma revisão leve e procure descansar antes da prova.", link: "" },
  { titulo: "Durma bem!", descricao: "Uma boa noite de sono antes do exame vale mais do que estudar até de madrugada.", link: "" },
  { titulo: "Chegou a hora!", descricao: "Você concluiu sua preparação. Confie no que aprendeu e faça uma boa prova!", link: "" },
  { titulo: "Chegue cedo!", descricao: "Saia com antecedência, lembre que os portões fecham no horário e evite correria.", link: "" },
  { titulo: "Reta final!", descricao: "Você está muito perto de alcançar seu objetivo!", link: "" },
  { titulo: "Respire fundo!", descricao: "Mantenha a calma, leia os enunciados com atenção e comece pelas questões que você domina.", link: "" },
  { titulo: "Semana da prova!", descricao: "Você chegou à semana antes da primeira prova. Agora é confiar na sua preparação. Boa sorte!", link: "" }
];


/* ========================================
   TEXTOS DAS CASAS RUINS
   voltar: quantas casas o jogador volta
   link: vídeo informativo sobre a etapa
======================================== */

const RUINS = [
  { titulo: "Você perdeu o foco!", descricao: "Você passou muito tempo distraído e deixou seus estudos de lado.", voltar: 2, link: "" },
  { titulo: "Você perdeu a etapa de isenção!", descricao: "Você não acompanhou o calendário e deixou passar o prazo para pedir a isenção da taxa.", voltar: 5, link: "" },
  { titulo: "Você perdeu o prazo de inscrição!", descricao: "Você esqueceu de acompanhar o calendário do ENEM e perdeu uma etapa importante.", voltar: 3, link: "" },
  { titulo: "Você faltou aos estudos!", descricao: "A falta de organização prejudicou seu planejamento.", voltar: 2, link: "" },
  { titulo: "Redes sociais demais!", descricao: "Você passou horas no celular em vez de estudar.", voltar: 2, link: "" },
  { titulo: "Você não fez simulados!", descricao: "Sem treinar com provas anteriores, o estilo das questões ficou estranho para você.", voltar: 3, link: "" },
  { titulo: "Redação deixada de lado!", descricao: "Você não treinou a escrita e perdeu pontos importantes nas competências.", voltar: 3, link: "" },
  { titulo: "Você virou a noite estudando!", descricao: "Sem dormir direito, seu rendimento caiu no dia seguinte.", voltar: 2, link: "" },
  { titulo: "A ansiedade atrapalhou!", descricao: "Você ficou nervoso e teve dificuldade para manter a concentração.", voltar: 2, link: "" },
  { titulo: "Você não revisou seus erros!", descricao: "Errar a mesma questão de novo custa caro. Faltou rever o que não entendeu.", voltar: 3, link: "" },
  { titulo: "Você ignorou sua saúde!", descricao: "Sem descanso e sem alimentação adequada, sua rotina ficou desorganizada.", voltar: 2, link: "" },
  { titulo: "Você não conferiu o local de prova!", descricao: "Você deixou de verificar onde faria o exame e perdeu tempo se organizando.", voltar: 3, link: "" },
  { titulo: "Documentos esquecidos!", descricao: "Você não separou seu documento de identificação com antecedência.", voltar: 4, link: "" },
  { titulo: "Você perdeu o cartão de confirmação!", descricao: "Você não guardou o comprovante e precisou perder tempo para consultar tudo de novo.", voltar: 3, link: "" },
  { titulo: "Você deixou tudo para a última hora!", descricao: "A falta de planejamento fez você perder tempo importante.", voltar: 4, link: "" }
];
