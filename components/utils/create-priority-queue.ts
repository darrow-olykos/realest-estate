export interface PriorityQueue<T> {
  insert(item: T, priority: number): void
  peek(): T | null
  pop(): T | null
  size(): number
  isEmpty(): boolean
  getData(): [T, number][]
}

export function createPriorityQueue<T>(): PriorityQueue<T> {
  const data: [T, number][] = []

  return {
    insert: (item, priority) => {
      if (data.length == 0) {
        // if no items exist, just insert the new item
        data.push([item, priority])
      } else {
        let inserted = false
        for (let i = 0; i < data.length && inserted !== true; i++) {
          // for each existing item,
          if (i == data.length - 1) {
            // if we get to the end of the data,
            data.push([item, priority]) //   just insert the new item and return
            inserted = true
          } else if (data[i][1] > priority) {
            // otherwise if an existing priority is greater than
            data.splice(i, 0, [item, priority]) //   the provide priority, insert before it
            inserted = true
          }
        }
      }
    },

    isEmpty: () => data.length == 0,

    peek: () => (data.length == 0 ? null : data[0][0]),

    pop: () => {
      let lastDataItem = data.pop()
      return lastDataItem ? (data.length == 0 ? null : lastDataItem[0]) : null
    },

    size: () => data.length,

    getData: () => data,
  }
}
