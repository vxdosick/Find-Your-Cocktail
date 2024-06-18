"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Images = exports.Ingredients = exports.Names = void 0;
const mongoose_1 = require("mongoose");
const names = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
}, { collection: "names" });
const ingredients = new mongoose_1.Schema({
    ingredient: {
        type: String,
        required: true
    },
}, { collection: "ingredients" });
const images = new mongoose_1.Schema({
    image: {
        type: String,
        required: true
    },
}, { collection: "images" });
exports.Names = (0, mongoose_1.model)('name', names);
exports.Ingredients = (0, mongoose_1.model)('ingredient', ingredients);
exports.Images = (0, mongoose_1.model)('image', images);
