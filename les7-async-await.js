
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

//как работает
//Асинхронная функция (async) начинает выполняться синхронно, как обычная функция, пока не встретит await.
//до тех пор пока не увидит await. когда видит await - эта штука улетает в
// асинхронный мир, выполняется там, поток освобождается и движок выполняет другие задачи
// когда промис резолвится, снова возвращаемся в эту функцию

const run2 = async () => {
    const yahooData = await fetch('https://yahoo.com/?query=js') //здесь await подписался на промис fetch
    console.log(yahooData)
    const bingData = await fetch('https://bing.com/?query=js').then(res => {res.url}) //здесь await подписался на промис .then(res => {res.url})
    //это удобно т.к. я в переменную сразу могу получить нужные данные
    // может быть цепочка из .then и await подписывается на самый последний
    // это все равно что const a = array.filter().map().filter(), в а попадет результат всей строчки
    console.log(bingData)

}
run()

// асинхронные функции всегда возвращают promise (объект)


//             - - ---- -- --   конструкция try catch для отлавливания ошибок

//Конструкция try...catch — это механизм обработки ошибок, который позволяет:
// Попробовать выполнить код (в блоке try)
// Перехватить и обработать возможные ошибки (в блоке catch)
// Выполнить финальные действия (в блоке finally, опционально)

//Если нам надо обработать ошибки, то весь асинхронный код мы должны поместить в блок try, а обработку ошибок осуществлять в блоке catch:
const run = async () => {
    try {
        const yahooData = await fetch('https://yahoo.com/?query=js')
        console.log(yahooData)
        const bingData = await fetch('https://bing.com/?query=js')
        console.log(bingData)
        const googleData = await fetch('https://google.com/?query=js')
        console.log(googleData)
    } catch (error) {
        console.log(error)
    }
}

run()


//Также в асинхронной функции есть блок finally который работает точно так же как метод .finally() в промисах.

// резюме:
// 1 try catch конструкция работает с синхронным кодом по умолчанию.
// Асинхронный код (например, setTimeout, Promise, fetch) – не перехватывается стандартным try/catch:
// Для async/await – try/catch работает, потому что await делает асинхронный код похожим на синхронный:

// 2 не должно быть промисов на которых нет подписчиков (.then(), .catch(), .finally())
// если их не будет - промис выполнится, но результат не будет обработан.
// await — это не подписчик промиса, а механизм для ожидания его выполнения.




//----------------------  Теперь разберем статические методы класса Promise и начнем с методы all().
// Статистический метод (или статический метод) — это функция, привязанная к классу, а не к его экземплярам. Она вызывается через сам класс (например, ClassName.method()), а не через объект (obj.method()

// -------------------- all()
// Метод all() принимает массив промисов и возвращает новый промис. Новый промис завершится, когда завершится весь переданный список промисов, и его результатом будет массив их результатов, причем порядок элементов массива в точности соответствует порядку исходных промисов. Если любой из промисов завершится с ошибкой, то промис, возвращённый Promise.all, немедленно завершается с этой ошибкой.

const bigPromise = Promise.all([
    fetch('https://google.com/?query=js'),
    fetch('https://yahoo.com/?query=js'),
    fetch('https://bing.com/?query=js'),
])

bigPromise
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        console.log('CATCH ERROR', err.message)
    })

// -------------------- race()
// Метод race() ждёт только первый выполненный промис, из которого берёт результат (или ошибку), после этого все остальные промисы игнорируются.

const bigPromise = Promise.race([
    fetch('https://google.com/?query=js'),
    fetch('https://yahoo.com/?query=js'),
    fetch('https://bing.com/?query=js'),
])

bigPromise
    .then(data => {
        console.log(data.url)
    })
    .catch(err => {
        console.log(err)
    })

// -------------------- any()
//Метод any() очень похож на Promise.race, но ждёт только первый успешно выполненный промис, из которого берёт результат. Если ни один из переданных промисов не завершится успешно, тогда возвращённый объект Promise будет отклонён с помощью AggregateError – специального объекта ошибок, который хранит все ошибки промисов в своём свойстве errors.

const bigPromise = Promise.any([
    fetch('https://google.com/?query=js'),
    fetch('https://yahoo.com/?query=js'),
    fetch('https://bing.com/?query=js'),
])

bigPromise
    .then(data => {
        console.log(data.url)
    })
    .catch(err => {
        console.log(err)
    })


// -------------------- allSettled()
//Метод allSettled() не похож на все остальные методы, которые мы рассмотрели выше тем, что промис, который возвращает даный метод никогда не зареджектится, а соответственно никогда не отработает catch(). У данного метода всегда будет отрабатывать метод .then() с таким массивом елементов:
// {status:"fulfilled", value:результат} для успешных завершений,
// {status:"rejected", reason:ошибка} для ошибок.

const bigPromise = Promise.allSettled([
    fetch('https://googlesdf.com/?query=js'),
    fetch('https://yahoodsf.com/?query=js'),
    fetch('https://bingsad.com/?query=js'),
])

bigPromise.then(data => {
    console.log('then', data)
})