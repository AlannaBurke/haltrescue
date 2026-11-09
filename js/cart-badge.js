// Keeps the navbar Cart link's item count in sync with the cart
// saved in this browser (localStorage key haltCartV1, the same
// storage the product pages and /checkout use). The cart survives
// moving around the site, including the blog, because it lives in
// the browser, not on a single page.
//
// The label is re-checked every second and compared against what
// the link currently shows: the site's own rendering can reset the
// link text (for example right after a page loads), so a cached
// count is not enough — the tick has to notice the reset and
// restore the count.
(function () {
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
    var label = n > 0 ? '🛒 Cart (' + n + ')' : '🛒 Cart';
    var links = document.querySelectorAll('a.halt-cart-link');
    links.forEach(function (a) {
      if (a.textContent !== label) {
        a.textContent = label;
      }
    });
  }
  document.addEventListener('DOMContentLoaded', update);
  window.addEventListener('load', update);
  window.addEventListener('storage', update);
  setInterval(update, 1000);
  update();
})();
