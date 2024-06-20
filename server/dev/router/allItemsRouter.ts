import { Router } from "express";
import { Cocktail } from "../models/allItems";
const router = Router()

router.get("/base", async (req, res)=> {
    try {
        let cocktails = await Cocktail.find()
        if (!cocktails) console.log("No items");
        res.status(200).send(cocktails)
    } catch (err) {
        console.log(err);
    }
})

router.post("/add", async (req, res)=> {
    try {
        const newCocktail = new Cocktail(req.body)
        const result = await newCocktail.save()
        if (!result) throw new Error("No added")
        res.status(200).send(result)
        console.log("Element is added");
    } catch (err) {
        console.log(err);
        res.status(500)
    }
})
router.delete("/:id", async (req, res)=> {
    try {
        let result = await Cocktail.deleteOne({"_id": req.params.id}, {$set: req.query})
        if(!result) console.log("Not delete");
        res.status(200).send(result)
        res.end()
    } catch (err) {
        console.log(err);
    }
})
router.get("/:name", async (req, res)=> {
    try {
        let findCocktails = await Cocktail.find({name: req.params.name})
        if (!findCocktails) console.log(`No items: ${req.params.name}`);
        res.status(200).send(findCocktails)
    } catch (err) {
        console.log(err);
    }
})


export const cocktailRouter = router