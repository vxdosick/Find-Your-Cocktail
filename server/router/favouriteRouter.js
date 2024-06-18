"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.favouriteRouter = void 0;
const express_1 = require("express");
const favourite_1 = require("../models/favourite");
const allItems_1 = require("../models/allItems");
const router = (0, express_1.Router)();
router.post("/add-to-fav", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newFav = new favourite_1.Favourite(req.body);
        const result = yield newFav.save();
        if (!result)
            throw new Error("No added to favourite");
        res.status(200).send(result);
        console.log("Element is added to favourite");
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }
}));
router.get("/favourite", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allFav = yield allItems_1.Cocktail.find({ favourite: true });
        if (!allFav)
            console.log("Favourite is empty");
        res.status(200).send(allFav);
    }
    catch (err) {
        console.log(err);
    }
}));
router.put("/favourite-upd/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const favourite = req.body.favourite;
        const updatedFavourite = yield allItems_1.Cocktail.updateOne({ _id: id }, { $set: { favourite: favourite } });
        res.status(200).send(updatedFavourite);
    }
    catch (err) {
        console.log(err);
    }
}));
router.put("/favourite-story/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const story = req.body.story;
        const updatedFavourite = yield allItems_1.Cocktail.updateOne({ _id: id }, { $set: { story: story } });
        res.status(200).send(updatedFavourite);
    }
    catch (err) {
        console.log(err);
    }
}));
exports.favouriteRouter = router;
