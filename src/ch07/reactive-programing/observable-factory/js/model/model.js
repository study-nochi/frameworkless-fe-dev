import observableFactory from "./observable.js";

// 객체를 깊은 복제하는 함수
const cloneDeep = x => {
  return JSON.parse(JSON.stringify(x))
}

// 초기 상태 객체
const INITIAL_STATE = {
  todos: [],
  currentFilter: 'All'
}

// createStore 함수
export default (initialState = INITIAL_STATE) => {
  // 초기 상태 객체를 깊은 복제하여 사용
  const state = cloneDeep(initialState)

  // 액션 메서드들
  const addItem = text => {
    // 인자 값이 없으면 바로 종료
    if (!text) {
      return
    }

    // 새로운 항목 추가
    state.todos.push({
      text,
      completed: false
    })
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

    // 해당 인덱스의 항목의 텍스트 수정
    state.todos[index].text = text
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

    // 해당 인덱스의 항목 삭제
    state.todos.splice(index, 1)
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

    // 해당 인덱스의 항목의 completed 속성값 토글
    state.todos[index].completed = !state.todos[index].completed
  }

  const completeAll = () => {
    // 모든 항목의 completed 속성값을 true로 변경
    state.todos.forEach(t => {
      t.completed = true
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

  // 액션 메서드들을 객체로 묶음
  const model = {
    addItem,
    updateItem,
    deleteItem,
    toggleItemCompleted,
    completeAll,
    clearCompleted,
    changeFilter,
  }

  // observableFactory 함수를 이용하여 프록시 객체를 생성하여 반환
  return observableFactory(model, () => state)
}
