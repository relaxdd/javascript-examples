function doSumTwo() {
  /**
   * Базовый пример типизации аргументов функции
   */
  function sumTwo(a: number, b: number): number {
    return a + b;
  }

  console.log(sumTwo(3, 2));
}

function doSayHello() {
  /**
   * Тоже самое, типизируем аргумент функции
   */
  function sayHello(name: string): void {
    alert(`Hello ${name}`);
  }

  console.log(sayHello('Misha'));
}

function doArrayLogging() {
  function arrayLogging(array: string[]): void {
    for (const element of array) {
      console.log(element);
    }
  }

  const array = ['Petya', 'Misha', 'Sasha', 'Nikita'];
  arrayLogging(array);
}

/*
 * =======================================
 */

doSumTwo();
doSayHello();
doArrayLogging();
