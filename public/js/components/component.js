export default class Component {
  $parent;
  $state;
  $props;
  $element;

  constructor($parent, $tagName, $attrs, $state, $props) {
    this.$element = document.createElement($tagName);
    this.$props = $props;
    this.$state = $state;

    for (const attr in $attrs) {
      this.$element.setAttribute(attr, $attrs[attr]);
    }
    this.render();
    $parent.append(this.$element);
  }

  setState(newState) {
    this.$state = {
      ...this.$state,
      ...newState,
    };
    this.render();
  }

  mount() {}

  setEvent() {}

  addEvent(eventType, selector, cb) {
    const childen = [...this.$element.querySelectorAll(selector)];
    const isTarget = (target) =>
      childen.includes(target) || target.closest(selector);

    this.$element.addEventListener(eventType, (e) => {
      if (isTarget(e.target)) cb(e);
    });
  }

  render() {
    this.mount();
    this.setEvent();
  }
}
