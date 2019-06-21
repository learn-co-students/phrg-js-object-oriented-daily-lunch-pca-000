let store = {deliveries: [], meals: [], employers: [], customers: [],}
let mealId = 0;
let customerId = 0;
let deliveryId = 0;
let employerId = 0;

class Customer {
  constructor(name, employer) {
    this.id = ++customerId
    this.name = name
    if (employer) {
      this.employerId = employer.id
    }
    store.customers.push(this)
  }
  meals(){
    return this.deliveries().map(delivery => {
      return delivery.meal()
    })
  }
  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }
  totalSpent(){
    const addPrices = function(agg, el, i, arr){
      return el.price + agg
    }
    return this.meals().reduce(addPrices, 0)
  }
}

 class Meal {
  constructor(title, price) {
    this.id = ++mealId
    this.title = title
    this.price = price
    store.meals.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
  }
  customers(){
    return this.deliveries().map(delivery => {
      return delivery.customer()
    })
  }
  static byPrice(){
    const sortPrice = function (meal1, meal2) {
      return meal2.price - meal1.price
    }
    return store.meals.sort(sortPrice)
  }
}

 class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId
    if (meal) {
      this.mealId = meal.id
    }
    if (customer) {
      this.customerId = customer.id
    }
    store.deliveries.push(this)
  }
  meal(){
    return store.meals.find(meal => {
      return meal.id === this.mealId
    })
  }
  customer(){
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
  employees(){
    return store.customers.filter(customer => {
      return customer.employerId === this.id
    })
  }
  deliveries(){
    let allDeliveries = this.employees().map(customer => {
      return customer.deliveries()
    })
    return [].concat.apply([], allDeliveries)
  }
  meals(){
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal()
    })
    let merged = [].concat.apply([], allMeals)
    return [...new Set(merged)]
  }
  mealTotals(){
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
