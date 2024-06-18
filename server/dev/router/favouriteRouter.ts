import { Router } from "express";
import { Favourite } from "../models/favourite";
import { Cocktail } from "../models/allItems";
const router = Router()

router.post("/add-to-fav", async (req, res)=> {
    try {
        const newFav = new Favourite(req.body)
        const result = await newFav.save()
        if (!result) throw new Error("No added to favourite")
        res.status(200).send(result)
        console.log("Element is added to favourite");
    } catch (err) {
        console.log(err);
        res.status(500)
    }
})

router.get("/favourite", async (req,res)=> {
    try {
        const allFav = await Cocktail.find({favourite: true})
        if (!allFav) console.log("Favourite is empty");
        res.status(200).send(allFav)
    } catch (err) {
        console.log(err);
    }
})

router.put("/favourite-upd/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const favourite = req.body.favourite;
        const updatedFavourite = await Cocktail.updateOne(
            { _id: id },
            { $set: { favourite: favourite } }
        );


        res.status(200).send(updatedFavourite);
    } catch (err) {
        console.log(err);
    }
});
router.put("/favourite-story/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const story = req.body.story;
        const updatedFavourite = await Cocktail.updateOne(
            { _id: id },
            { $set: { story: story } }
        );


        res.status(200).send(updatedFavourite);
    } catch (err) {
        console.log(err);
    }
});


export const favouriteRouter = router