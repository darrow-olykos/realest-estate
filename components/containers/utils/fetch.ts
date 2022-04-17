export interface Result<T> {
    success: boolean
    data?: T[]
}

export async function get<T>(url: string): Promise<Result<T>> {
    try {
        let response = await fetch(url)
        let json = await response.json()
        return { success: true, data: json }
    } catch (error) {
        console.log(error)
        return { success: false }
    }
}