'use strict';
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const opened = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(opened));
    menuToggle.setAttribute('aria-label', opened ? 'Fechar menu' : 'Abrir menu');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
  }));
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('nome').value.trim();
    const service = document.getElementById('servico').value.trim();
    const neighborhood = document.getElementById('bairro').value.trim();
    const message = document.getElementById('mensagem').value.trim();
    const feedback = document.getElementById('formFeedback');
    if (!name || !service) {
      feedback.textContent = 'Informe seu nome e escolha o serviço desejado.';
      if (!name) document.getElementById('nome').focus(); else document.getElementById('servico').focus();
      return;
    }
    feedback.textContent = '';
    const text = [
      'Olá, Vidraçaria MSD! Gostaria de solicitar um orçamento.',
      '',
      'Nome: ' + name,
      'Serviço: ' + service,
      neighborhood ? 'Bairro / cidade: ' + neighborhood : '',
      message ? 'Detalhes: ' + message : '',
      '',
      'Aguardo seu retorno. Obrigado!'
    ].filter(line => line !== null).join('\n');
    const url = 'https://wa.me/5545998327025?text=' + encodeURIComponent(text);
    // Navega na mesma aba para funcionar também com bloqueadores de pop-up.
    window.location.href = url;
  });
}
const galleryButtons = [...document.querySelectorAll('[data-gallery]')];
const lightbox = document.getElementById('lightbox');
const lbImage = document.getElementById('lbImage');
const lbCaption = document.getElementById('lbCaption');
const lbCounter = document.getElementById('lbCounter');
const lbClose = document.getElementById('lbClose');
const lbPrev = document.getElementById('lbPrev');
const lbNext = document.getElementById('lbNext');
let galleryIndex = 0;
let lastGalleryTrigger = null;
const gallery = galleryButtons.map(button => {
  const image = button.querySelector('img');
  return {src: image.getAttribute('src'), alt: image.getAttribute('alt')};
});
function showGallery(index) {
  if (!gallery.length) return;
  galleryIndex = (index + gallery.length) % gallery.length;
  lbImage.src = gallery[galleryIndex].src;
  lbImage.alt = gallery[galleryIndex].alt;
  lbCaption.textContent = gallery[galleryIndex].alt;
  lbCounter.textContent = (galleryIndex + 1) + ' / ' + gallery.length;
}
function openGallery(index, trigger) {
  lastGalleryTrigger = trigger;
  showGallery(index);
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lock-scroll');
  lbClose.focus();
}
function closeGallery() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lock-scroll');
  lbImage.removeAttribute('src');
  if (lastGalleryTrigger) lastGalleryTrigger.focus();
}
galleryButtons.forEach((button, index) => button.addEventListener('click', () => openGallery(index, button)));
if (lbClose) lbClose.addEventListener('click', closeGallery);
if (lbPrev) lbPrev.addEventListener('click', () => showGallery(galleryIndex - 1));
if (lbNext) lbNext.addEventListener('click', () => showGallery(galleryIndex + 1));
if (lightbox) lightbox.addEventListener('click', event => { if (event.target === lightbox) closeGallery(); });
document.addEventListener('keydown', event => {
  if (!lightbox || !lightbox.classList.contains('is-open')) return;
  if (event.key === 'Escape') closeGallery();
  if (event.key === 'ArrowLeft') showGallery(galleryIndex - 1);
  if (event.key === 'ArrowRight') showGallery(galleryIndex + 1);
});
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
