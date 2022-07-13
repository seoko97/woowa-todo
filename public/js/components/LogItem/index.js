import "./style.css";
import Component from "../component";
import { getDateDiff } from "../../utils/date";

export default class LogItem extends Component {
  constructor($parent, $state) {
    super($parent, "li", { class: "log-item" }, $state);

    this.render();
  }

  getActionMessage(actionType) {
    const actionMessage = {
      ADD: "등록",
      UPDATE: "변경",
      DELETE: "삭제",
      MOVE: "수정",
    };

    return actionMessage[actionType];
  }

  createLogContentTemplate(log) {
    const { actionType, from, to, section, todoTitle } = log;

    if (actionType === "MOVE") {
      return `
        <p class="log-item__content">
          <strong>${todoTitle}</strong>을(를)
          <strong>${from}</strong>에서
          <strong>${to}</strong>로
          <strong>${this.getActionMessage(actionType)}</strong>하였습니다.
        </p>
      `;
    }

    return `
      <p class="log-item__content">
        <strong>${section}</strong>에
        <strong>${todoTitle}</strong>을(를)
        <strong>${this.getActionMessage(actionType)}</strong>하였습니다.
      </p>
    `;
  }

  template() {
    const { log } = this.$state;
    const currentDate = new Date();
    return `
      <span class="log-item__username">
        @${log.username}
      </span>
      ${this.createLogContentTemplate(log)}
      <span class="log-item__created-at">
        ${getDateDiff(log.createdAt, currentDate)}
      </span>
    `;
  }

  mount() {
    this.$element.innerHTML = this.template();
  }
}
