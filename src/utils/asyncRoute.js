import route from '@/router'
const _import = require('@/router/_import_' + process.env.VUE_APP_ENV + '.js')

function filterAsyncRoutes (routes) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (tmp.children) {
      tmp.children = filterAsyncRoutes(tmp.children)
    }
    tmp['component'] = _import(tmp.fileSrc)
    res.push(tmp)
  })

  return res
}

export function addRoute (data) {
  return new Promise((resolve, reject) => {
    let routes = filterAsyncRoutes(data)
    route.addRoutes(routes)
    resolve()
  })
}
