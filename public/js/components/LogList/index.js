import "./style.css";
import Component from "../component";
import LogItem from "../LogItem";

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
    this.fetchLogList(0).then((logs) => {
      this.setState({
        logs,
      });
    });
  }

  async fetchLogList() {
    return [
      {
        actionType: "ADD",
        username: "sam",
        section: "해야할 일",
        todoTitle: "블로그에 포스팅할 것",
        createdAt: new Date(),
      },
      {
        actionType: "UPDATE",
        username: "sam",
        section: "해야할 일",
        todoTitle: "Github 공부하기",
        createdAt: new Date(),
      },
      {
        actionType: "MOVE",
        username: "sam",
        from: "해야할 일",
        to: "하고있는 일",
        todoTitle: "HTML/CSS 공부하기",
        createdAt: new Date(),
      },
      {
        actionType: "DELETE",
        username: "sam",
        section: "해야할 일",
        todoTitle: "HTML/CSS 공부하기",
        createdAt: new Date(),
      },
    ];
  }
}
