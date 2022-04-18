import { IAnt } from '.'

export interface Result<T> {
  success: boolean
  data?: T[]
}

export const fetchAnts = async (): Promise<Result<IAnt>> => {
  try {
    let response = await fetch('/api/ants')
    let json = await response.json()
    return { success: true, data: json }
  } catch (error) {
    console.log(error)
    return { success: false }
  }
}
