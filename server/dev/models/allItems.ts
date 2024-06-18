import { Schema, model } from "mongoose";

const cocktailBase = new Schema({
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
}, {collection: "allItems"})

export const Cocktail = model('allItem', cocktailBase)