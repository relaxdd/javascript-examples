class Contact {
  constructor(name, number) {
    this.name = name;
    this.number = number;

    /**
     * Рабочий вариант но зачем так делать, хз
     * Если раскомментировать будет перебивать метод ниже
     */
    // this.print = function () {
    //   console.log(`${this.name}: ${this.number}`);
    // };
  }

  print() {
    console.log(`${this.name}: ${this.number}`);
  }
}

/**
 * Старый ES5 синтаксис
 */
// function Contact(name, number) {
//   this.name = name;
//   this.number = number;

//   this.print = function () {
//     console.log(`${this.name}: ${this.number}`);
//   };
// }

let alex = new Contact('Alex', 89022134634);
let misha = new Contact('Misha', 89914617458);

alex.print();
misha.print();
