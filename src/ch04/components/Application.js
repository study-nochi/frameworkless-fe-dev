import { EVENTS } from "./List.js";

export default class App extends HTMLElement {
  constructor() {
    //* 자식 클래스에서 부모 클래스의 생성자를 호출할 때 사용하는 키워드
    super()
    this.state = {
      todos: [],
      filter: 'All'
    }

    this.template = document
      .getElementById('todo-app');
  }

  deleteItem(index) {
    //* splice: 배열에서 요소를 추가하거나 삭제하거나 교체하는 데 사용되는 메서드
    this.state.todos.splice(index, 1)
    this.syncAttributes()
  }

  addItem(text) {
    this.state.todos.push({
      text,
      completed: false
    })
    this.syncAttributes()
  }

  //* Todo 리스트가 변경될 때 해당 변경 사항을 DOM 속성에 동기화하는 역할을 합니다. 
  syncAttributes() {
    this.list.todos = this.state.todos;
    this.footer.todos = this.state.todos;
    this.footer.filter = this.state.filter;
  }

  connectedCallback() {
    window.requestAnimationFrame(() => {
      const content = this.template.content.firstElementChild.cloneNode(true)

      this.appendChild(content)

      this.querySelector('.new-todo').addEventListener('keypress', e => {
        if (e.key === 'Enter') {
          this.addItem(e.target.value);
          e.target.value = ''
        }
      })
      this.footer = this.querySelector('todomvc-footer')
      this.list = this.querySelector('todomvc-list')
      this.list.addEventListener(EVENTS.DELETE_ITEM, e => {
        this.deleteItem(e.detail.index)
      })
      this.syncAttributes()
    })
  }
}

