<template>
    <div class="wrapper">
        <img class="gen__bg" src="../assets/bg-generator.webp" alt="background__generator">
        <div class="gen">
            <h1>Out of ideas? Try our cocktail generator</h1>
            <div class="gen__main">
                <div class="base__item">
                        <img :src="cocktailImg" alt="icon">
                        <h2 class="base__name">{{ cocktailName }}</h2>
                        <p class="base__ingredients">{{ cocktailIngredients }}</p>
                        <button @click="addToBase" class="gen__add">Add To Base</button>
                    </div>
            </div>
            <button @click="cocktailGenerate" class="gen__generate">Generate</button>
        </div>
    </div>
</template>
<script>
// import axios from 'axios';
import apiClient from '@/services/api';

export default {
    name: "GeneratorComponent",
    data() {
        return {
            cocktailName: "Name",
            cocktailIngredients: "Ingredients",
            cocktailImg: "/images/cocktail1.png",
            namesBase: [],
                ingredientsBase: [],
            imagePaths: [],
        }
    },
    methods: {
        async addToBase() {
            try {
                const newCocktail = {
                    name: this.cocktailName,
                    img: this.cocktailImg,
                    ingredients: this.cocktailIngredients,
                    favourite: false,
                    story: ""
                };
                const url = `/api/add`;
                const response = await apiClient.post(url, newCocktail);
                this.cocktails.push(response.data);
            } catch (err) {
                console.log(err);
            }
        },
        cocktailGenerate() {
            const randomNameIndex = Math.floor(Math.random() * 50);
            const randomIngredientIndex = Math.floor(Math.random() * 50);
            const randomImagesIndex = Math.floor(Math.random() * 8);
            if (randomNameIndex < this.namesBase.length) {
                this.cocktailName = this.namesBase[randomNameIndex].name;
            } else {
                this.cocktailName = this.namesBase[1];
            }

            if (randomIngredientIndex < this.ingredientsBase.length) {
                this.cocktailIngredients = this.ingredientsBase[randomIngredientIndex].ingredient;
            } else {
                this.cocktailIngredients = this.ingredientsBase[1];
            }

            if (randomImagesIndex < this.imagePaths.length) {
                this.cocktailImg = this.imagePaths[randomImagesIndex].image;
            } else {
                this.cocktailImg = this.ingredientsBase[1];
            }

            console.log(this.cocktailName);
            console.log(this.cocktailIngredients);
            console.log(this.cocktailImg);
        }
    },
    async mounted() {
        const nameResult = await apiClient.get("/api/generate/name")
        this.namesBase = nameResult.data
        const ingredientsResult = await apiClient.get("/api/generate/ingredient")
        this.ingredientsBase = ingredientsResult.data
        const imagesResult = await apiClient.get("/api/generate/image")
        this.imagePaths = imagesResult.data
    },
}
</script>
<style lang="scss" scoped>
.wrapper {
    position: relative;
    .gen__bg {
        position: absolute;
        width: 100%;
        height: calc(100vh - 142px);
        object-fit: cover;
        z-index: 1;
    }
    .gen {
        position: relative;
        z-index: 2;
        height: 785px;
        max-width: 1630px;
        margin: 0 auto;
        padding: 50px 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        h1 {
            text-align: center;
            font-size: 50px;
            font-weight: 800;
            -webkit-text-stroke: 1px rgb(255, 255, 255);
            color: rgb(0, 0, 0);
        }
        .gen__main {
            padding: 50px 0px;
            .base__item {
                    border-radius: 5px;
                    background-color: rgb(80, 80, 80);
                    padding: 20px 40px;
                    color: black;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                    width: 480px;
                    .gen__add {
                        border-radius: 5px;
                        margin-top: 30px;
                        background-color: unset;
                        color: antiquewhite;
                        font-weight: 800;
                        font-size: 16px;
                        border: 1px solid antiquewhite;
                        padding: 10px 20px;
                        transition: all 0.4s ease;
                            &:hover {
                                color: black;
                                border: 1px solid black;
                                background-color: antiquewhite;
                            }
                    }
                    img {
                        width: 100px;
                        margin-bottom: 20px;
                    }
                    .base__name {
                        margin-bottom: 10px;
                        font-size: 22px;
                        font-weight: 800;
                        color: rgb(113, 191, 255);
                        text-align: center;
                        word-wrap: break-word;
                    }
                    .base__ingredients {
                        color: rgb(248, 43, 255);
                        font-weight: 600;
                        text-align: center;
                        font-size: 18px;
                    }
                }
        }
        .gen__generate {
            background-color: rgb(80, 80, 80);
            font-size: 22px;
            font-weight: 800;
            color: rgb(113, 191, 255);
            width: 30%;
            border: 1px solid rgb(117, 117, 117);
            transition: all 0.3s ease;
            padding: 10px ;
            &:hover {
                background-color: rgb(104, 104, 104);
                border: 0;
                border: 1px solid rgb(93, 182, 255);
                color: rgb(0, 0, 0);
                text-shadow: 0px 0px 4px rgba(255, 255, 255, 1);
                -webkit-box-shadow: inset 0px -51px 44px -45px rgb(0, 140, 255);
                -moz-box-shadow: inset 0px -51px 44px -45px rgb(0, 140, 255);
                box-shadow: inset 0px -51px 44px -45px rgb(0, 140, 255);
            }
        }
    }
}
</style>