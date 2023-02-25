const changeFilter = (state, event) => {
  return event.payload
}

const modifiers = {
  FILTER_CHANGEDL: changeFilter
}

export default (prevState, event) => {
  if (!event) {
    return 'All'
  }

  const currentModifier = modifiers[event.type]

  if (!currentModifier) {
    return prevState
  }

  return currentModifier(prevState, event)
}

