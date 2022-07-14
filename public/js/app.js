import MainContent from "./components/MainContent";
import Modal from "./components/Modal";
import "../css/normalize.css";
import "../css/styles.css";

export class App {
  constructor($target) {
    this.$target = $target;
    this.init();
  }

  init() {
    new MainContent(this.$target, {}, {});
    new Modal(document.body);
  }
}

export default App;
