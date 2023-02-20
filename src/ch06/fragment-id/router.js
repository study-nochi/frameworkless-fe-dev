const ROUTE_PARAMETER_REGEXP = /:(\w+)/g
const URL_FRAGMENT_REGEXP = '([^\\/]+)'

const extractUrlParams = (route, windowHash) => {
  const params = {}

  if (route.params.length === 0) {
    return params
  }

  const matches = windowHash
    .match(route.testRegExp)

  matches.shift()

  matches.forEach((paramValue, index) => {
    const paramName = route.params[index]
    params[paramName] = paramValue
  })

  return params
}

export default () => {
  // 배열은 각 경로(fragment)와 연결된 컴포넌트를 저장한다.
  const routes = [];
  // 경로가 없는 경우 실행한다.
  let notFound = () => { }
  // 메서드가 포함될 객체.
  const router = {}

  const checkRoutes = () => {
    const { hash } = window.location

    // testRegExp 속성을 사용하여 현재 URL 경로와 매칭되는지 확인
    const currentRoute = routes.find(route => {
      const { testRegExp } = route;
      return testRegExp.test(hash)
    })

    // 만약 currentRoute 안에 값이 없으면 notFound 처리를 한다.
    if (!currentRoute) {
      notFound()
      return
    }

    const urlParams = extractUrlParams(currentRoute, window.location.hash);


    // 경로가 일치하면 해당 경로에 연결된 컴포넌트가 렌더링된다.
    currentRoute.component(urlParams)
  }


  // route 배열에 경로와 컴포넌트를 추가하는 메서드
  router.addRoute = (fragment, component) => {
    const params = [];

    const parsedFragment = fragment
      .replace(
        ROUTE_PARAMETER_REGEXP,
        (match, paramName) => {
          params.push(paramName)
          return URL_FRAGMENT_REGEXP
        })
      .replace(/\//g, '\\/')

    console.log(`^${parsedFragment}$`)

    routes.push({
      testRegExp: new RegExp(`^${parsedFragment}$`), // 경로를 검증할 수 있는 정규식
      component,
      params // 경로에 포함된 파라미터 이름 저장
    })


    return router;
  }

  // 경로가 없을 때 실행되는 메서드
  router.setNotFound = cb => {
    notFound = cb;
    return router;
  }

  // window.location.hash를 변경하여 경로를 변경하는 메서드
  router.navigate = fragment => {
    window.location.hash = fragment
  }

  // 현재 경로를 확인하고, 이벤트 리스너를 추가하여 URL의 변경을 감지한다.
  router.start = () => {
    window.addEventListener('hashchange', checkRoutes)
    if (!window.location.hash) {
      window.location.hash = "#/"
    }

    checkRoutes()
  }

  return router
}