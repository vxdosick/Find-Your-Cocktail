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
exports.generateRouter = void 0;
const express_1 = require("express");
const generate_1 = require("../models/generate");
const generate_2 = require("../models/generate");
const generate_3 = require("../models/generate");
const router = (0, express_1.Router)();
router.get("/name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let name = yield generate_1.Names.find();
        if (!name)
            console.log("No names");
        res.status(200).send(name);
    }
    catch (err) {
        console.log(err);
    }
}));
router.get("/ingredient", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let ingr = yield generate_3.Ingredients.find();
        if (!ingr)
            console.log("No ingredients");
        res.status(200).send(ingr);
    }
    catch (err) {
        console.log(err);
    }
}));
router.get("/image", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let img = yield generate_2.Images.find();
        if (!img)
            console.log("No images");
        res.status(200).send(img);
    }
    catch (err) {
        console.log(err);
    }
}));
exports.generateRouter = router;
