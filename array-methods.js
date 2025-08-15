/**
 * Проверяем массив с пиплами на валидность данных
 * @param {{ name: string, age: number }[]} array
 */
function validatePeoplesArray(array) {
  if (!array || !Array.isArray(array)) {
    throw new TypeError('The argument passed to the function must be an array.');
  }

  for (const [i, element] of array.entries()) {
    const isNotObject = typeof element !== 'object';
    const isObjectButArray = Array.isArray(element);
    const isNotPlainObject = element.toLocaleString() !== '[object Object]';

    if (isNotObject || isObjectButArray || isNotPlainObject) {
      throw new TypeError('Each element of the array must be a plain object.');
    }

    /*
     * =============================
     */

    const keys = Object.keys(element);

    if (keys.length !== 2 || !['name,age', 'age,name'].includes(keys.join())) {
      throw new TypeError(`Incorrect properties have been passed to the object of the array element[${i}].`);
    }

    if (typeof element?.name !== 'string') {
      throw new TypeError('The "name" property in the array element object must be a string.');
    }

    if (typeof element?.age !== 'number' || !Number.isInteger(element.age)) {
      throw new TypeError('The "age" property in the array element object must be an integer.');
    }
  }
}

/**
 * Пушим к каждому обьекту в массиве день рождения по свойству `age`
 *
 * @param {Record<string, string|number>[]} peoples
 * @return {void}
 */
function pushBirthYearInPeoples(peoples) {
  /*
   * Можно конечно и так, но в идеале для таких целей
   * Лучше использовать метод `map`, что бы возвращать новый массив
   * А не мутировать старый, что бы не было side эффектов
   */
  // peoples.forEach((people) => {
  //   people.birthYear = new Date().getFullYear() - people.age;
  // });

  // return peoples;

  return peoples.map((people) => {
    const birthYear = new Date().getFullYear() - people.age;

    /*
     * Вместо того что бы записывать в обьект новое свойство
     * Возвращаем на каждой итерации новый обьект
     */
    return { ...people, birthYear };
  });
}

/**
 * Сортируем массив обьектов по указанному свойству и направлению
 *
 * @param {Record<string, string|number>[]} peoples
 * @param {'name'|'age'} property
 * @param {'ASC'|'DESC'|undefined} order
 * @return {void}
 */
function sortPeoplesByPropertyName(peoples, property, order = 'ASC') {
  const allowed = {
    order: ['ASC', 'DESC'],
    property: ['name', 'age'],
  };

  if (!allowed.property.includes(property)) {
    throw new TypeError('The "property" argument is invalid');
  }

  if (!allowed.order.includes(order)) {
    throw new TypeError('The "order" argument is invalid');
  }

  const sortFn = (a, b) => {
    switch (true) {
      case property === 'name' && order === 'ASC':
        return a.name.localeCompare(b.name);
      case property === 'name' && order === 'DESC':
        return b.name.localeCompare(a.name);
      case property === 'age' && order === 'ASC':
        return a.age - b.age;
      case property === 'age' && order === 'DESC':
        return b.age - a.age;
      default:
        return 0;
    }
  };

  /*
   * Тут смысл такой же как и с forEach,
   * Сортируется (мутируем) исходный массив
   */
  // peoples.sort(sortFn);
  // return;

  return peoples.toSorted(sortFn);
}

/*
 * ==========================================
 */

function main() {
  try {
    const peoples = [
      { name: 'Vasya', age: 28 },
      { name: 'Danya', age: 26 },
      { name: 'Nikita', age: 25 },
      { name: 'Misha', age: 15 },
      { name: 'Kirill', age: 10 },
      { name: 'Vladimir', age: 17 },
    ];

    validatePeoplesArray(peoples);

    /*
     * =======================================
     * Добавляем новое свойство birthYear
     * =======================================
     */

    console.log(pushBirthYearInPeoples(peoples));
    console.log('=============================');

    /*
     * =======================================
     * Сортируем массив по указанному свойству
     * =======================================
     */

    console.log(sortPeoplesByPropertyName(peoples, 'age', 'ASC'));
    console.log('=============================');
  } catch (e) {
    console.error(e);
  }
}

main();
