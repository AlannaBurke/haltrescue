// Keeps the navbar Cart link's item count in sync with the cart
// saved in this browser (localStorage key haltCartV1, the same
// storage the product pages and /checkout use). The cart survives
// moving around the site, including the blog, because it lives in
// the browser, not on a single page.
(function () {
  var last = null;
  function cartCount() {
    try {
      var raw = window.localStorage.getItem('haltCartV1');
      if (!raw) {
        return 0;
      }
      var stored = JSON.parse(raw);
      var n = 0;
      Object.keys(stored).forEach(function (id) {
        n += Math.max(0, parseInt(stored[id], 10) || 0);
      });
      return n;
    } catch (e) {
      return 0;
    }
  }
  function update() {
    var n = cartCount();
    if (n === last) {
      return;
    }
    last = n;
    var links = document.querySelectorAll('a.halt-cart-link');
    links.forEach(function (a) {
      a.textContent = n > 0 ? '🛒 Cart (' + n + ')' : '🛒 Cart';
    });
  }
  document.addEventListener('DOMContentLoaded', update);
  window.addEventListener('storage', function () {
    last = null;
    update();
  });
  setInterval(update, 1000);
})();
