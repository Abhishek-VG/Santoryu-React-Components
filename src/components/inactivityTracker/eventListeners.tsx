export default (cb: () => any, type: 'attach' | 'detach') => {
  ['mousemove', 'mouseout', 'mouseleave', 'mouseover', 'mouseenter', 'keydown', 'keypress', 'keyup'].forEach((indvType: string) => {
    if (type === 'attach') {
      attachEventListener(indvType, cb);
    } else {
      detachEventListener(indvType, cb);
    }
  });
};

const detachEventListener = (type: string, cb: () => any) => {
  document.body.removeEventListener(type, cb);
};

const attachEventListener = (type: string, cb: () => any) => {
  document.body.removeEventListener(type, cb);
};
