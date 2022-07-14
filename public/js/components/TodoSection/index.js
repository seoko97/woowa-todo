import Component from "../component";
import SectionHeader from "./SectionHeader";
import SectionList from "./SectionList";
import { isBeforeCurrentElement } from "../../lib/isBeforeCurrentElement";

import "./style.css";
import { dispatchCutomEvent } from "../../lib/customEvent";

export default class TodoSection extends Component {
  $header;
  $list;
  $cloneNode;
  $currentNode;
  $currenId;
  $hover;
  $mousemove;
  $prev;
  clicked;

  constructor($parent, $state, $props) {
    super($parent, "section", { class: "todo-section" }, $state, $props);

    this.$element.setAttribute("data-title", this.$state.title);
    this.render();
  }

  setEvent() {
    this.addEvent("click", ".icon.plus", this.showCreateForm.bind(this));
    this.addEvent("mousedown", ".todo-item.default", (e) => {
      if (e.detail < 2) {
        if (e.target.closest(".close")) this.openModal(e);
        else this.onMouseDownItem(e);
      } else {
        // 더블클릭
        this.showEditForm(e);
      }
    });
  }

  openModal(e) {
    const $modal = document.getElementById("modal");

    this.deleteItem(e);
    dispatchCutomEvent("openModalAndSetTodo", $modal, {
      todo: "todo",
    });
  }

  showEditForm(e) {
    const $clickedItem = e.target.closest(".todo-item");
    const newState = { ...this.$list.$state };
    const seletedTodo = newState.todos.find(
      (todo) => todo.id === $clickedItem.dataset.id
    );
    seletedTodo.status = "EDIT";

    this.$list.setState(newState);
  }

  showCreateForm(e) {
    const $createForm = this.$list.$element.querySelector(".todo-item.create");
    const $plus = e.target.closest(".plus");
    const isHidden = $createForm.classList.contains("hidden");
    const isActivePlusBtn = $plus.classList.contains("active");

    $createForm.classList.toggle("hidden", !isHidden);
    $plus.classList.toggle("active", !isActivePlusBtn);
  }

  deleteItem(e) {
    const $close = e.target.closest(".icon.close");

    if (!$close) return;

    const $item = e.target.closest(".todo-item");

    $item.classList.add("delete");
  }

  onMouseupItem(e) {
    if (!this.clicked) return;

    this.clicked = false;

    if (this.$currentNode) {
      this.$currentNode.classList.remove("place");
      this.$currentNode.classList.remove("focus");
    }
    if (this.$cloneNode) this.$cloneNode.remove();

    const { pageX, pageY } = e;

    const elemBelow = document.elementFromPoint(pageX, pageY);
    const section = elemBelow.closest(".todo-section");

    console.log(this.$currentNode.previousSibling, this.$currentNode);

    console.log({
      from: this.$state.id,
      to: section.dataset.id,
      prevTodoId: this.$currentNode.previousSibling,
      currentTodoId: this.$currentNode,
    });
    this.$currentNode = null;
    this.$cloneNode = null;

    document.body.removeEventListener("mousemove", this.$mousemove);
  }

  onMouseDownItem(e) {
    if (e.button !== 0) return;

    const $item = e.target.closest("li.todo-item");

    if (!$item) return;
    this.$currenId = $item.dataset.id;

    this.clicked = true;

    this.$currentNode = $item;
    this.$cloneNode = $item.cloneNode(true);

    this.$cloneNode.classList.add("drag");
    this.$currentNode.classList.add("focus");
    this.$currentNode.classList.add("place");

    this.$hover.appendChild(this.$cloneNode);

    const { pageX, pageY } = e;

    this.$hover.style.left = pageX - this.$cloneNode.offsetWidth / 2 + "px";
    this.$hover.style.top = pageY - this.$cloneNode.offsetHeight / 2 + "px";

    this.$mousemove = this.onMouseMoveItem.bind(this);

    document.body.addEventListener("mousemove", this.$mousemove);
    document.body.addEventListener("mouseup", this.onMouseupItem.bind(this), {
      once: true,
    });
  }

  onMouseMoveItem(e) {
    if (!this.clicked || !this.$cloneNode) return;

    const { pageX, pageY } = e;

    this.$hover.hidden = true;
    const elemBelow = document.elementFromPoint(pageX, pageY);
    const li = elemBelow.closest("li");
    const ul = elemBelow.closest("ul");
    this.$hover.hidden = false;

    this.$hover.style.left = pageX - this.$cloneNode.offsetWidth / 2 + "px";
    this.$hover.style.top = pageY - this.$cloneNode.offsetHeight / 2 + "px";

    if (li?.classList.contains("create")) return;

    if (!li) {
      if (ul) {
        const start = ul.querySelector(".start");
        const { top } = start.getBoundingClientRect();

        if (top > pageY) {
          start.parentNode.insertBefore(this.$currentNode, start.nextSibling);
        } else {
          ul.appendChild(this.$currentNode);
        }
      }
    } else {
      if (
        isBeforeCurrentElement(this.$currentNode, li) &&
        li.className !== "start"
      ) {
        li.parentNode.insertBefore(this.$currentNode, li);
        this.$prev = li;
      } else if (li.parentNode) {
        li.parentNode.insertBefore(this.$currentNode, li.nextSibling);
        this.$prev = li.nextSibling;
      }
    }
  }

  addTodoItem(item) {
    const newTodos = [...this.$state.todos];
    newTodos.push(item);

    this.setState({ title: this.$state.title, todos: newTodos });
  }

  mount() {
    this.$element.innerHTML = "";
    const { title, todos } = this.$state;

    new SectionHeader(this.$element, { title, todos }, {});
    this.$list = new SectionList(this.$element, { todos }, {});
    const $hover = document.createElement("div");
    $hover.className = "hover";

    this.$hover = $hover;
    this.$element.appendChild($hover);
  }
}
