import express, { Request, Response, response } from "express";
import routeAdmin from "./route/adminRoute";
import routeCar from './route/carRoute';
import routeRent from './route/rentRoute';

const app = express()
const PORT = 8000
app.use(express.json())

app.use(routeAdmin)
app.use(routeCar)
app.use(routeRent)

// run server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})