const targetMap = new WeakMap()

function track(target, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }
  dep.add(effect)
}

function trigger(target, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) return
  let dep = depsMap.get(key)
  dep.forEach(effect => {
    effect()
  })
}

const reactive = (target) => {
  const handler = {
    get(target, key, receiver) {
      console.log(`Get was called with key: ${key}`)
      let result = Reflect.get(target, key, receiver)
      track(target, key)
      return result
    },
    set(target, key, value, receiver) {
      console.log(`Set was called with key:value =  ${key}:${value}`)
      let oldValue = target[key]
      let result = Reflect.set(target, key, value, receiver)
      if (oldValue != value) {
        trigger(target, key)
      }
      return result
    }
  }
  return new Proxy(target, handler)
}

const product = reactive({
  price: 5,
  quantity: 2
})


let total = 0
let effect = () => { total = product.price * product.quantity }
effect()
console.log(total)  // 10
product.price = 100
console.log(total) // 200