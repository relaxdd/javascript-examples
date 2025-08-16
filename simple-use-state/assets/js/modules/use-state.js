function useState(defaultValue) {
  /** @type {number|string} value */
  let value = defaultValue;
  /** @type {number|string} listeners */
  const listeners = [];

  // /**
  //  *
  //  * @param {((value: any) => void)|undefined} listener
  //  * @returns {any}
  //  */
  // function getValue(listener = undefined) {
  //   if (!listener) {
  //     return value;
  //   }

  //   if (typeof listener === 'function') {
  //     listener(value);
  //     listeners.push(listener);
  //     return undefined;
  //   }

  //   throw new TypeError('Incorrect argument "listener"')
  // }

  function getValue() {
    return value;
  }

  /**
   * @param {number|string|((prevValue: number|string) => number|string)} newValue
   */
  function setValue(newValue) {
    value = typeof newValue === 'function' ? newValue(value) : newValue;

    for (const listener of listeners) {
      listener(value);
    }
  }

  /**
   * @param {((value: number|string) => void)} listener
   */
  function onChange(listener) {
    listener(value);
    listeners.push(listener);
  }

  return {
    onChange,
    get: getValue,
    set: setValue,
  };
}

export default useState;
