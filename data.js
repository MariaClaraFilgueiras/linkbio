/* =====================================================================
   DATA.JS — TODO o conteúdo do site fica aqui.
   Você só precisa mexer neste arquivo.

   REGRAS PARA NÃO QUEBRAR NADA
   • Troque apenas o que está entre aspas: "assim".
   • Não apague vírgulas , nem chaves { } nem colchetes [ ].
   • Se o seu texto tiver aspas duplas, use aspas simples dentro dele: 'assim'.
   • Para esconder um item, deixe as aspas vazias: ""
   • Imagens e vídeos ficam na pasta "imagens", ao lado deste arquivo.
   • Salve o arquivo e recarregue a página para ver a mudança.
   • Se a página aparecer com um aviso de erro, você apagou uma vírgula,
     aspas ou chave. Desfaça a última mudança (Ctrl+Z / Cmd+Z).
   ===================================================================== */

const SITE = {

  // ---------------------------------------------------------------
  // CONFIGURAÇÕES GERAIS
  // ---------------------------------------------------------------
  pagina: {
    titulo: "Maria Clara Filgueiras · UGC", // nome que aparece na aba do navegador
  },

  cores: {
    fundo: "#394622",  // cor de fundo da página (verde musgo)
    bordo: "#6D1A2A",  // cor do card do WhatsApp e dos destaques (bordô)
    creme: "#F2EDE4",  // cor dos textos (off-white)
    destaque: "#F2C14E", // cor da palavra destacada na legenda (amarelo de legenda)
  },

  // Textos pequenos que imitam a tela de gravação, no topo da página
  claquete: {
    cena: "CENA 01",      // canto esquerdo
    meio: "LINK NA BIO",  // centro
    gravando: "REC",      // canto direito, com a bolinha vermelha piscando. Vazio = some
  },

  // ---------------------------------------------------------------
  // TOPO
  // ---------------------------------------------------------------
  perfil: {
    nome: "Maria Clara Filgueiras", // seu nome, em letras grandes
    usuario: "@mariaclarafilgueiras", // seu @, embaixo do nome
    linkUsuario: "https://www.instagram.com/mariaclarafilgueiras", // para onde o @ leva ao ser tocado
    foto: "imagens/foto-perfil.jpg", // sua foto. Para trocar, coloque a nova na pasta imagens e mude o nome aqui
    // Frase que aparece como legenda de vídeo.
    // Se quiser destacar uma palavra em amarelo, coloque ela entre asteriscos: *assim*
    frase: "Sou a UGC que te ajuda a vender com um bom storytelling",
  },

  // Ícones do topo. Redes aceitas: instagram, tiktok, linkedin.
  // Link vazio = o ícone some.
  redes: [
    { rede: "instagram", link: "https://www.instagram.com/mariaclarafilgueiras/" },
    { rede: "tiktok", link: "https://www.tiktok.com/@mariaclarafilgueiras" },
    { rede: "linkedin", link: "https://www.linkedin.com/in/maria-clara-fontoura-filgueiras-ba932a170/" },
  ],

  // ---------------------------------------------------------------
  // CARD DO WHATSAPP (o card bordô grande)
  // ---------------------------------------------------------------
  whatsapp: {
    etiqueta: "▶ CHAMADA PARA AÇÃO", // linha pequena em cima do título
    titulo: "Falar comigo no WhatsApp", // texto grande do card
    texto: "Me conte sobre sua marca e como posso te ajudar", // texto menor embaixo
    botao: "Chamar",                  // texto do botão claro no canto
    link: "https://wa.me/5511925239294", // seu WhatsApp: https://wa.me/ + 55 + DDD + número
    // Mensagem que já vem escrita quando a pessoa abre a conversa. Vazio = conversa em branco
    mensagem: "Oi, Maria Clara! Vi seu link na bio e quero te contar sobre a minha marca.",
  },

  // ---------------------------------------------------------------
  // VÍDEOS DE DEMONSTRAÇÃO
  // ---------------------------------------------------------------
  videos: {
    cena: "CENA 02",                    // marcação antes do título
    titulo: "Exemplos de conteúdo UGC", // título da seção
    itens: [
      // marca:  aparece embaixo do vídeo
      // capa:   imagem que aparece parada (formato vertical 9:16)
      // video:  arquivo .mp4 que toca sem som ao passar o mouse (no celular, quando aparece na tela).
      //         Vazio = a capa dá um leve zoom no lugar do vídeo
      // link:   post do Instagram que abre ao tocar
      {
        marca: "@oimuisis",
        capa: "imagens/capa-1.jpg",
        video: "",   // ex.: "imagens/video-1.mp4"
        link: "https://www.instagram.com/p/DcbY_TFRnNd/",
      },
      {
        marca: "@skeltcosmetics",
        capa: "imagens/capa-2.jpg",
        video: "",   // ex.: "imagens/video-2.mp4"
        link: "https://www.instagram.com/p/DcjyHJQRj3A/",
      },
      {
        marca: "@nvnativozza",
        capa: "imagens/capa-3.jpg",
        video: "",   // ex.: "imagens/video-3.mp4"
        link: "https://www.instagram.com/p/DcowEhCxWD7/",
      },
    ],
  },

  // ---------------------------------------------------------------
  // PORTFÓLIOS (cards embaixo dos vídeos)
  // ---------------------------------------------------------------
  portfolios: {
    cena: "CENA 03",      // marcação antes do título
    titulo: "Portfólio",  // título da seção
    itens: [
      {
        titulo: "Meu portfólio de UGC Creator", // texto grande do card. Vazio = o card some
        texto: "Veja meus vídeos",              // texto menor embaixo
        botao: "Abrir",                         // texto do lado direito
        link: "https://roteirosmariaugclara.my.canva.site/portf-lio-ugc-s-p", // link do portfólio
      },
      {
        titulo: "Meu portfólio de UGC Manager",
        texto: "Gerencio creators para você",
        botao: "Abrir",
        link: "https://roteirosmariaugclara.my.canva.site/manager",            // link do portfólio
      },
    ],
  },
};
