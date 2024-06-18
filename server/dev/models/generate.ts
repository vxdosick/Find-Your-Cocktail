import { Schema, model } from "mongoose";

const names = new Schema({
    name: {
        type: String,
        required: true
    },
}, {collection: "names"})
const ingredients = new Schema({
    ingredient: {
        type: String,
        required: true
    },
}, {collection: "ingredients"})
const images = new Schema({
    image: {
        type: String,
        required: true
    },
}, {collection: "images"})

export const Names = model('name', names)
export const Ingredients = model('ingredient', ingredients)
export const Images = model('image', images)