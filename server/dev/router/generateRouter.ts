import { Router } from "express";
import { Favourite } from "../models/favourite";
import { Cocktail } from "../models/allItems";

import { Names } from "../models/generate";
import { Images } from "../models/generate";
import { Ingredients } from "../models/generate";

const router = Router()


router.get("/name", async (req, res)=> {
    try {
        let name = await Names.find()
        if (!name) console.log("No names");
        res.status(200).send(name)
    } catch (err) {
        console.log(err);
    }
})
router.get("/ingredient", async (req, res)=> {
    try {
        let ingr = await Ingredients.find()
        if (!ingr) console.log("No ingredients");
        res.status(200).send(ingr)
    } catch (err) {
        console.log(err);
    }
})
router.get("/image", async (req, res)=> {
    try {
        let img = await Images.find()
        if (!img) console.log("No images");
        res.status(200).send(img)
    } catch (err) {
        console.log(err);
    }
})



export const generateRouter = router