let store = {customers: [], meals: [], deliveries: [], employers: []}

let customerID = 0
let mealID = 0
let deliveryID = 0
let employerID = 0

class Customer {
  constructor(name, employer = {}) {
    this.name = name
    this.employerId = employer.id
    this.id = ++customerID
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }

  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal()
    })
  }

  totalSpent() {
    return this.meals().reduce(function(total, meal) {
      return total + meal.price
    },
    0)
  }
}

class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mealID
    store.meals.push(this)
  }

  static byPrice() {
    return store.meals.sort((first, second) => {
      return first.price < second.price
    })
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
  }

  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer()
    })
  }
}

class Delivery {
  constructor(meal = {}, customer = {}) {
    this.id = ++ deliveryID
    this.mealId = meal.id
    this.customerId = customer.id
    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId
    })
  }

  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId
    })
  }
}

class Employer {
  constructor(name) {
    this.name = name
    this.id = ++employerID
    store.employers.push(this)
  }

  employees() {
    return store.customers.filter(customer => {
      return customer.employerId === this.id
    })
  }

  deliveries() {
   let deliveryArray = this.employees().map(employee => {
      return employee.deliveries()
    })
   let newArray = deliveryArray.reduce((acc, val) => acc.concat(val), [])
   return newArray
  }

  meals() {
    let mealArray = this.employees().map(employee => {
      return employee.meals()
    })
    let uniqueMeals = mealArray.reduce((acc, val) => acc.concat(val), [])
    return [...new Set(uniqueMeals)]
  }

  mealTotals() {
    let allTheMeals = this.deliveries().map(delivery => {
      return delivery.meal()
    })
    let mealCounter = function(mealCounts, currentMeal) {
      let count = mealCounts[currentMeal.id] || 0
      mealCounts[currentMeal.id] = count += 1
      return mealCounts
    }

    return allTheMeals.reduce(mealCounter, {})
  }
}
