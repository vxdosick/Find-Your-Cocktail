import express from "express"
import { connect } from "mongoose"
import { MONGO, PORT } from "./config"
import { cocktailRouter } from "./router/allItemsRouter"
import { favouriteRouter } from "./router/favouriteRouter"
import { generateRouter } from "./router/generateRouter"
import cors from 'cors';
const app = express()

const corsOptions: cors.CorsOptions = {
    origin: 'https://find-your-cocktail-2.onrender.com',
    optionsSuccessStatus: 200,
  };
  
  app.use(cors(corsOptions))
connect(String(MONGO))


app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use("/api", cocktailRouter)
app.use("/api/favourite", favouriteRouter)
app.use("/api/generate", generateRouter)
app.listen(PORT, ()=>{
    console.log("Server is running");
})

