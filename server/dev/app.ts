import express from "express"
import { connect } from "mongoose"
import { MONGO, PORT } from "./config"
import { cocktailRouter } from "./router/allItemsRouter"
import { favouriteRouter } from "./router/favouriteRouter"
import { generateRouter } from "./router/generateRouter"
const app = express()
connect(MONGO)
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use("/api", cocktailRouter)
app.use("/api/favourite", favouriteRouter)
app.use("/api/generate", generateRouter)
app.listen(PORT, ()=>{
    console.log("Server is running");
})

