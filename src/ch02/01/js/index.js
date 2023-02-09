import getTodos from './getTodo.js'
import view from './view.js'

const state = {
  todos: getTodos(),
  currentFilter: 'All'
}

const main = document.querySelector('.todoapp')


// 모든 DOM 조작이나 애니메이션은 이 DOM API 기반으로 해야한다.

window.requestAnimationFrame(() => {
  const newMain = view(main, state)
  main.replaceWith(newMain)
})