import Component from "../component";
import TodoSection from "../TodoSection";
import { requestGetSections } from "../../api/section";
import "./style.css";

export default class MainContent extends Component {
  constructor($parent) {
    super($parent, "main", { class: "main-content" }, {}, {});

    this.getSections();
  }

  getSections() {
    requestGetSections().then(({ data }) => {
      this.setState({ sections: data });
    });
  }

  mount() {
    this.$element.innerHTML = "";

    this.$state.sections.forEach((section) => {
      new TodoSection(this.$element, {}, { section });
    });
  }
}
