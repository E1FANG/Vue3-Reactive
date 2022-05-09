let price = 5
let quantity = 2
let total = price * quantity

console.log(`total is ${total}`);

let dep = new Set() // xStorage 
let effect = () => { total = price * quantity }
let track = () => { dep.add(effect) }
let trigger = () => { dep.forEach(effect => effect()) }

// 计算首次的total
effect()

// 把effect存进dep
track()

console.log(total) // 10

price = 20 // 改变价格

console.log(total)  // 依然是10

trigger()  // 触发更新

console.log('更新之后的total', total) // 40