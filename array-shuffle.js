function shuffle() {
  const copied = structuredClone(this);

  for (let i = copied.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }

  return copied;
}

Array.prototype.shuffle = shuffle;

/*
 * ==============================
 */

var arr = ['a', 'b', 'c', 'd', 'e', 'f', 'j'];
console.log(arr.shuffle());
