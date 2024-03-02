import express from "express"
import { createCar, deleteCar, readCar, updateCar } from "../controller/carController"
import { verifyAdmin } from "../middleware/verifyAdmin"

const app = express()

// allow to read a json from body
app.use(express.json())

app.get(`/car`, verifyAdmin ,readCar)
app.post('/car', verifyAdmin ,createCar)
app.put('/car/:carID', verifyAdmin ,updateCar)
app.delete('/car/:carID', verifyAdmin ,deleteCar)

export default app