import Component from "../component";
import SectionHeader from "./SectionHeader";
import SectionList from "./SectionList";

import "./style.css";

export default class TodoSection extends Component {
  $header;
  $list;

  constructor($parent, $state, $props) {
    super($parent, "section", { class: "todo-section" }, $state, $props);

    this.render();
    console.log(this.$state);
  }

  setEvent() {
    this.addEvent("click", ".icon.plus", (e) => {
      this.$list.$element.querySelector(".todo-item.create").style.display =
        "flex";
    });
  }

  addTodoItem(item) {
    const newTodos = [...this.$state.todos];
    newTodos.push(item);

    this.setState({ title: this.$state.title, todos: newTodos });
  }

  mount() {
    this.$element.innerHTML = "";
    const { title, todos } = this.$state;

    new SectionHeader(this.$element, { title, todos }, {});
    this.$list = new SectionList(
      this.$element,
      { todos },
      { addTodoItem: this.addTodoItem.bind(this) }
    );
  }
}
