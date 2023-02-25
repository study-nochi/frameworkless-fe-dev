// 객체를 깊은 복제하는 함수
const cloneDeep = x => {
  return JSON.parse(JSON.stringify(x))
}

// 객체를 불변 객체로 만드는 함수
const freeze = x => Object.freeze(cloneDeep(x))

// createStore 함수
export default (model, stateGetter) => {
  // 리스너 함수들을 담을 배열
  let listeners = []

  // 리스너 함수 등록 메서드
  const addChangeListener = callback => {
    // 리스너 함수 등록
    listeners.push(callback)
    // 등록된 리스너 함수에 초기 상태 전달
    callback(freeze(stateGetter()))
    // 등록 해제 함수 반환
    return () => {
      listeners = listeners.filter(element => element !== callback)
    }
  }

  // 리스너 함수 호출 메서드
  const invokeListeners = () => {
    // 현재 상태 객체를 불변 객체로 생성
    const data = freeze(stateGetter())
    // 등록된 모든 리스너 함수 호출
    listeners.forEach(l => l(data))
  }

  // 액션 메서드를 감싸는 함수
  const wrapAction = originalAction => {
    return (...args) => {
      // 원본 액션 메서드 실행
      const value = originalAction(...args)
      // 리스너 함수 호출
      invokeListeners()
      // 액션 메서드 실행 결과 반환
      return value
    }
  }

  // 기본 프록시 객체
  const baseProxy = {
    addChangeListener
  }

  // 모델 객체의 메서드 중 함수형 메서드들만 필터링하여 프록시 객체로 생성
  return Object.keys(model).filter(key => {
    return typeof model[key] === 'function'
  })
    .reduce((proxy, key) => {
      const action = model[key]
      // 액션 메서드 감싸기
      return {
        ...proxy,
        [key]: wrapAction(action)
      }
    }, baseProxy)
}
