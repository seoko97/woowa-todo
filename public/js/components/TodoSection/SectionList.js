import Component from "../component";
import TodoItem from "../TodoItem";

export default class SectionList extends Component {
  constructor($parent, $state, $props) {
    super($parent, "ul", { class: "todo-section-ul" }, $state, $props);

    this.render();
  }

  setEvent() {}

  mount() {
    const { todos } = this.$state;

    new TodoItem(
      this.$element,
      { class: "todo-item create" },
      { status: "CREATE" },
      { addTodoItem: this.$props.addTodoItem }
    );
    todos.forEach((todo) => {
      new TodoItem(
        this.$element,
        { class: "todo-item" },
        { todo, status: "DEFAULT" },
        {}
      );
    });
  }
}
