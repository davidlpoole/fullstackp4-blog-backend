var animals = [
  { name: 'Fluffy', species: 'rabbit' },
  { name: 'Bill', species: 'dog' },
  { name: 'Dave', species: 'cat' },
  { name: 'Jim', species: 'dog' },
  { name: 'Matt', species: 'fish' },
  { name: 'Mike', species: 'rabbit' },
  { name: 'Bob', species: 'cat' },
]

// console.log('animals', animals)


////////////////////////////// HIGHER ORDER FUNCTIONS

//////////     FILTER
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
var dogs = animals.filter(function (animal) {
  return animal.species === 'dog'
})

var isCat = function (animal) {
  return animal.species === 'cat'
}

var cats = animals.filter(isCat)

// console.log('cats', cats)
// console.log('first dog', dogs[0])
// console.log('first dogs name', dogs[0].name)



//////////////     FIND
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
var jim = animals.find(function (animal) {
  return animal.name === 'Jim'
})

// console.log(jim)



/////////           MAP
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

// ORIGINAL
// var names = animals.map(function (animal) {
//   return animal.name
// })

// SHORTER
// var names = animals.map((animal) => {
//   return animal.name
// })

// ARROW FUNCTION
var names = animals.map((animal) => animal.name)
var nameSpecies = animals.map((animal) =>
  animal.name + ' is a ' + animal.species
)

// console.log('names', names)
// console.log('namespecies', nameSpecies)




/////////         REDUCE
/// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce

var orders = [
  { id: 1, amount: 250 },
  { id: 2, amount: 400 },
  { id: 3, amount: 100 },
  { id: 4, amount: 325 },
]

////    LONG FORMAT
var totalAmount = orders.reduce(function (sum, order) {
  // console.log(sum, order)
  return sum + order.amount
}, 0)

//////     ARROW FUNCTION
// var totalAmount = orders.reduce((sum, order) => {
//   console.log(sum, order)
//   return sum + order.amount
// }, 0)

///////     SHORTEST
// var totalAmount = orders.reduce((sum, order) => sum + order.amount, 0)

// console.log(totalAmount)




/// CLOSURES




/// CURRYING
// https://www.youtube.com/watch?v=iZLP4qOwY8I

let dragons = [
  { name: 'fluffy', element: 'lightning' },
  { name: 'noomi', element: 'lightning' },
  { name: 'karo', element: 'fire' },
  { name: 'doomer', element: 'timewarp' },
]

let dragon = (name, size, element) =>
  name + ' is a ' +
  size + ' dragon that breathes ' +
  element + '!'

let curryDragon =
  name =>
    size =>
      element =>
        name + ' is a ' +
        size + ' dragon that breathes ' +
        element + '!'

// console.log(dragon('fluffykins', 'tiny', 'lightning'))
// console.log(curryDragon('fluffykins')('tiny')('lightning'))

let fluffyDragon = curryDragon('fluffy')
// console.log(fluffyDragon('tiny')('lightning'))



// original function
let hasElement =
  (findElement, obj) => obj.element === findElement

let lightningDragons =
  dragons.filter(x => hasElement('lightning', x))
// console.log(lightningDragons)


// curried function
let findElement =
  findElement =>
    obj =>
      obj.element === findElement

let findDragons = dragons.filter(findElement('lightning'))
// console.log(findDragons)





////// DESTRUCTURING
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment


