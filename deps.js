let price = 5

let qua = 2

let total = 0

let dep = new Set()

let effect = () => { total = price * qua }

function track() { dep.add(effect) }

function trigger() { dep.forEach(effect => effect()) }

track()

console.log('before effect total', total);
effect()

console.log('after effect total', total);

qua = 3

trigger()

console.log('change quantity total', total);