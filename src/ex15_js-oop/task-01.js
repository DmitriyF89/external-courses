class Present {
  constructor() {
    this.sweets = [];
  }

  addSweets(sweet, weight) {
    this.sweets.push({
      type: sweet,
      weight: weight
    });
  }

  calcWeight() {
    const weight = this.sweets.reduce((prev, item) => {
      return prev + item.weight;
    }, 0);
    window.console.log('Общий вес конфет в подарке составляет ' + weight + ' грамм');
  }

  searchCandy(name) {
    let candyPosition;
    const hasCandy = this.sweets.find((item, index) => {
      candyPosition = index;
      return item.type.name.toLowerCase() === name.toLowerCase()
    });
    if (hasCandy) {
      console.log('В подарке есть ' + this.sweets[candyPosition].weight +
        ' грамм конфет ' + '\"' + name + '\"' + ' !');
    } else {
      console.log('В подарке нет конфет ' + name + '.');
    }
  }

  sortByWeight() {
    console.log('Конефты в подарке отсортированы по весу:')
    this.sweets.sort((a, b) => b.weight - a.weight);
    this.sweets.forEach((element) => {
      console.log('  *  Конфет ' + element.type.name +
        ' в подарке ' + element.weight + ' грамм!');
    });
  }

  sortByName() {
    console.log('Конефты в подарке отсортированы по имени:')
    this.sweets.sort((a, b) => {
      return a.type.name > b.type.name ? 1 : -1;
    });
    this.sweets.forEach((element) => {
      console.log('  *  ' + element.type.name);
    });
  }
}

class Candies {
  constructor(brand, name, ingredients) {
    this.brand = brand;
    this.name = name;
    this.ingredients = ingredients;
  }
}

class ChocolateCandies extends Candies {
  constructor(brand, name, ingredients, filling) {
    super(brand, name, ingredients);
    this.filling = filling;
  }
}

class CaramelCandies extends Candies {
  constructor(brand, name, ingredients, filling) {
    super(brand, name, ingredients);
    this.filling = filling;
  }
}

class Toffee extends Candies {
  constructor(brand, name, ingredients, consistence) {
    super(brand, name, ingredients);
    this.consistence = consistence;
  }
}

const
  redRidingHood = new ChocolateCandies
    ('Красный Октябрь', 'Красная шапочка', 'Шоколадные', ['вафли', 'пралине']),
  walnutGrove = new ChocolateCandies
    ('КК Бабаевский', 'Ореховая роща', 'Шоколадные', ['пралине']),
  toedBear = new ChocolateCandies
    ('Рот Фронт', 'Мишка косолапый', 'Шоколадные', ['орехи', 'вафли']),
  goldenStep = new ChocolateCandies
    ('Славянка', 'Золотой Степ', 'Шоколадные', ['орехи', 'карамель']),
  tiramisuCaramel = new CaramelCandies
    ('Конти', 'Карамель Тирамису', 'Карамельные', ['молочная']),
  funnyDrops = new CaramelCandies
    ('Невский Кондитер', 'Funny Drops', 'Карамельные', ['фруктовая']),
  newbieCrustaceans = new CaramelCandies
    ('Алекс Групп', 'Рачки новички', 'Карамельные', ['ореховая']),
  kisKis = new Toffee
    ('Красный Октябрь', 'Кис Кис', 'Ирисовые', 'Тягучий'),
  goldenKey = new Toffee
    ('Красный Октябрь', 'Золотой Ключик', 'Ирисовые', 'Литой полутвердый'),
  newYearPresent = new Present();

newYearPresent.addSweets(redRidingHood, 150);
newYearPresent.addSweets(walnutGrove, 125);
newYearPresent.addSweets(toedBear, 115);
newYearPresent.addSweets(goldenStep, 120);
newYearPresent.addSweets(tiramisuCaramel, 80);
newYearPresent.addSweets(funnyDrops, 70);
newYearPresent.addSweets(newbieCrustaceans, 60);
newYearPresent.addSweets(kisKis, 50);
newYearPresent.addSweets(goldenKey, 50);

newYearPresent.calcWeight();
newYearPresent.sortByName();
newYearPresent.sortByWeight();
newYearPresent.searchCandy('Карамель Тирамису');