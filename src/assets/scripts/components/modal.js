import MicroModal from 'micromodal';
const bodyScrollLock = require('body-scroll-lock');
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;
import UaParser from 'ua-parser-js';

export default class Modal {
  constructor() {
    this.uaParser = new UaParser();
    this.os = this.uaParser.getOS().name;
    this.init();
  }
  open(id) {
    // スクロール可能にするコンテンツ
    const scrollCont = document.querySelector(`#${id} .js-modalScroll`);

    // スクロールバー分の差分をCSS変数化
    const scrollbarWidth = window.innerWidth - document.body.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-gap', `${scrollbarWidth}px`);

    if(scrollCont) {
      // 選択したコンテンツを除きスクロールを無効
      disableBodyScroll(scrollCont, { reserveScrollBarGap: true });
    }
  }
  close(id) {
    // スクロール可能にするコンテンツ
    const scrollCont = document.querySelector(`#${id} .js-modalScroll`);

    // スクロールバー分の差分をCSS変数化
    document.documentElement.style.setProperty('--scrollbar-gap', '0px');

    if(scrollCont) {
      // スクロール位置をリセット
      scrollCont.scrollTop = 0;
      // スクロールを無効解除
      enableBodyScroll(scrollCont);
    }
  }
  init() {
    MicroModal.init({
      onShow: modal => {
        this.open(modal.id);
      },
      onClose: modal => {
        this.close(modal.id);
      },
      openTrigger: 'data-modal-open',
      closeTrigger: 'data-modal-close',
      openClass: 'is-open',
      disableScroll: false, // デバイスによって効かないため、body-scroll-lockで代用
      disableFocus: false,
      awaitOpenAnimation: true,
      awaitCloseAnimation: true,
    });
  }
}
