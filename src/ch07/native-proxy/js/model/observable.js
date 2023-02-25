
// 깊은 복제를 만드는 패턴
const cloneDeep = x => {
  return JSON.parse(JSON.stringify(x))
}

// 상태 객체를 불변하게 만듦.
const freeze = state => Object.freeze(cloneDeep(state))

export default (initialState) => {
  let listeners = []

  const proxy = new Proxy(cloneDeep(initialState), {
    set: (target, name, value) => {
      target[name] = value
      target[name] = value;
      listeners.forEach(l => l(freeze(proxy)))
      return true
    }
  })

  proxy.addChangeListener = cb => {
    listeners.push(cb)
    cb(freeze(proxy))
    return () => {
      listeners = listeners.filter(l = l !== cb)
    }
  }
  return proxy
}