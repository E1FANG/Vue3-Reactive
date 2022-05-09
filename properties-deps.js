//  当一个对象有多个属性时，那么每个属性都要有相应的dep
let product = { price: 5, quantity: 2 }
let total = 0
// 从depsMap开始

let depsMap = new Map()

// 追踪函数 track
function track(key) {
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  dep.add(effect)
}

// 触发函数 trigger
function trigger(key) {
  let dep = depsMap.get(key)
  if (dep) {
    dep.forEach(effect => {
      effect()
    })
  }
}


let effect = () => { total = product.price * product.quantity }

track('quantity')
effect()

product.quantity = 3

console.log('before trigger total: ', total)

trigger('quantity')

console.log('after trigger total', total)
