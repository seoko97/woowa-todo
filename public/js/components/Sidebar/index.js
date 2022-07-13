import "./style.css";
import Component from "../component";
import LogList from "../LogList";
import CloseIcon from "../../../images/close.svg";

export default class Sidebar extends Component {
  constructor($parent) {
    super($parent, "aside", { class: "sidebar" });

    this.render();
  }

  mount() {
    this.$element.innerHTML = `
      <div class="sidebar__header">
        <button class="sidebar__close-btn">${CloseIcon}</button>
      </div>
    `;

    new LogList(this.$element);
  }
}
