import express from 'express'
import { createAdmin, deleteAdmin, login, readAdmin, updateAdmin } from '../controller/adminController'
import { verifyAdmin } from '../middleware/verifyAdmin'
const app = express()

// allow to read a json from body
app.use(express.json())

app.get('/admin' ,readAdmin)
app.post('/admin', verifyAdmin ,createAdmin)
app.put('/admin/:adminID', verifyAdmin ,updateAdmin)
app.delete('/admin/:adminID', verifyAdmin ,deleteAdmin )
app.post('/admin/login', login)

export default app