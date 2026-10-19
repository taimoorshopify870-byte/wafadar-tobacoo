const products = [{"name": "Original", "className": "", "description": "A signature dark-green design, inspired by the character of traditional naswar. This is a sample product concept; ingredients and specifications are not yet confirmed."}, {"name": "Fresh Mint", "className": "tin-mint", "description": "A mint-green expression of the Wafadar Tobacco collection. This is a sample product concept; ingredients and specifications are not yet confirmed."}, {"name": "Dark", "className": "tin-dark", "description": "An understated charcoal design for the Wafadar Tobacco collection. This is a sample product concept; ingredients and specifications are not yet confirmed."}];
const menuToggle = document.querySelector('#menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function toggleMenu(open) {
  mobileNav.hidden = !open;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menuToggle.querySelector('.menu-open-icon').hidden = open;
  menuToggle.querySelector('.menu-close-icon').hidden = !open;
}
menuToggle.addEventListener('click', () => toggleMenu(mobileNav.hidden));
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => toggleMenu(false)));
const modal = document.querySelector('#product-modal');
const closeButton = document.querySelector('#modal-close');
const backButton = document.querySelector('#modal-back');
let previousFocus = null;
function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = '';
  if (previousFocus) previousFocus.focus();
}
document.querySelectorAll('[data-product]').forEach(button => {
  button.addEventListener('click', () => {
    const product = products[Number(button.dataset.product)];
    if (!product) return;
    previousFocus = button;
    const tin = button.closest('article').querySelector('.tin').cloneNode(true);
    document.querySelector('#modal-tin').replaceChildren(tin);
    document.querySelector('#product-title').textContent = `WAFADAR TOBACCO ${product.name}`;
    document.querySelector('#product-description').textContent = product.description;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    closeButton.focus();
  });
});
closeButton.addEventListener('click', closeModal);
backButton.addEventListener('click', closeModal);
modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', event => {
  if (modal.hidden) return;
  if (event.key === 'Escape') closeModal();
  if (event.key === 'Tab') {
    if (event.shiftKey && document.activeElement === closeButton) {
      event.preventDefault(); backButton.focus();
    } else if (!event.shiftKey && document.activeElement === backButton) {
      event.preventDefault(); closeButton.focus();
    }
  }
});
