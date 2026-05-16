import axios from "axios"

const api = axios.create({
  baseURL: "http://103.93.160.128:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// Optional: Add interceptors for error handling or auth tokens
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle global errors here
    console.error("API Error:", error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export default api
