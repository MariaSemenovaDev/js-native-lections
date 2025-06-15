// console.log(1)
// setTimeout(()=> {
//     console.log(2)
// }, 0)
// console.log(3)

const promise = new Promise((resolve, reject) => {
    console.log('start')
    setTimeout(()=> {
        resolve('123')
    }, 2000)
})

promise.then((data)=> {
    console.log(data)
})

console.log('finish')