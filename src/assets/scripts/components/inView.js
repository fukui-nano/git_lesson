import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import UaParser from 'ua-parser-js';

gsap.registerPlugin(ScrollTrigger);

// 画面内に入ったら「.js-inView」を付与した要素に「.is-inView」追加で付与
export default class InView {
  constructor(element) {
    this.elm = element;
    this.uaParser = new UaParser();
    this.os = this.uaParser.getOS().name;
    this.init();
  }
  watchItem() {
    if(this.os === 'iOS' || this.os === 'Android') {
      // モバイル向け
      ScrollTrigger.create({
        trigger: this.elm,
        start: "top 80%",
        end: () => `+=${this.elm.clientHeight + 30}`,
        onEnter: () => this.elm.classList.add('is-inView'),
        // markers: true,
      });
    } else {
      // デスクトップ向け
      ScrollTrigger.create({
        trigger: this.elm,
        start: "top 70%",
        end: () => `+=${this.elm.clientHeight + 30}`,
        onEnter: () => this.elm.classList.add('is-inView'),
        // markers: true,
      });
    }
  }
  init() {
    this.watchItem();
  }
}
