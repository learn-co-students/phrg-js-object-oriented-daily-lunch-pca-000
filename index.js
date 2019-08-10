let store = {customers: [], meals: [], deliveries: [], employers: []}
let customerID = 0
let mealID = 0
let deliveryID = 0
let employerID = 0

class Customer {
  constructor(name, employer) {
    this.name = name;
    if (employer) {
      this.employerId = employer.id;
    }
    this.id = ++customerID
    store.customers.push(this);
  }
  setDelivery(delivery) {
    this.deliveryId = delivery.id;
  }
  setEmployer(employer) {
    this.employerId = employer.id;
  }
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    });
  }
  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal();
    });
  }
  totalSpent() {
    let total = 0;
    const allMeals = this.meals();
    allMeals.forEach(meal => {
      total += meal.price;
    })
    return total;
  }
}

class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealID;
    store.meals.push(this);
  }
  static byPrice() {
    return store.meals.sort(function (a,b) {
      return b.price - a.price;
    });
  }
  setDelivery(delivery) {
    this.deliveryId = delivery.id;
  }
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
    });
  }
  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer();
    });
  }
}

class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryID;
    if (meal) {
      this.mealId = meal.id;
    }
    if (customer) {
      this.customerId = customer.id;
    }
    store.deliveries.push(this);
  }
  customer() {
    return store.customers.find(cust => {
      return cust.id === this.customerId;
    });
  }
  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId;
    });
  }
}

class Employer {
  constructor(name) {
    this.name = name;
    this.id = ++employerID;
    store.employers.push(this);
  }
  employees() {
    return store.customers.filter(customer => {
      return customer.employerId === this.id;
    });
  }
  deliveries() {
    const deliveries = this.employees().map(employee => {
      return employee.deliveries();
    })
    const flattened = deliveries.reduce(function(a,b) {
      return a.concat(b);
    })
    return flattened;
  }
  meals() {
    const arr = this.deliveries().map(delivery => {
      return delivery.meal();
    })
    return arr.filter((v, i, a) => a.indexOf(v) === i);
  }
  mealTotals() {
    const totals = {}
    const allMeals = this.deliveries().map(delivery => {
      return delivery.meal();
    })
    for (const meal of allMeals) {
      if (totals[meal.id]) {
        totals[meal.id] += 1;
      } else {
        totals[meal.id] = 1;
      }
    }
    return totals;
  }
}
