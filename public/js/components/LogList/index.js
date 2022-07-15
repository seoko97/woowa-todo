import "./style.css";
import Component from "../component";
import LogItem from "../LogItem";
import { requestGetLogs } from "../../api/log";

export default class LogList extends Component {
  constructor($parent) {
    super($parent, "ul", { class: "log-list" }, { logs: [] }, {});

    this.render();
  }

  mount() {
    const { logs } = this.$state;
    logs.forEach((log) => {
      new LogItem(this.$element, { log });
    });
  }

  getLogListByOpened() {
    this.$element.innerHTML = "";
    requestGetLogs().then(({ data }) => {
      this.setState({
        logs: data,
      });
    });
  }
}
