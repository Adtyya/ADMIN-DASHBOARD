import api from "../lib/api"

export const SensorService = {
  getLatestSensor: async () => {
    return api.get("/sensor/latest")
  },
}
