// ウィンドウの横幅と高さをCSS変数化
!(function () {
  let baseVw = window.innerWidth;

  const adjustVh = () => {
    const vh = document.documentElement.clientHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  const adjustVw = function() {
    const vw = document.documentElement.clientWidth * 0.01;
    document.documentElement.style.setProperty('--vw', `${vw}px`);
  }

  window.addEventListener('resize', () => {
    adjustVw();
    if (baseVw === window.innerWidth) {
      // 画面の横幅にサイズ変動がないので処理を終える
      return;
    }
    // 画面の横幅のサイズ変動があった時のみ高さを再計算する
    baseVw = window.innerWidth;
    adjustVh();
  });

  // 初期化
  adjustVh();
  adjustVw();
})();

// Usage Examples
// -----------------
// // CSS
// .eml {
//   width: calc(var(--vw) * 100); // 100vw
//   height: calc(var(--vh) * 100); // 100vh
//   width: calc(var(--vw) * 50); // 50vw
//   height: calc(var(--vh) * 80); // 80vh
// }

