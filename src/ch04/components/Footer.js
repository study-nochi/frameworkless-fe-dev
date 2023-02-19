const getTodoCount = todos => {
  const notCompleted = todos
    .filter(todo => !todo.completed)

  const { length } = notCompleted
  if (length === 1) {
    return '1 Item left'
  }

  return `${length} Items left`
}

const STATE = {
  filter: 'filter',
  todos: 'todos'
}

export default class Footer extends HTMLElement {
  static get observedAttributes() {
    return [
      'filter',
      'todos'
    ]
  }

  get todos() {
    if (!this.hasAttribute(STATE.todos)) {
      return []
    }

    return JSON.parse(this.getAttribute(STATE.todos))
  }

  set todos(value) {
    this.setAttribute(STATE.todos, JSON.stringify(value))
  }

  get filter() {
    return this.getAttribute(STATE.filter)
  }

  set filter(value) {
    this.setAttribute(STATE.filter, value)
  }

  connectedCallback() {
    const template = document.getElementById('footer');
    const content = template.content.firstElementChild.cloneNode(true);

    this.appendChild(content);

    const {
      filter, todos
    } = this;

    this.querySelectorAll('li a').forEach(a => {
      //* textContent: DOM 요소의 텍스트 콘텐츠를 가져오거나 설정하는 데 사용되는 프로퍼티
      if (a.textContent === filter) {
        a.classList.add('selected')
      } else {
        a.classList.remove('selected');
      }
    })

    const label = getTodoCount(todos)
    this.querySelector('span.todo-count').textContent = label

  }
}