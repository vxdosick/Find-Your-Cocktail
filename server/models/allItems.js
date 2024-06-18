"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cocktail = void 0;
const mongoose_1 = require("mongoose");
const cocktailBase = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false,
        default: "../../public/public/images/cocktail1.png"
    },
    ingredients: {
        type: String,
        required: true
    },
    favourite: {
        type: Boolean,
        required: false,
        default: false
    },
    story: {
        type: String,
        required: false,
        default: ""
    }
}, { collection: "allItems" });
exports.Cocktail = (0, mongoose_1.model)('allItem', cocktailBase);
