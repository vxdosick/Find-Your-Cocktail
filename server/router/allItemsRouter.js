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
exports.cocktailRouter = void 0;
const express_1 = require("express");
const allItems_1 = require("../models/allItems");
const router = (0, express_1.Router)();
router.get("/base", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let cocktails = yield allItems_1.Cocktail.find();
        if (!cocktails)
            console.log("No items");
        res.status(200).send(cocktails);
    }
    catch (err) {
        console.log(err);
    }
}));
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCocktail = new allItems_1.Cocktail(req.body);
        const result = yield newCocktail.save();
        if (!result)
            throw new Error("No added");
        res.status(200).send(result);
        console.log("Element is added");
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield allItems_1.Cocktail.deleteOne({ "_id": req.params.id }, { $set: req.query });
        if (!result)
            console.log("Not delete");
        res.status(200).send(result);
        res.end();
    }
    catch (err) {
        console.log(err);
    }
}));
router.get("/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let findCocktails = yield allItems_1.Cocktail.find({ name: req.params.name });
        if (!findCocktails)
            console.log(`No items: ${req.params.name}`);
        res.status(200).send(findCocktails);
    }
    catch (err) {
        console.log(err);
    }
}));
exports.cocktailRouter = router;
