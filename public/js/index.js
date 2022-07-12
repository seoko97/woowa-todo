import "../styles/normalize.css";
import "../styles/styles.css";

export class App {
  constructor($element) {
    this.$element = $element;
    this.init();
  }

  init() {
    this.$element.innerHTML = "<h1>Hello WWWWWorld</h1>";
  }
}

const app = document.getElementById("app");

new App(app);