let store = { customers: [], meals: [], deliveries: [], employers: [] }

let customerId = 0
let mealId = 0
let deliveryId = 0
let employerId = 0

class Customer {
  constructor(name, employer = {}) {
    this.id = ++customerId
    this.name = name
    this.employerId = employer.id

    store.customers.push(this)
  }

  meals() {
    // returns all of the meals that a customer has had delivered
    return this.deliveries().map(delivery => {
      return delivery.meal()
    })
  }

  deliveries() {
    // returns all of the deliveries that customer has received
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }

  totalSpent() {
    // returns the total amount that the customer has spent, as a function of the cost of the meals he has had delivered
    return this.meals().reduce(function(sum, meal) {
        return sum + meal.price;
    }, 0)
  }
}


class Meal {
  constructor(title, price) {
    this.id = ++mealId
    this.title = title
    this.price = price

    store.meals.push(this)
  }

  deliveries() {
   // - returns all of the deliveries that delivered the particular meal
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
  }

  customers() {
   // - returns all of the customers who have had the meal delivered
   return this.deliveries().map(delivery => {
    return delivery.customer()
   })
  }

  static byPrice() {
    // - A class method that orders the meals by their price. Use the static keyword to write a class method
    return store.meals.sort((firstMeal, secondMeal) => {
      return firstMeal.price < secondMeal.price
    })
  }
}


class Delivery {
  constructor(meal = {}, customer = {}) {
    this.id = ++deliveryId
    this.mealId = meal.id
    this.customerId = customer.id

    store.deliveries.push(this)
  }

  meal() {
    // returns the meal associated with the delivery
    return store.meals.find(meal => {
      return meal.id === this.mealId
    })
  }

  customer() {
    // returns the customer associated with the delivery
    return store.customers.find(customer => {
      return customer.id === this.customerId
    })
  }
}


class Employer {
  constructor(name) {
    this.id = ++employerId
    this.name = name

    store.employers.push(this)
  }

  employees() {
   // - returns a list of customers employed by the employer
    return store.customers.filter(customer => {
      return customer.employerId === this.id
    })
  }

  deliveries() {
   // - returns a list of deliveries ordered by the employer's employees
    let allDeliveries = this.employees().map(customer => {
      return customer.deliveries()
    })
    return [].concat.apply([], allDeliveries)
  }

  meals() {
   // - returns a list of meals ordered by the employer's employees. The method is to not return the same meal multiple times.
   let allMeals = this.deliveries().map(delivery => {
      return delivery.meal()
    })
    let merged = [].concat.apply([], allMeals)
    return [...new Set(merged)]
  }

  mealTotals() {
   // - returns a JavaScript object displaying each respective meal id ordered by the employer's employees.
    let employerMeals = this.deliveries().map(delivery => {
      return delivery.meal()
    })
    let mealTotals = {}
    employerMeals.map(meal => {
      mealTotals[meal.id] = 0
    })
    employerMeals.map(meal => {
      mealTotals[meal.id] += 1
    })
    return mealTotals
  }
}
