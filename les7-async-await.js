
// тут запросы выполнятеся непоследовательно
fetch('https://yahoo.com/?query=js')
console.log(yahooData)
fetch('https://bing.com/?query=js')
console.log(bingData)
fetch('https://google.com/?query=js')
console.log(googleData)

//тут последовательно, но выглядит громоздко
fetch('https://yahoo.com/?query=js')
    .then(yahooData => {
        console.log(yahooData)
        return fetch('https://bing.com/?query=js') //здесь следующий запрос
    })
    .then(bingData => {
        console.log(bingData)
        return fetch('https://google.com/?query=js')
    })
    .then(googleData => {
        console.log(googleData)
    })

// а если мы хотим компактно и последовательно? использ async/await
const run = async () => {
    const yahooData = await fetch('https://yahoo.com/?query=js')
    console.log(yahooData)
    const bingData = await fetch('https://bing.com/?query=js')
    console.log(bingData)
    const googleData = await fetch('https://google.com/?query=js')
    console.log(googleData)
}
run()
//получается await говорит - подожди пока не дождемся ответа. типа дальше не иди по цепочке, а ответ сохраняется в переменную пред await