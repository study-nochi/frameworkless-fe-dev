export default () => {
  const navigoRouter = new window.Navigo();
  const router = {};

  router.addRoute = (path, callback) => {
    console.log('path', path)

    navigoRouter.on(path, callback)
    return router;
  }

  router.setNotFound = cb => {
    navigoRouter.notFound(cb)
    return router;
  }

  router.navigate = path => {
    console.log('path', path)
    navigoRouter.navigate(path)
  }

  router.start = () => {
    navigoRouter.resolve();
    return router;
  }

  return router;
}