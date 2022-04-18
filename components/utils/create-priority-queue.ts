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
        data.push([item, priority])
      } else {
        let inserted = false
        for (let i = 0; i < data.length && inserted !== true; i++) {
          if (data[i][1] > priority) {
            data.splice(i, 0, [item, priority])
            inserted = true
          } else if (i == data.length - 1) {
            data.push([item, priority])
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
