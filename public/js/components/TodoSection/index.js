import Component from "../component";
import SectionHeader from "./SectionHeader";
import SectionList from "./SectionList";
import { isBeforeCurrentElement } from "../../lib/isBeforeCurrentElement";

import "./style.css";
import { createCustomEvent, dispatchCutomEvent } from "../../lib/customEvent";
import { requestGetSection } from "../../api/section";
import { requestMoveTodo } from "../../api/todo";

export default class TodoSection extends Component {
  $header;
  $list;
  $cloneNode;
  $currentNode;
  $currenId;
  $hover;
  $mousemove;
  $prev;
  $moveStatus;
  timer;
  clicked;

  constructor($parent, $state, $props) {
    super($parent, "section", { class: "todo-section" }, $state, $props);

    this.getSection();
    this.setEvent();
  }

  getSection() {
    requestGetSection(this.$props.section.id).then(({ data }) => {
      data.todos = data.todos.map((todo) => ({
        ...todo,
        status: "DEFAULT",
      }));

      this.setState(data);
      this.$element.setAttribute("data-id", this.$state.id);
      this.$element.setAttribute("data-title", this.$state.title);
    });
  }

  setEvent() {
    this.addEvent("click", ".icon.plus", this.showCreateForm.bind(this));
    this.addEvent("mousedown", ".todo-item.default", (e) => {
      if (e.detail < 2) {
        if (e.target.closest(".close")) this.openModal(e);
        else this.onMouseDownItem(e);
      } else this.showEditForm(e);
    });

    createCustomEvent(
      `getSection${this.$props.section.id}`,
      this.$element,
      this.getSection.bind(this)
    );
  }

  openModal(e) {
    const $modal = document.getElementById("modal");
    const $todoItem = e.target.closest(".todo-item");

    this.deleteItem(e);
    dispatchCutomEvent("openModalAndSetTodo", $modal, {
      todoId: $todoItem.dataset.id,
      sectionId: this.$props.section.id,
      $section: this.$element,
      $todoItem,
      toggleTodoItem: this.toggleTodoItem.bind(this),
    });
  }
  toggleTodoItem($todoItem) {
    $todoItem.classList.remove("delete");
  }

  showEditForm(e) {
    clearTimeout(this.timer);
    this.timer = null;

    const $clickedItem = e.target.closest(".todo-item");
    const newState = { ...this.$list.$state };
    const seletedTodo = newState.todos.find(
      (todo) => todo.id === parseInt($clickedItem.dataset.id)
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

  endDragAndDrop() {
    this.clicked = false;
    if (this.$currentNode) {
      this.$currentNode.classList.remove("place");
      this.$currentNode.classList.remove("focus");
    }
    if (this.$cloneNode) this.$cloneNode.remove();
    this.$cloneNode = null;
    this.$currentNode = null;
  }

  onMouseupItem(e) {
    if (!this.clicked || !e) return this.endDragAndDrop();
    const $section = e.target.closest(".todo-section");

    if (!$section) return this.endDragAndDrop();

    const { pageX, pageY } = e;

    if (this.$cloneNode) this.$cloneNode.remove();
    this.$cloneNode = null;

    const elemBelow = document.elementFromPoint(pageX, pageY);
    const todos = this.$state.todos;

    const fromSection = this.$element;
    const toSection = elemBelow.closest(".todo-section");

    const prevTodo = this.$currentNode.previousSibling;
    const currentTodo = todos.find(
      (todo) => todo.id === parseInt(this.$currentNode.dataset.id)
    );

    if (!toSection || !fromSection || !currentTodo)
      return this.endDragAndDrop();

    const data = {
      fromSection: fromSection.dataset,
      toSection: toSection.dataset,
      currentTodo: {
        id: currentTodo.id,
        title: currentTodo.title,
      },
      prevTodo: prevTodo?.dataset?.id,
    };

    this.timer = setTimeout(() => {
      requestMoveTodo(data).then(() => {
        dispatchCutomEvent(`getSection${fromSection.dataset.id}`, fromSection);
        dispatchCutomEvent(`getSection${toSection.dataset.id}`, toSection);
      });
    }, 100);

    this.endDragAndDrop();
    this.clearEvent();
  }
  clearEvent() {
    document.body.removeEventListener("mousemove", this.$mousemove);
    document.body.removeEventListener("mouseleave", this.$mouseleave);
  }

  onMouseDownItem(e) {
    this.clearEvent();

    if (e.button !== 0) return;

    const $item = e.target.closest(".todo-item");

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
    this.$mouseleave = this.mouseleave.bind(this);

    document.body.addEventListener("mousemove", this.$mousemove);
    document.body.addEventListener("mouseleave", this.$mouseleave);
    document.body.addEventListener("mouseup", this.onMouseupItem.bind(this), {
      once: true,
    });
  }
  mouseleave() {
    this.clearEvent();

    if (!this.clicked) return this.endDragAndDrop();

    this.onMouseupItem();
  }

  onMouseMoveItem(e) {
    if (!this.clicked || !this.$cloneNode || !e || !e.target) return;

    const { pageX, pageY } = e;

    this.$hover.hidden = true;

    const elemBelow = document.elementFromPoint(pageX, pageY);

    if (!elemBelow) return this.endDragAndDrop();

    const $item = elemBelow.closest(".todo-item");
    const $itemList = elemBelow.closest(".todo-section-ul");

    if ($item?.classList.contains("create")) return;

    this.$hover.hidden = false;
    this.$hover.style.left = pageX - this.$cloneNode.offsetWidth / 2 + "px";
    this.$hover.style.top = pageY - this.$cloneNode.offsetHeight / 2 + "px";

    if ($item) {
      if (
        isBeforeCurrentElement(this.$currentNode, $item) &&
        $item.className !== "start"
      ) {
        $item.parentNode.insertBefore(this.$currentNode, $item);
        this.$prev = $item;
        this.$moveStatus === "PREV";
      } else {
        $item.parentNode.insertBefore(this.$currentNode, $item.nextSibling);
        this.$prev = this.$currentNode;
        this.$moveStatus === "NEXT";
      }
      return;
    }
    if ($itemList) $itemList.appendChild(this.$currentNode);
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
