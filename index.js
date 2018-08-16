let store = {customers: [], meals: [], employers: [], deliveries: []}
let customerId = 0

class Customer {
  constructor(name, employer) {
    this.name = name
    if (employer) {
      this.employerId = employer.id
    }
    this.id = ++customerId
    store.customers.push(this)
  }
  deliveries() {
    const deliveries1 = store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
    return deliveries1
  }
  meals() {
    const deliveries2 = this.deliveries()
    let empty_array = []
    for (const delivery of deliveries2) {
      empty_array.push(delivery.meal())
    }
    return empty_array
  }
  totalSpent() {
    const my_meals = this.meals()
    const meal_collect = []
    for (const meal of my_meals) {
      meal_collect.push(meal.price)
    }
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const total = meal_collect.reduce(reducer)
    return total
  }
}

let mealId = 0
class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }
  static byPrice() {
    let test = store.meals.sort(function (a, b) {
      return b.price - a.price
    })
    return test
  }
  deliveries() {
    const deliveries2 = store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
    return deliveries2
  }
  customers() {
    const deliveries3 = this.deliveries()
    let empty_array = []
    for (const delivery of deliveries3) {
      empty_array.push(delivery.customer())
    }
    return empty_array
  }
}


  let employerId = 0
class Employer {
  constructor(name) {
    this.name = name
    this.id = ++employerId
    store.employers.push(this)
  }
  employees() {
    const employees1 = store.customers.filter(customer => {
      return customer.employerId === this.id
    })
    return employees1
  }
  deliveries() {
    const employees2 = this.employees()
    let empty_array = []
    for (const employee of employees2) {
      empty_array.push(employee.deliveries())
    }
    let merged = [].concat.apply([], empty_array)
    let uniq_merged = [...new Set(merged)]
    console.log(merged)
    return empty_array[0]
  }
  meals() {
    const deliveries4 = this.deliveries()
    console.log(this.deliveries())
    let empty_array = []
    for (const delivery of deliveries4) {
      empty_array.push(delivery.meal())
    }
    return empty_array
  }
  mealTotals() {
    const employees2 = this.employees()
    let empty_array = []
    for (const employee of employees2) {
      empty_array.push(employee.deliveries())
    }
    let merged = [].concat.apply([], empty_array)
    let empty_array1 = []
    for (const delivery of merged) {
      empty_array1.push(delivery.meal())
    }


    let empty_object = {}
    let meal2 = empty_array1
    console.log(meal2)
    for (var i = 0; i < meal2.length; ++i) {
      console.log(meal2)
      if(!empty_object[meal2[i].id])
        empty_object[meal2[i].id] = 0;
        ++empty_object[meal2[i].id]
    }
    // for(const meal of meal2) {
    //   let meal_id = meal.id
    //   console.log(meal)
    //   console.log(empty_object[meal.id])
    //
    //   if (empty_object[meal_id]) {
    //     console.log(empty_object)
    //     empty_object[meal_id] += 2
    //   }
    //   else {
    //     console.log(empty_object)
    //   empty_object[meal.id] = 1
    //   }
    // }

    return empty_object
  }
}
let deliveryId = 0
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
  customer() {
    const customer1 = store.customers.filter(customer => {
      return customer.id === this.customerId
    })
    return customer1[0]
  }
  meal() {
    const meal1 = store.meals.filter(meal => {
      return meal.id === this.mealId
    })
    return meal1[0]
  }
}
