import { requestCreateTodo, requestUpdateTodo } from "../../api/todo";
import { dispatchCutomEvent } from "../../lib/customEvent";
import Component from "../component";
import BaseItem from "../TodoItem/BaseItem";
import InputItem from "../TodoItem/InputItem";

export default class SectionList extends Component {
  $todos;

  constructor($parent, $state, $props) {
    super($parent, "ul", { class: "todo-section-ul" }, $state, $props);

    this.render();
  }

  setEvent() {
    this.$element.removeEventListener("click", this.onClickItem.bind(this));
    this.addEvent("click", ".todo-item-inner", this.onClickItem.bind(this));
  }

  onClickItem(e) {
    const $item = e.target.closest(".todo-item");
    const $button = e.target.closest(".button");

    if (!$button || !$item) return;

    const itemState = this.$state.todos.find(
      (todo) => todo.id === parseInt($item.dataset.id)
    );

    if (itemState?.status === "EDIT") this.toggleButtonByEdit(itemState.id, e);
    else this.toggleButtonByCreate(e);
  }

  getCurrentValue($current) {
    const $todoItem = $current.closest(".todo-item");
    const $titleInput = $todoItem.querySelector("input.title");
    const $descriptionInput = $todoItem.querySelector("textarea.description");

    return {
      todoId: $todoItem.dataset.id,
      title: $titleInput.value,
      description: $descriptionInput.value,
    };
  }

  toggleButtonByCreate(e) {
    if (e.target.classList.contains("cancle")) {
      document.querySelector(".active").classList.remove("active");
      this.mount();
    } else if (e.target.classList.contains("submit")) {
      const $section = this.$parent;
      const { title, description } = this.getCurrentValue(e.target);

      requestCreateTodo({
        sectionId: $section.dataset.id,
        title,
        description,
      }).then(() => {
        dispatchCutomEvent(`getSection${$section.dataset.id}`, $section);
      });
    }
  }

  toggleButtonByEdit(id, e) {
    const newState = { ...this.$state };

    if (e.target.classList.contains("cancle")) {
      const todoState = newState.todos.find((todo) => todo.id === id);
      todoState.status = "DEFAULT";
      this.setState(newState);
    } else if (e.target.classList.contains("submit")) {
      const $section = this.$parent;
      const { description, title, todoId } = this.getCurrentValue(e.target);

      requestUpdateTodo(todoId, { title, description }).then(() => {
        dispatchCutomEvent(`getSection${$section.dataset.id}`, $section);
      });
    }
  }

  mount() {
    this.$element.innerHTML = "";
    const { todos } = this.$state;

    new InputItem(
      this.$element,
      {
        class: "todo-item create focus hidden",
      },
      { status: "CREATE", id: 0, title: "", description: "" },
      {}
    );

    this.$todos = todos.map((todo) => {
      switch (todo.status) {
        case "DEFAULT":
          return new BaseItem(
            this.$element,
            {
              class: "todo-item default",
              "data-id": todo.id,
            },
            todo,
            {}
          );
        case "EDIT":
          return new InputItem(
            this.$element,
            {
              class: "todo-item edit",
              "data-id": todo.id,
            },
            todo,
            {}
          );
        default:
          return;
      }
    });
  }
}
