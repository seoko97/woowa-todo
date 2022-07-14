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

  setStatus(newStatus) {
    this.$element.classList.toggle("default", newStatus === "DEFAULT");
    this.$element.classList.toggle("create", newStatus === "CREATE");
    this.$element.classList.toggle("edit", newStatus === "EDIT");
    this.setState({ ...this.$state, status: newStatus });
  }

  setEvent() {
    this.$element.removeEventListener("input", this.onChnageInput.bind(this));
    this.addEvent("input", ".todo-item", this.onChnageInput.bind(this));
  }

  onChnageInput() {
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
        <div class="todo-item_content">
          <input value="${
            title ?? ""
          }" class="title"  name="title" placeholder="제목을 입력하세요"/>
          <input value="${
            description ?? ""
          }" class="description"  name="description"placeholder="내용을 입력하세요" />
          <input />
        </div>
        <div class="todo-item_btn-container">
          <button class="button cancle">취소</button>
          <button class="button primary submit">${
            status === "CREATE" ? "생성" : "수정"
          }</button>
        </div>
      `;

    this.$title = this.$element.querySelector("input.title");
    this.$description = this.$element.querySelector("input.description");
    this.$createBtn = this.$element.querySelector(".submit");
  }
}
