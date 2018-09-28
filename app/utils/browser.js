export function _isMac() {
  let ua = navigator.userAgent;
  return /Mac OS/i.test(ua);
}


export function _isIE() {
  let ua = navigator.userAgent;
  return /trident/i.test(ua) || /Edge\/\d./i.test(ua);
}

// only mobile touch-enabled device
export function _isTouchDevice() {
  let ua = navigator.userAgent;
  let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(ua);
  // let canTouch = isMobile || 'ontouchstart' in document; // surface pro ....
  let canTouch = isMobile;
  return canTouch;
}



export let isMac = _isMac();
export let isIE = _isIE();
export let isTouchDevice = _isTouchDevice();
