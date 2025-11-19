// Sets CSS variables related to layout (e.g., header height) so CSS can size sections precisely.
(function () {
  function setHeaderHeightVar() {
    var header = document.querySelector('.site-header');
    var h = header ? header.getBoundingClientRect().height : 0;
    document.documentElement.style.setProperty('--header-h', h + 'px');
  }
  setHeaderHeightVar();
  window.addEventListener('resize', setHeaderHeightVar);
  window.addEventListener('orientationchange', setHeaderHeightVar);
  document.addEventListener('readystatechange', function(){ if (document.readyState === 'complete') setHeaderHeightVar(); });
})();
