import api from "../lib/api"

export const CropService = {
  getAllCrops: async () => {
    return api.get("/crops")
  },

  getCropById: async (id) => {
    return api.get(`/crops/${id}`)
  },

  createCrop: async (data) => {
    return api.post("/crops", data)
  },

  updateCrop: async (id, data) => {
    return api.put(`/crops/${id}`, data)
  },

  deleteCrop: async (id) => {
    return api.delete(`/crops/${id}`)
  },
}
