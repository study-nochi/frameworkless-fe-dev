import createRouter from './router.js'
import createPages from './page.js'

// container로 사용할 DOM 객체를 선택한다.
const container = document.querySelector('main')

// createPages를 통해  page들에 대한 행위를 정의할 수 있어졌다.
const pages = createPages(container);

// createRouter를 통해 라우팅 시스템의 기본적인 동작을 추가함. 
const router = createRouter()

router
  .addRoute('/', pages.home)
  .addRoute('/list', pages.list)
  .addRoute('/list/:id', pages.detail)
  .addRoute('/list/:id/:anotherId', pages.anotherDetail)
  .setNotFound(pages.notFound)
  .start()
