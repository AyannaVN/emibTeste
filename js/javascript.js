(() => {
  const video = document.getElementById("emib-hero-video");
  if (!video) return;

  // 1. Lista dos 3 vídeos para Computador
  const videosDesktop = [
    "../img/video/videoFundo1.mp4",
    "../img/video/videoFundo2.mp4",
    "../img/video/videoFundo3.mp4"
  ];

  // 2. Lista das 3 variações para Celular (na mesma ordem)
  const videosMobile = [
    "../img/video/videoFundo1-cel.mp4",
    "../img/video/videoFundo2-cel.mp4",
    "../img/video/videoFundo3-cel.mp4"
  ];

  // 3. Sorteio randômico (0, 1 ou 2) sem repetir o anterior
  let previous = -1;
  try {
    const saved = localStorage.getItem("emibHeroLastVideo");
    if (saved !== null) previous = Number(saved);
  } catch (error) {}

  let available = [0, 1, 2].filter(index => index !== previous);
  const selected = available[Math.floor(Math.random() * available.length)];

  try {
    localStorage.setItem("emibHeroLastVideo", String(selected));
  } catch (error) {}

  // 4. Detecção responsiva (até 620px carrega a versão -cel)
  const mediaQuery = window.matchMedia("(max-width: 620px)");

  const aplicarVideoResponsivo = () => {
    const listaAtual = mediaQuery.matches ? videosMobile : videosDesktop;
    const novoSrc = listaAtual[selected];

    if (!video.src.endsWith(novoSrc)) {
      video.src = novoSrc;
      video.load();
      video.play().catch(() => {});
    }
  };

  // Executa ao abrir o site e escuta mudanças de tamanho de tela
  aplicarVideoResponsivo();
  mediaQuery.addEventListener("change", aplicarVideoResponsivo);

  // Retoma o vídeo se o usuário trocar de aba e voltar
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && video.paused) video.play().catch(() => {});
  });
})();

// --- Controle do Menu Mobile e dos players do YouTube ---
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-links');
toggle?.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.nav-links a').forEach(a => 
  a.addEventListener('click', () => menu.classList.remove('open'))
);
document.querySelectorAll('.video-shell').forEach(shell => {
  const button = shell.querySelector('.video-poster');
  button?.addEventListener('click', () => {
    const id = shell.dataset.video;
    const iframe = document.createElement('iframe');
    iframe.src = 'https://youtube.com' + id + '?autoplay=1';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    button.replaceWith(iframe);
  });
});
