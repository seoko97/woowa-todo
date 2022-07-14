import Component from "../component";
import TodoSection from "../TodoSection";
import "./style.css";

const mockAPI = async () =>
  await [
    {
      id: 0,
      title: "해야할 일",
      todos: [
        {
          id: "0",
          title: "test1",
          description: "testtest1",
          status: "DEFAULT",
        },
        {
          id: "1",
          title: "test2",
          description: "testtest1",
          status: "DEFAULT",
        },
        {
          id: "2",
          title: "test3",
          description: "testtest1",
          status: "DEFAULT",
        },
        {
          id: "3",
          title: "test4",
          description: "testtest1",
          status: "DEFAULT",
        },
        {
          id: "4",
          title: "test5",
          description: "testtest1",
          status: "DEFAULT",
        },
      ],
    },
    {
      id: 1,
      title: "진행중",
      todos: [
        {
          id: "0",
          title: "test1",
          description: "testtest1",
          status: "DEFAULT",
        },
      ],
    },
  ];

export default class MainContent extends Component {
  constructor($parent, $state, $props) {
    super($parent, "main", { class: "main-content" }, {}, {});

    mockAPI().then((res) => {
      const data = res;
      this.setState({ data });
    });
  }

  mount() {
    this.$element.innerHTML = "";

    this.$state.data.forEach((todo) => {
      new TodoSection(this.$element, todo, {});
    });
  }
}
