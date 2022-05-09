let price = 5
let quantity = 2
let total = price * quantity

console.log(`total is ${total}`);

price = 20

//  当改变价格时，total依然是10
console.log(`total is ${total}`);



// 简易响应式
// 怎么样存储total的计算方式才能当价格或数量更新时，让他再计算一次

// 1. 用dep来存储effect
let dep = new Set()

//  effect 更新total的代码，方式
let effect = () => { total = price * quantity }

// 2. 用track来把effect存进dep里。（track是一个具体的动作）
function track() {
  dep.add(effect)
}

// 3.用trigger遍历dep，拿到每一个effect并运行一次
function trigger() {
  dep.forEach(effect => effect())
}

// 4. 把更新方式保存到dep
track()

//  5. 运行effect，计算首次的total
effect()

// 测试
console.log(total);   // 40

quantity = 3

console.log(total) // 40

trigger()

console.log('trigger之后的total:', total);