let store = {customers: [], meals: [], deliveries: [], employers: []}

let customerId = 0
let mealId = 0
let deliveryId = 0
let employerId = 0

class Customer {
  constructor(name, employer = {}){
    this.id = ++customerId
    this.employerId = employer.id;
    this.name = name
    store.customers.push(this)
  }
  deliveries() {
    return store.deliveries.filter(delivery =>
      delivery.customerId === this.id)
  }

  meals() {
    return this.deliveries().map(delivery =>
      store.meals.find(meal => meal.id === delivery.mealId))
    }

  totalSpent() {
    let total = 0
    for (let meal of this.meals()) {
      total = meal.price + total
    }
    return total
  }
}

class Meal {
  constructor(title, price){
    this.id = ++mealId
    this.title = title
    this.price = price
    store.meals.push(this)
  }
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId = this.id
    })
  }
  customers() {
    return store.customers.filter(customer => {
      return customer.mealId = this.id
    })
  }
  static byPrice() {
    return store.meals.sort((meal1, meal2) => {
      return meal1.price < meal2.price
    })
  }
}

class Delivery {
  constructor(meal = {}, customer = {}){
    this.id = ++deliveryId
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
  constructor(name){
    this.id = ++employerId
    this.name = name
    store.employers.push(this)
  }
  employees() {
    return store.customers.filter(customer => {
      return customer.employerId == this.id
    })
  }
  mealTotals() {
    let everyMeal = this.deliveries().map(delivery => {
    return delivery.meal();
  });
    let emptyObject = {};
    everyMeal.forEach(meal => {
      emptyObject[meal.id] = 0;
  });
    everyMeal.forEach(meal => {
      emptyObject[meal.id] += 1;
  });
  return emptyObject;
  }
  deliveries() {
    let everyDelivery = this.employees().map(employee => {
      return employee.deliveries()
    })
    let emptyArray = []
    let combined = emptyArray.concat.apply(emptyArray, everyDelivery)
    return combined
  }
  meals() {
    let everyMeal = this.deliveries().map(delivery => {
      return delivery.meal()
    })
    // thanks stackoverflow!
    let nonDupMeals = [...new Set(everyMeal)]
    return nonDupMeals
  }
}
