let template;

const createNewTodoNode = () => {

  // 템플릿 변수에 데이터가 없으면..
  if (!template) {
    template = document.getElementById('todo-item')
  }


  // 템플릿의 내용에서 첫번째 자식 element를 복제.
  return template.content.firstElementChild.cloneNode(true);
}

const getTodoElement = (todo, index) => {
  const {
    text,
    completed
  } = todo

  const element = createNewTodoNode()

  element.querySelector('input.edit').value = text
  element.querySelector('label').textContent = text

  if (completed) {
    element.classList.add('completed')
    element
      .querySelector('input.toggle')
      .checked = true
  }

  element
    .querySelector('button.destroy')
    .dataset
    .index = index

  return element
}

export default (targetElement, state, events) => {
  const { todos } = state
  const { deleteItem } = events
  const newTodoList = targetElement.cloneNode(true)

  newTodoList.innerHTML = ''

  todos
    .map((todo, index) => getTodoElement(todo, index))
    .forEach(element => {
      newTodoList.appendChild(element)
    })

  newTodoList.addEventListener('click', e => {
    if (e.target.matches('button.destroy')) {
      deleteItem(e.target.dataset.index)
    }
  })

  return newTodoList
}
