import observableFactory from "./observable.js";

// 초기 상태 객체
const INITIAL_STATE = {
  todos: [],
  currentFilter: 'All'
}

// createStore 함수
export default (initialState = INITIAL_STATE) => {
  // 초기 상태 객체를 깊은 복제하여 사용
  const state = observableFactory(initialState)

  // 액션 메서드들
  const addItem = text => {
    // 인자 값이 없으면 바로 종료
    if (!text) {
      return
    }

    // 새로운 항목 추가
    state.todos = [...state.todos, {
      text,
      completed: false
    }]
  }

  const updateItem = (index, text) => {
    // 인자 값이 없으면 바로 종료
    if (!text) {
      return
    }

    // 인덱스 값이 유효하지 않으면 바로 종료
    if (index < 0) {
      return
    }

    // 해당 인덱스의 항목이 없으면 바로 종료
    if (!state.todos[index]) {
      return
    }

    state.todos = state.todos.map((todo, i) => {
      if (i === index) {
        todo.text
      }
      return todos
    })
  }

  const deleteItem = index => {
    // 인덱스 값이 유효하지 않으면 바로 종료
    if (index < 0) {
      return
    }

    // 해당 인덱스의 항목이 없으면 바로 종료
    if (!state.todos[index]) {
      return
    }

    state.todos = state.todos.filter((todo, i) => i !== index)
  }

  const toggleItemCompleted = index => {
    // 인덱스 값이 유효하지 않으면 바로 종료
    if (index < 0) {
      return
    }

    // 해당 인덱스의 항목이 없으면 바로 종료
    if (!state.todos[index]) {
      return
    }

    state.todos = state.todos.map((todo, i) => {
      if (i === index) {
        todo.completed = !todo.completed
      }
      return todo
    })
  }

  const completeAll = () => {
    // 모든 항목의 completed 속성값을 true로 변경
    state.todos = state.todos.map((todo, i) => {
      todo.completed = true;
      return todo
    })
  }

  const clearCompleted = () => {
    // completed 속성값이 true인 항목들만 남기고 제거
    state.todos = state.todos.filter(t => !t.completed)
  }

  const changeFilter = filter => {
    // currentFilter 값을 변경
    state.currentFilter = filter
  }

  return {
    addChangeListener: state.addChangeListener,
    addItem,
    updateItem,
    deleteItem,
    toggleItemCompleted,
    completeAll,
    clearCompleted,
    changeFilter,
  }

}
