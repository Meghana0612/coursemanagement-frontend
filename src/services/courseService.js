import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/courses'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Error handling
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err.response?.data?.message ||
      err.response?.data?.error ||
      'Something went wrong'
    return Promise.reject(new Error(message))
  }
)

const courseService = {
  getAll:          ()          => api.get(''),             // ✅ no '/'
  getById:         (id)        => api.get(`/${id}`),
  create:          (data)      => api.post('', data),      // ✅ no '/'
  update:          (id, data)  => api.put(`/${id}`, data),
  delete:          (id)        => api.delete(`/${id}`),
  search:          (keyword)   => api.get(`/search?keyword=${keyword}`),
  getByCategory:   (category)  => api.get(`/category/${category}`),
  getActive:       ()          => api.get('/active'),
  getByPriceRange: (min, max)  => api.get(`/price-range?minPrice=${min}&maxPrice=${max}`),
  enroll:          (id)        => api.post(`/${id}/enroll`),
}

export default courseService