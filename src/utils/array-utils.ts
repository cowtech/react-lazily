export function range(min: number, max: number = 0): Array<number> {
  return Array.from({ length: Math.abs(max - min) + 1 }).map((_, i) => Math.min(min, max) + i)
}

// Algorithm found here: http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffle<T>(array: Array<T>): Array<T> {
  for (let current = array.length - 1; current > 0; current--) {
    const random = Math.floor(Math.random() * (current + 1)) // Find a random index in the remaining part of the array
    ;[array[current], array[random]] = [array[random], array[current]] // Swap with the current index
  }

  return array
}

export function rotate<T>(array: Array<T>): Array<T> {
  array.push(array.shift()!)

  return array
}
