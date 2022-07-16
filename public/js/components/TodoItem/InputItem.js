import Component from "../component";
import "./style.css";

export default class InputItem extends Component {
  $title;
  $description;
  $createBtn;

  constructor($parent, $attrs, $state, $props) {
    super($parent, "li", $attrs, $state, $props);

    this.render();
  }

  setEvent() {
    this.$element.removeEventListener("input", this.onChangeInput.bind(this));
    this.addEvent("input", ".todo-item", this.onChangeInput.bind(this));
  }

  onChangeInput(e) {
    e.target.value = e.target.value.substring(0, 500);

    if (e.target === this.$description) {
      this.$description.style.height = "auto";
      this.$description.style.height = `${this.$description.scrollHeight}px`;
    }

    const check = this.$title.value !== "" && this.$description.value !== "";

    const isDisabledBtn = this.$createBtn.disabled;

    if (check && isDisabledBtn) this.$createBtn.disabled = false;
    else if (!check && !isDisabledBtn) this.$createBtn.disabled = true;
  }

  clearCreateItem($target) {
    $target.querySelectorAll("input").forEach((input) => (input.value = ""));
    $target.style.display = "none";
  }

  mount() {
    const { status, title, description } = this.$state;

    this.$element.innerHTML = `
    <div class="todo-item-inner">
      <div class="todo-item_content">
        <input value="${title}" class="title" name="title" placeholder="제목을 입력하세요"/>
        <textarea class="description" maxlength="500" name="description" placeholder="내용을 입력하세요">${description}</textarea>
      </div>
      <div class="todo-item_btn-container">
        <button class="button cancle">취소</button>
        <button class="button primary submit"></button>
      </div>
    </div>
    `;

    this.$title = this.$element.querySelector("input.title");
    this.$description = this.$element.querySelector("textarea.description");
    this.$createBtn = this.$element.querySelector(".submit");

    if (status === "CREATE") {
      this.$createBtn.innerText = "생성";
      this.$createBtn.disabled = true;
    } else {
      this.$createBtn.innerText = "수정";
    }
  }
}
