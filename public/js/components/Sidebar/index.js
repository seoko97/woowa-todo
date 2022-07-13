import "./style.css";
import LogList from "../LogList";
import Component from "../component";
import CloseIcon from "../../../images/close.svg";

export default class Sidebar extends Component {
  $logList;

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

    this.$logList = new LogList(this.$element);
  }
}
