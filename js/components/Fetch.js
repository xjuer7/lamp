export async function getProducts() {
    const baseUrl = '../data/data.json'
    const productsResponse = await fetch(`${baseUrl}`)

    return await productsResponse.json()
}