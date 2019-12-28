// 简单的数据持久化、单独提取方便后期可以进行加密存储等操作
export default  function storePlugin(store) {
    if (localStorage.store) store.replaceState(JSON.parse(localStorage.store))  // 初始化store
    // 当 store 初始化后调用
    store.subscribe((mutation, state) => {
      // 每次 mutation 之后调用
      // mutation 的格式为 { type, payload }
      localStorage.setItem("store",  JSON.stringify(state))
    })
}