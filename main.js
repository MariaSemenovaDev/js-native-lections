// 9 Object inside an object -> array -> object ->  object
let man6 = {
    name: 'John',
    age: 28,
    mother: {
        name: "Kate",
        age: 50,
        work: {
            position: "doctor",
            experience: 15
        },
        parents: [
            {
                name: "Kevin",
                age: 80,
                favoriteDish: {
                    title: "borscht"
                }
            },
            {
                name: "Jennifer",
                age: 78,
                favoriteDish: {
                    title: "sushi"
                }
            },
        ]
    }
};
console.log(man6)

let man6FullCopy = {
  ...man6,
    mother: {...man6.mother,
      work: {...man6.mother.work},
      parents: {...man6.mother.parents.map(el => ({...el, favoriteDish: {...el.favoriteDish}}))}
    }
      }

      console.log(man6FullCopy);
      

//10 Array of objects inside an object -> object -> array -> object ->  object
let man7 = {
    name: 'John',
    age: 28,
    mother: {
        name: "Kate",
        age: 50,
        work: {
            position: "doctor",
            experience: 15
        },
        parents: [
            {
                name: "Kevin",
                age: 80,
                favoriteDish: {
                    title: "borscht",
                    ingredients: [
                        {title: "beet", amount: 3},
                        {title: "potatoes", amount: 5},
                        {title: "carrot", amount: 1},
                    ]
                }
            },
            {
                name: "Jennifer",
                age: 78,
                favoriteDish: {
                    title: "sushi",
                    ingredients: [
                        {title: "fish", amount: 1},
                        {title: "rise", amount: 0.5}
                    ]
                }
            },
        ]
    }
};

let man7FullCopy = {
  ...man7,
  mother: {
      ...man7.mother,
      work: { ...man7.mother.work },
      parents: man7.mother.parents.map(parent => ({
          ...parent,
          favoriteDish: {
              ...parent.favoriteDish,
              ingredients: parent.favoriteDish.ingredients.map(ingredient => ({
                  ...ingredient
              }))
          }
      }))
  }
};

console.log('hi');
