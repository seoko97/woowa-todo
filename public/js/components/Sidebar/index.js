import Component from "../component";
import CloseIcon from "../../../images/close.svg";

export default class Sidebar extends Component {
  constructor($parent) {
    super($parent, "aside", { class: "sidebar" });
  }

  mount() {
    this.$element.innerHTML = `
    <aside class="sidebar">
      <div class="sidebar__header">
        <button class="sidebar__close-btn">${CloseIcon}</button>
      </div>
      <ul class="sidebar__log-list">
      </ul>
    </aside>
    `;
  }
}
