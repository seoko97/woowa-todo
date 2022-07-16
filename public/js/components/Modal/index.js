import { requestDeleteTodo } from "../../api/todo";
import { createCustomEvent, dispatchCutomEvent } from "../../lib/customEvent";
import Component from "../component";
import "./style.css";

export default class Modal extends Component {
  todoId;
  sectionId;
  $section;
  toggleTodoItem;

  constructor($parent) {
    super($parent, "div", { id: "modal" });

    this.render();
  }

  setEvent() {
    createCustomEvent(
      "openModalAndSetTodo",
      this.$element,
      this.openModalAndSetTodo.bind(this)
    );

    this.addEvent("click", "#modal", (e) => {
      const $card = e.target.closest(".delete-card");

      if ($card) this.onClickButton(e);
      else this.toggleModal();
    });
  }

  openModalAndSetTodo(e) {
    const { todoId, sectionId, $section, toggleTodoItem, $todoItem } = e.detail;

    this.todoId = todoId;
    this.sectionId = sectionId;
    this.$section = $section;
    this.$todoItem = $todoItem;
    this.toggleTodoItem = toggleTodoItem;

    this.toggleModal();
  }

  toggleModal() {
    this.$element.classList.toggle("open");
  }

  onClickButton(e) {
    const $button = e.target.closest(".button");

    if (!$button) return;

    if ($button.classList.contains("close")) {
      this.toggleTodoItem(this.$todoItem);
      this.toggleModal();
    } else if ($button.classList.contains("delete")) {
      // api
      this.toggleModal();

      requestDeleteTodo(this.todoId).then(() => {
        dispatchCutomEvent(`getSection${this.sectionId}`, this.$section);
      });
    }
  }

  mount() {
    this.$element.innerHTML = `
       <div class="delete-card">
          <p>선택한 카드를 삭제할까요?</p>
          <div class="delete-card-button-list">
            <button class="button close">취소</button>
            <button class="button primary delete">삭제</button>
          </div>
        </div>
    `;
  }
}
