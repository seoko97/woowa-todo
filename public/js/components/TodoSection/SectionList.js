import { requestCreateTodo } from "../../api/todo";
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
    this.addEvent("click", ".todo-item", this.onClickItem.bind(this));
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

  toggleButtonByCreate(e) {
    if (e.target.classList.contains("cancle")) {
      document.querySelector(".active").classList.remove("active");
      this.mount();
    } else if (e.target.classList.contains("submit")) {
      // 상위 state 변경 로직 있어야함
      const $createForm = e.target.closest(".todo-item");
      const $section = e.target.closest(".todo-section");

      const $titleInput = $createForm.querySelector("input.title");
      const $descriptionInput = $createForm.querySelector(
        "textarea.description"
      );

      requestCreateTodo({
        sectionId: $section.dataset.id,
        title: $titleInput.value,
        description: $descriptionInput.value,
      }).then(() => {
        dispatchCutomEvent(`getSection${$section.dataset.id}`, $section, {});
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
      // 상위 state 변경 로직 있어야함
      console.log("@@@");
    }
  }

  mount() {
    this.$element.innerHTML = "";
    const { todos } = this.$state;
    const $start = document.createElement("li");
    $start.classList = "start";

    new InputItem(
      this.$element,
      {
        class: "todo-item create focus hidden",
      },
      { status: "CREATE", id: 0, title: "", description: "" },
      {}
    );

    this.$element.append($start);

    this.$todos = todos.map((todo) => {
      console.log(todo);
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
