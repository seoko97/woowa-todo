import Component from "../component";
import MenuIcon from "../../../images/menu.svg";
import CloseIcon from "../../../images/close.svg";

export default class Header extends Component {
  constructor($parent) {
    super($parent, "header", { class: "header" });
  }

  mount() {
    this.$element.innerHTML = `
      <h1 class="header__logo">TO DO LIST</h1>
      <button class="header__menu-btn">${MenuIcon}</button>
      <div class="sidebar__backdrop"></div>
      <aside class="sidebar">
        <div class="sidebar__header">
          <button class="sidebar__close-btn">${CloseIcon}</button>
        </div>
        <ul class="sidebar__log-list">
        </ul>
      </aside>
    `;
  }

  onOpenSidebar() {
    this.$element.classList.toggle("is-sidebar-open", true);
  }

  onCloseSidebar() {
    this.$element.classList.toggle("is-sidebar-open", false);
  }

  setEvent() {
    this.addEvent("click", ".header__menu-btn", () => this.onOpenSidebar());
    this.addEvent("click", ".sidebar__close-btn", () => this.onCloseSidebar());
    this.addEvent("click", ".sidebar__backdrop", () => this.onCloseSidebar());
  }
}
