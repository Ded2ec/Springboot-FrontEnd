export interface Product {
    id: number
    productName: string
    unitPrice: number
    unitInStock: number
    productPicture: string
    categoryId: number
    categoryName: string
    createdDate: string // ISO date string
    modifiedDate: string | null // ISO date string or null
  }
  
  export interface ProductList {
    total: number
    products: Product[]
  }