import "./style.css";
import Component from "../component";
import { getDateDiff } from "../../utils/date";

export default class LogItem extends Component {
  constructor($parent, $state) {
    super($parent, "li", { class: "log-item" }, $state);

    this.render();
  }

  getActionMessage(eventType) {
    const actionMessage = {
      CREATE: "등록",
      UPDATE: "변경",
      DELETE: "삭제",
      MOVE: "수정",
    };

    return actionMessage[eventType];
  }

  createLogContentTemplate(log) {
    const {
      eventType,
      fromSectionTitle,
      fromTodoTitle,
      toSectionTitle,
      toTodoTitle,
    } = log;

    if (eventType === "MOVE") {
      return `
        <p class="log-item__content">
          <strong>${fromTodoTitle}</strong>을(를)
          <strong>${fromSectionTitle}</strong>에서
          <strong>${toSectionTitle}</strong>로
          <strong>${this.getActionMessage(eventType)}</strong>하였습니다.
        </p>
      `;
    } else if (eventType === "UPDATE") {
      return `
        <p class="log-item__content">
          <strong>${fromSectionTitle}</strong>에서
          <strong>${fromTodoTitle}</strong>을(를)
          <strong>${toTodoTitle}</strong>로
          <strong>${this.getActionMessage(eventType)}</strong>하였습니다.
        </p>
      `;
    }

    return `
      <p class="log-item__content">
        <strong>${fromSectionTitle}</strong>에
        <strong>${fromTodoTitle}</strong>을(를)
        <strong>${this.getActionMessage(eventType)}</strong>하였습니다.
      </p>
    `;
  }

  template() {
    const { log } = this.$state;
    return `
      <span class="log-item__username">
        @이상림
      </span>
      ${this.createLogContentTemplate(log)}
      <span class="log-item__created-at">
        ${getDateDiff(log.createdAt)}
      </span>
    `;
  }

  mount() {
    this.$element.innerHTML = this.template();
  }
}
