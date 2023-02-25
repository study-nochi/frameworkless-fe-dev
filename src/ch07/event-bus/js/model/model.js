import todosModifiers from "./todos.js";
import filterModifiers from './filter.js'

const cloneDeep = x => {
  return JSON.parse(JSON.stringify(x))
}

const INITIAL_STATE = {
  todos: [],
  currentFilter: 'All'
}

export default (initialState = INITIAL_STATE) => {
  return (prevState, event) => {
    if (!event) {
      return cloneDeep(initialState)
    }

    const {
      todos, currentFilter
    } = prevState

    const newTodos = todosModifiers(todos, event)
    const newCurrentFilter = filterModifiers(currentFilter, event)

    if (newTodos === todos && newCurrentFilter === currentFilter) {
      return prevState
    }
    return {
      todos: newTodos,
      currentFilter: newCurrentFilter
    }
  }


}