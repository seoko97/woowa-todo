import Component from "../component";

export default class LogList extends Component {
  constructor($parent) {
    super($parent, "ul", { class: "log-list" });

    this.render();
  }

  mount() {}
}
