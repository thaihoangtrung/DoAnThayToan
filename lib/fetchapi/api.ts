import axios, { AxiosInstance } from 'axios'
import { useUserStore } from '../store/useUserStore';

// const API_URL = 'http://localhost:10001/api';
const API_URL = 'http://localhost:8080/';

const apiPublic: AxiosInstance = axios.create({
  baseURL: API_URL,
})


const apiPrivate: AxiosInstance = axios.create({
  baseURL: API_URL,
})

apiPrivate.interceptors.request.use(
  (config) => {
    const token = useUserStore.getState().token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// User API
export const postLogin = async (username: string, password: string) => {
  const { data } = await apiPrivate.post('auth/login', { username, password })
  return data
}

export const postRegister = async (username: string, password: string, email: string) => {
  const { data } = await apiPrivate.post('auth/signup', {
    username,
    password,
    email,
  })
  return data
}



//Blog API
export const getAllBlogs = async () => {
  const { data } = await apiPublic.get('/blogs')
  return data.data
}

export const getBlogDetails = async (slug: string) => {
  const { data } = await apiPublic.get(`/blogs/slug/${slug}`)
  return data.data
}


// Product API
export const getProducts = async () => {
  const { data } = await apiPublic.get('/products')
  return data.data
}

export const getProductDetails = async (slug: string) => {
  const { data } = await apiPublic.get(`/products/details/${slug}`)
  return data.data;
}

export const searchProducts = async (query: string) => {
  const { data } = await apiPublic.get(`/products/details/search?q=${query}`)
  return data.data
}


export const getProductsCategory = async (categoryId: number) => {
  const { data } = await apiPublic.get(`products/category/${categoryId}`)
  return data.products
}

export const getCategory = async () => {
  const { data } = await apiPublic.get('/categories')
  return data
}

export const searchProductsApi = async (searchParams: {
  query: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}) => {
  const { query, category, minPrice, maxPrice } = searchParams;

  try {
    const { data } = await apiPublic.get("/search", {
      params: {
        query,
        category,
        minPrice,
        maxPrice,
      },
    });
    return data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};


export const getCategories = async () => {
  const response = await apiPublic.get('/categories');
  return response.data;
};

// Cart API
export const addToCart = async (productId: number, quantity: number, price: number, size: string) => {
  const { data } = await apiPrivate.post('/carts', { productId, quantity, price, size })
  return data
}


export const getCart = async () => {
  const { data } = await apiPrivate.get('/cart')
  return data
}

export const updateItemCart = async (id: number, quantity: number) => {
  const { data } = await apiPrivate.patch(`/carts/${id}`, { quantity: quantity })
  return data
}

export const deleteItemCart = async (id: number) => {
  const { data } = await apiPrivate.delete(`/carts/${id}`)
  return data
}

export const getUserOrderHistory = async () => {
  const { data } = await apiPrivate.get('/orders/user/history')
  return data
}
export const applyCoupon = async (code: string) => {
  const response = await apiPublic.post('/coupons/code/apply', { code });
  return response.data.discount;
};

// Order API
export const postOrder = async (address: string, paymentMethod: string, couponCode: string) => {
  const { data } = await apiPrivate.post("/orders", { address, paymentMethod, couponCode })
  return data
}

export interface Consignment {
  productName: string
  description: string
  price: number
  size: string
  condition: string
  productType: number
  images: File[]
}

export async function createConsignment(formData: FormData): Promise<Consignment> {
  const response = await apiPrivate.post("/consignments", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

  return response.data
}


export const handleApiError = (error: any) => {
  console.error('API Error:', error)
  if (error.response) {
    console.error('Data:', error.response.data)
    console.error('Status:', error.response.status)
    console.error('Headers:', error.response.headers)
  } else if (error.request) {
    console.error('Request:', error.request)
  } else {
    console.error('Error:', error.message)
  }
  throw error
}

export const withErrorHandling = <T>(fn: (...args: any[]) => Promise<T>) => {
  return async (...args: any[]): Promise<T> => {
    try {
      return await fn(...args)
    } catch (error) {
      handleApiError(error)
      throw error
    }
  }
}