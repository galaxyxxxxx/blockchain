import { throttle } from './throttle';

const baseSize = 16;

function setRem() {
  const scale = document.documentElement.clientWidth / 1024;
  // 设置页面根节点字体大小, 字体大小最小为12
  let fontSize = baseSize * Math.min(scale, 2) > 12 ? baseSize * Math.min(scale, 4) : 12;
  document.documentElement.style.fontSize = fontSize + 'px';
}

setRem();

window.onresize = throttle(setRem, 500);
