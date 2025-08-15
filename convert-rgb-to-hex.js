/**
 * @param {unknown} rgb
 * @return {string}
 */
function convertRgbToHex(...rgb) {
  /** @type {number[]}  */
  const arr = [];

  for (let i = 0; i < 3; i++) {
    const val = +(rgb?.[i] ?? 0);
    arr[i] = isNaN(val) ? 0 : val;
  }

  return `#${arr.map((it) => it.toString(16)).join('')}`;
}
