import Component from "../component";
import PlusIcon from "../../../images/plus.svg";
import CloseIcon from "../../../images/close.svg";

export default class SectionHeader extends Component {
  constructor($parent, $state, $props) {
    super($parent, "div", { class: "todo-section-header" }, $state, $props);

    this.render();
  }

  mount() {
    const { title, todos } = this.$state;
    this.$element.innerHTML = `
          <div class="todo-section-header__left">
            <h3>${title}</h3>
            <span>${
              todos.filter((todo) => todo.status !== "CREATE").length
            }</span>
          </div>
          <span class="icon plus">
            ${PlusIcon}
          </span>
          <span class="icon close">
            ${CloseIcon}
          </span>
    `;
  }
}
