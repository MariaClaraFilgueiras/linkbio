/* =====================================================================
   APP.JS — monta a página a partir do data.js.
   Você não precisa editar este arquivo: todo o conteúdo fica no data.js.
   ===================================================================== */
(function () {
  "use strict";

  const app = document.getElementById("app");

  if (typeof SITE === "undefined") {
    app.innerHTML =
      '<p class="aviso-erro">Não consegui ler o <b>data.js</b>. Provavelmente uma vírgula, aspas ou chave foi apagada por engano. Desfaça a última mudança e salve de novo.</p>';
    return;
  }

  const D = SITE;
  const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const temMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- utilidades ---------- */

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );
  }
  function externo(url) {
    return ' href="' + esc(url || "#") + '" target="_blank" rel="noopener"';
  }
  function iniciais(nome) {
    return String(nome || "").trim().split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join("");
  }
  // Junta o link do WhatsApp com a mensagem pronta
  function linkWhats(link, msg) {
    if (!link) return "#";
    if (!msg) return link;
    return link + (link.includes("?") ? "&" : "?") + "text=" + encodeURIComponent(msg);
  }
  // *palavra* vira destaque amarelo
  function legenda(s) {
    return esc(s).replace(/\*([^*]+)\*/g, "<mark>$1</mark>");
  }
  // 7.4 segundos -> "00:07"
  function tempo(seg) {
    const s = Math.floor(seg || 0);
    return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
  }

  const ICONES = {
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle class="cheio" cx="17.2" cy="6.8" r="1.1"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3.5v11a3.75 3.75 0 1 1-3.75-3.75"/><path d="M14 3.5c.4 2.7 2.3 4.5 5 4.7"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="3.5"/><path d="M8 10.5V16.5"/><circle class="cheio" cx="8" cy="7.6" r="1.1"/><path d="M11.5 16.5v-6M11.5 13c0-1.6 1-2.6 2.4-2.6s2.4 1 2.4 2.6v3.5"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20.2l1.3-3.9A8.2 8.2 0 1 1 8.2 19z"/><path class="cheio" d="M9.3 7.9c-.4 0-.9.4-.9 1.2 0 2.8 3.6 6.5 6.6 6.5.8 0 1.3-.6 1.3-1 0-.3-.1-.4-.3-.5l-1.7-.8c-.3-.1-.5 0-.6.2l-.5.6c-1.2-.4-2.3-1.5-2.7-2.7l.6-.5c.2-.2.3-.4.2-.6l-.8-1.8c-.1-.3-.3-.6-.6-.6z"/></svg>',
    externo: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg>',
  };
  const NOMES_REDES = { instagram: "Instagram", tiktok: "TikTok", linkedin: "LinkedIn" };

  /* ---------- cores do data.js ---------- */

  const cores = D.cores || {};
  const raiz = document.documentElement.style;
  ["fundo", "bordo", "creme", "destaque"].forEach((c) => {
    if (cores[c]) raiz.setProperty("--" + c, cores[c]);
  });
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta && cores.fundo) meta.content = cores.fundo;
  document.title = (D.pagina && D.pagina.titulo) || (D.perfil && D.perfil.nome) || document.title;

  /* =====================================================================
     SEÇÕES
     ===================================================================== */

  function secClaquete() {
    const c = D.claquete || {};
    if (!c.cena && !c.meio && !c.gravando) return "";
    return (
      '<div class="claquete" aria-hidden="true">' +
      "<span>" + esc(c.cena) + "</span>" +
      "<span>" + esc(c.meio) + "</span>" +
      (c.gravando ? '<span class="rec">' + esc(c.gravando) + "</span>" : "<span></span>") +
      "</div>"
    );
  }

  function secTopo() {
    const p = D.perfil || {};
    const redes = (D.redes || [])
      .filter((r) => r.link)
      .map((r) => '<a class="rede"' + externo(r.link) + ' aria-label="' + esc(NOMES_REDES[r.rede] || r.rede) + '">' + (ICONES[r.rede] || ICONES.externo) + "</a>")
      .join("");
    const usuario = p.usuario
      ? (p.linkUsuario ? '<a class="usuario"' + externo(p.linkUsuario) + ">" + esc(p.usuario) + "</a>" : '<p class="usuario">' + esc(p.usuario) + "</p>")
      : "";
    return (
      '<header class="topo">' +
      '<div class="quadro">' +
      (p.foto ? '<img src="' + esc(p.foto) + '" alt="Foto de ' + esc(p.nome) + '">' : '<span class="iniciais">' + esc(iniciais(p.nome)) + "</span>") +
      "</div>" +
      '<div class="topo-lado">' +
      "<h1>" + esc(p.nome) + "</h1>" +
      usuario +
      (redes ? '<nav class="redes" aria-label="Redes sociais">' + redes + "</nav>" : "") +
      "</div>" +
      "</header>" +
      (p.frase ? '<p class="legenda"><span>' + legenda(p.frase) + "</span></p>" : "")
    );
  }

  function secWhatsapp() {
    const w = D.whatsapp || {};
    if (!w.link) return "";
    return (
      '<a class="whats"' + externo(linkWhats(w.link, w.mensagem)) + ">" +
      (w.etiqueta ? '<span class="whats-etiqueta">' + esc(w.etiqueta) + "</span>" : "") +
      '<strong class="whats-titulo">' + esc(w.titulo) + "</strong>" +
      '<span class="whats-rodape">' +
      (w.texto ? '<span class="whats-texto">' + esc(w.texto) + "</span>" : "<span></span>") +
      '<span class="whats-botao">' + ICONES.whatsapp + esc(w.botao || "Chamar") + "</span>" +
      "</span>" +
      "</a>"
    );
  }

  function secVideos() {
    const v = D.videos || {};
    const itens = (v.itens || []).filter((i) => i.capa || i.video);
    if (!itens.length) return "";
    const total = String(itens.length).padStart(2, "0");
    return (
      '<section class="videos" aria-labelledby="t-videos">' +
      '<div class="secao-cabeca">' +
      '<h2 id="t-videos">' + (v.cena ? "<span>" + esc(v.cena) + " · </span>" : "") + esc(v.titulo || "") + "</h2>" +
      '<span aria-hidden="true">' + total + " TAKES</span>" +
      "</div>" +
      '<div class="videos-lista">' +
      itens
        .map((i, n) => {
          const take = "TAKE " + String(n + 1).padStart(2, "0");
          return (
            '<a class="video' + (i.video ? " tem-video" : "") + '"' + externo(i.link) + ' aria-label="' + esc((i.marca || take) + ", abrir no Instagram") + '">' +
            '<span class="video-tela">' +
            (i.capa ? '<img src="' + esc(i.capa) + '" alt="">' : "") +
            (i.video ? '<video src="' + esc(i.video) + '"' + (i.capa ? ' poster="' + esc(i.capa) + '"' : "") + ' muted loop playsinline preload="none"></video>' : "") +
            '<span class="video-take" data-take="' + take + '">' + take + "</span>" +
            "</span>" +
            '<span class="video-legenda"><strong>' + esc(i.marca || "") + "</strong>" + ICONES.externo + "</span>" +
            "</a>"
          );
        })
        .join("") +
      "</div></section>"
    );
  }

  function secPortfolios() {
    const p = D.portfolios || {};
    const itens = (p.itens || []).filter((i) => i.titulo);
    if (!itens.length) return "";
    return (
      '<section class="portfolios" aria-labelledby="t-portfolios">' +
      '<div class="secao-cabeca"><h2 id="t-portfolios">' + (p.cena ? "<span>" + esc(p.cena) + " · </span>" : "") + esc(p.titulo || "") + "</h2></div>" +
      '<div class="portfolios-lista">' +
      itens
        .map(
          (i) =>
            '<a class="portfolio"' + externo(i.link) + ">" +
            '<span class="portfolio-texto"><strong>' + esc(i.titulo) + "</strong>" +
            (i.texto ? "<span>" + esc(i.texto) + "</span>" : "") + "</span>" +
            '<span class="portfolio-abrir">' + esc(i.botao || "Abrir") + ICONES.externo + "</span>" +
            "</a>"
        )
        .join("") +
      "</div></section>"
    );
  }

  app.innerHTML = [secClaquete(), secTopo(), secWhatsapp(), secVideos(), secPortfolios()].join("");

  /* =====================================================================
     PRÉVIA DOS VÍDEOS
     Computador: toca ao passar o mouse. Celular: toca quando aparece na tela.
     Enquanto toca, o selo "TAKE 01" vira o tempo do vídeo (00:03, 00:04...).
     ===================================================================== */

  function tocar(card) {
    const v = card.querySelector("video");
    if (!v) return;
    card.classList.add("tocando");
    const p = v.play();
    if (p) p.catch(() => card.classList.remove("tocando"));
  }
  function parar(card) {
    const v = card.querySelector("video");
    if (!v) return;
    card.classList.remove("tocando");
    v.pause();
    v.currentTime = 0;
    const selo = card.querySelector(".video-take");
    selo.textContent = selo.dataset.take;
  }

  const cardsComVideo = app.querySelectorAll(".video.tem-video");
  cardsComVideo.forEach((c) => {
    const v = c.querySelector("video");
    const selo = c.querySelector(".video-take");
    v.addEventListener("timeupdate", () => {
      if (c.classList.contains("tocando")) selo.textContent = tempo(v.currentTime);
    });
  });

  if (cardsComVideo.length && !reduzMovimento) {
    if (temMouse) {
      cardsComVideo.forEach((c) => {
        c.addEventListener("mouseenter", () => tocar(c));
        c.addEventListener("mouseleave", () => parar(c));
        c.addEventListener("focus", () => tocar(c));
        c.addEventListener("blur", () => parar(c));
      });
    } else if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver(
        (entradas) => entradas.forEach((e) => (e.isIntersecting ? tocar(e.target) : parar(e.target))),
        { threshold: 0.6 }
      );
      cardsComVideo.forEach((c) => obs.observe(c));
    }
  }
})();
