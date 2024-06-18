"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Favourite = void 0;
const mongoose_1 = require("mongoose");
const favouriteBase = new mongoose_1.Schema({
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
    }
}, { collection: "favourites" });
exports.Favourite = (0, mongoose_1.model)('favourites', favouriteBase);
