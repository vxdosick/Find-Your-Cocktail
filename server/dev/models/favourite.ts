import { Schema, model } from "mongoose";

const favouriteBase = new Schema({
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
}, {collection: "favourites"})

export const Favourite = model('favourites', favouriteBase)