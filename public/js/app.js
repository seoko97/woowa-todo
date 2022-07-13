import "../css/normalize.css";
import "../css/styles.css";
import MainContent from "./components/MainContent";
import TodoItem from "./components/TodoItem";

export class App {
  constructor($target) {
    this.$target = $target;
    this.init();
  }

  init() {
    new MainContent(this.$target, {}, {});
  }
}

export default App;
