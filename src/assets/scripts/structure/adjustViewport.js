// 375px以下デバイス向け viewport指定
!(function () {
  const viewport = document.querySelector('meta[name="viewport"]');
  function adjustViewport() {
    const value =
      window.outerWidth > 375
        ? 'width=device-width,initial-scale=1'
        : 'width=375';
    if (viewport.getAttribute('content') !== value) {
      viewport.setAttribute('content', value);
    }
  }
  addEventListener('resize', adjustViewport, false);
  adjustViewport();
})();
