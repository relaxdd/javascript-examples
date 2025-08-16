import useState from './modules/use-state.js';

(function () {
  const $names = document.querySelector('#names');
  const $minus = document.querySelector('.main-app__minus');
  const $plus = document.querySelector('.main-app__plus');
  const $count = document.querySelector('.main-app__counter');

  /*
   * ===============================
   */

  function main() {
    function initCounter() {
      const counterState = useState(1);

      counterState.onChange((value) => {
        $count.value = value;
      });

      $plus.addEventListener('click', () => counterState.set((prev) => prev + 1));
      $minus.addEventListener('click', () => counterState.set((prev) => prev - 1));
    }

    function initNames() {
      const names = ['Alex', 'Dmitriy', 'Natasha', 'Marina'];
      const nameState = useState(names[0]);

      /**
       * onChange отрабатывает сразу и потом, при изменении состояния
       */
      nameState.onChange((name) => {
        const $li = document.createElement('li');
        $li.innerText = name;

        $names.append($li);
      });

      let i = 1;

      var interval = setInterval(() => {
        if (!names?.[i]) {
          clearInterval(interval);
          return;
        }

        nameState.set(names[i]);
        i++;
      }, 2500);
    }

    /*
     * ===============================
     */

    initNames();
    initCounter();
  }

  main();
})();
