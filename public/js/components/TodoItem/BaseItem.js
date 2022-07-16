import Component from "../component";
import CloseIcon from "../../../images/close.svg";
import "./style.css";

export default class BaseItem extends Component {
  constructor($parent, $attrs, $state, $props) {
    super($parent, "li", $attrs, $state, $props);

    this.render();
  }

  mount() {
    const { title, description } = this.$state;

    this.$element.innerHTML = `
        <div class="todo-item-inner">
          <span class="icon close">${CloseIcon}</span>
          <div class="todo-item_content">
            <h3 class="title">${title}</h3>
            <p class="description">${description}</p>
            <p class="author">author by web</>
          </div>
        </div>
      `;
  }
}
