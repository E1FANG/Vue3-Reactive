// 从 targetMap 开始
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

let product = { price: 5, quantity: 2 }

let total = 0

let effect = () => { total = product.price * product.quantity }

effect()

track(product, 'quantity')

product.quantity = 3

console.log('before trigger total', total) // 10

trigger(product, 'quantity')

console.log('after trigger total', total); //15