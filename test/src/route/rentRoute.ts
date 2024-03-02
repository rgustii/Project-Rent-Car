import express from "express"
import { createRent, deleteRent, readRent } from "../controller/rentController"
import { updateCar } from "../controller/carController"
import { verifyAdmin } from "../middleware/verifyAdmin"

const app = express()

// allow to read a json from body
app.use(express.json())

app.get('/rent', verifyAdmin ,readRent)
app.post('/rent', verifyAdmin ,createRent)
app.put('/rent/:rentID', verifyAdmin ,updateCar)
app.delete('/rent/:rentID', verifyAdmin ,deleteRent)

export default app