const registry = {}

// 
const renderWrapper = component => {
  return (targetElement, state) => {
    const element = component(targetElement, state)

    const childComponents = element.querySelectorAll('[data-component]')

    Array.from(childComponents).forEach(target => {
      const name = target.dataset.component

      const child = registry[name]
      if (!child) {
        return
      }

      target.replaceWith(child(target, state))
    })

    return element
  }
}

// 레지스트리에 컴포넌트를 래핑하여 저장
const add = (name, component) => {
  registry[name] = renderWrapper(component)
}

const renderRoot = (root, state) => {
  const cloneComponent = root => {
    return root.cloneNode(true)
  }

  return renderWrapper(cloneComponent)(root, state)
}

export default {
  add, renderRoot
}