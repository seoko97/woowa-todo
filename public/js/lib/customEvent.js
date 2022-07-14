const createCustomEvent = (eventName, $element, cb) => {
  $element.addEventListener(eventName, cb, true);
};

const removeCustomEvent = (eventName, $element, cb) =>
  $element.removeEventListener(eventName, cb);

const dispatchCutomEvent = (eventName, $element, options = {}) => {
  const myEvent = new CustomEvent(eventName, { detail: { ...options } });
  $element.dispatchEvent(myEvent);
};
export { createCustomEvent, removeCustomEvent, dispatchCutomEvent };
