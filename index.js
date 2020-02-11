require("dotenv").config()
const express= require("express")
const app = express()
const massive = require("massive")
const product_controller = require("./product_controller")


const {SERVER_PORT, CONNECTION_STRING} = process.env

massive(CONNECTION_STRING)
.then((dbinstance)=> app.set("db",dbinstance))
.catch(console.log("err"))


app.use(express.json())

app.post('/api/products', product_controller.create);
app.get('/api/products', product_controller.getAll);
app.get('/api/products/:id', product_controller.getOne);
app.put('/api/products/:id', product_controller.update);
app.delete('/api/products/:id', product_controller.delete);

app.listen(SERVER_PORT, ()=>{
    console.log(`server is listening to ${SERVER_PORT}`)
})