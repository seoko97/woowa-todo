import Component from "../component";
import CloseIcon from "../../../images/close.svg";
import "./style.css";

export default class TodoItem extends Component {
  $title;
  $description;
  $createBtn;

  constructor($parent, $attrs, $state, $props) {
    super($parent, "li", $attrs, $state, $props);

    this.render();
  }

  setEvent() {
    this.addEvent("click", ".icon.close", (e) => {
      this.$element.classList.add("delete");
      e.target;
    });

    this.addEvent("click", ".todo-item", (e) => {
      if (e.target.className === "button") {
        this.clearCreateItem(e.currentTarget);
      } else if (e.target.className === "button primary") {
        // 상위 state 변경 로직 있어야함

        this.$props.addTodoItem({
          id: 10,
          title: this.$title.value,
          description: this.$description.value,
        });
      }
    });

    this.addEvent("input", ".todo-item", (e) => {
      const $inputList = e.currentTarget.querySelectorAll("input");

      const check = Array.from($inputList).every((input) => input.value !== "");

      const isDisabledBtn = this.$createBtn.disabled;

      console.log(check, isDisabledBtn);

      if (check && isDisabledBtn) this.$createBtn.removeAttribute("disabled");
      else if (!check && !isDisabledBtn) this.$createBtn.disabled = true;
    });
  }

  clearCreateItem($target) {
    this.clearInput($target);
    $target.style.display = "none";
  }

  clearInput($target) {
    $target.querySelectorAll("input").forEach((input) => (input.value = ""));
  }

  getTemplate() {
    const { status, todo } = this.$state;

    if (status === "DEFAULT") {
      return `
        <span class="icon close">${CloseIcon}</span>
        <div class="todo-item_content">
          <h3 class="title">${todo.title}</h3>
          <p class="description">${todo.description}</p>
        </div>
      `;
    } else if (status === "CREATE") {
      this.$element.classList.add("focus");
      return `
        <div class="todo-item_content create">
          <input class="title" name="title" placeholder="제목을 입력하세요" />
          <input class="description" name="description" placeholder="내용을 입력하세요" />
        </div>
        <div class="todo-item_btn-container">
          <button class="button">취소</button>
          <button class="button primary" disabled>등록</button>
        </div>
      `;
    } else if (status === "EDIT") {
      return `
        <span class="icon close">${CloseIcon}</span>
        <div class="todo-item_content">
          <input value="${todo.title}" class="title"  name="title" placeholder="제목을 입력하세요"/>
          <input value="${todo.description}" class="description"  name="description"placeholder="내용을 입력하세요" />
          <input />
        </div>
        <div class="todo-item_btn-container">
          <button class="button">취소</button>
          <button class="button primary">수정</button>
        </div>
      `;
    }
  }

  mount() {
    this.$element.innerHTML = this.getTemplate();

    this.$title = this.$element.querySelector("input.title");
    this.$description = this.$element.querySelector("input.description");
    this.$createBtn = this.$element.querySelector(".primary");
  }
}
