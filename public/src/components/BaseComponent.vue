<template>
    <div class="base">
        <img class="base__bg" src="../assets/bg-base.webp" alt="base icon">
        <div class="base__container">
            <div class="base__base">
                <div class="base__loading" v-if="dataLoading == true">
                    <div>
                        <img src="../assets/cocktail-logo.webp" alt="loading">
                    </div>
                </div>
                <div v-else-if="cocktails.length < 1" class="base__titlecontainer">
                    <h1>Add some kind of cocktail</h1>
                </div>
                <div v-else class="base__grid">
                    <div v-for="(el, i) in cocktails" :key="el._id" class="base__item">
                        <img :src="el.img" alt="icon">
                        <h2 class="base__name">{{ el.name }}</h2>
                        <p class="base__ingredients">{{ el.ingredients }}</p>
                        <button @click="deleteCocktail(el, i)" class="base__close">&#x2A2F;</button>
                        <button :class="{base__favorite: !el.favourite, base__addfavourite: el.favourite}" @click="addToFavourite(el)">&#x2764;</button>
                        <button class="base__storybutton" @click="openStory(el)">&#10022;</button>
                        <div v-if="el.handleStory == true" class="base__overflow">
                            <div class="base__story">
                                <p class="base__nullstory" v-if="el.story == ''">Add your cocktail to your favourites and write your story</p>
                                <p v-else class="base__storytext">{{ el.story }}</p>
                                <button @click="openStory(el)" class="base__close">&#x2A2F;</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="base__decoration"></div>
            <div class="base__add">
                <div class="base__findcont">
                    <input v-model="findText" class="base__find" type="text">
                    <button @click="findCocktail">Find</button>
                    <button @click="resetCocktails">Reset</button>
                </div>
                <center>
                    <img class="base__profimg" v-if="selectImg == 0" src="/images/cocktail1.png" alt="cocktail ico">
                    <img class="base__profimg" v-else-if="selectImg == '/images/cocktail1.png'" src="/images/cocktail1.png" alt="cocktail ico">
                    <img class="base__profimg" v-else-if="selectImg == '/images/cocktail2.png'" src="/images/cocktail2.png" alt="cocktail ico">
                    <img class="base__profimg" v-else-if="selectImg == '/images/cocktail3.png'" src="/images/cocktail3.png" alt="cocktail ico">
                    <img class="base__profimg" v-else-if="selectImg == '/images/cocktail4.png'" src="/images/cocktail4.png" alt="cocktail ico">
                    <img class="base__profimg" v-else-if="selectImg == '/images/cocktail5.png'" src="/images/cocktail5.png" alt="cocktail ico">
                    <img class="base__profimg" v-else-if="selectImg == '/images/cocktail6.png'" src="/images/cocktail6.png" alt="cocktail ico">
                    <img class="base__profimg" v-else-if="selectImg == '/images/cocktail7.png'" src="/images/cocktail7.png" alt="cocktail ico">
                    <img class="base__profimg" v-else-if="selectImg == '/images/cocktail8.png'" src="/images/cocktail8.png" alt="cocktail ico">
                </center>
                <form @submit.prevent="addCocktail">
                    <!-- @submit.prevent="addCocktail" -->
                    <label for="name">Enter cocktail name</label>
                    <input required maxlength="20" v-model="enterName" type="text" name="name" placeholder="Enter name...">
                    <div class="base__valid">
                        <label for="ingr">Enter cocktail ingredients</label>
                        <div>
                            <button type="button">?</button>
                            <p class="base__validinfo">Write Format: -ingredent-ingredient-...</p>
                        </div>
                    </div>
                    <input required v-model="enterIngr" type="text" name="ingr" placeholder="Enter ingredients...">
                    <select name="img" v-model="selectImg">
                        <option value="/images/cocktail1.png">1</option>
                        <option value="/images/cocktail2.png">2</option>
                        <option value="/images/cocktail3.png">3</option>
                        <option value="/images/cocktail4.png">4</option>
                        <option value="/images/cocktail5.png">5</option>
                        <option value="/images/cocktail6.png">6</option>
                        <option value="/images/cocktail7.png">7</option>
                        <option value="/images/cocktail8.png">8</option>
                    </select>
                    <button class="base__addbutton" type="submit">Add</button>
                    <!-- @click="addCocktail" -->
                </form>
            </div>
        </div>
    </div>
</template>
<script>
// import axios from 'axios'
import apiClient from '@/services/api';

    export default {
        name: "BaseComponent",
        data() {
            return {
                cocktails: [],
                selectImg: "/images/cocktail1.png",
                enterName: "",
                enterIngr: "",
                findText: "",
                handleStory: "",
                dataLoading: true
            }
        },
        methods: {
            openStory(el) {
                el.handleStory = !el.handleStory
            },
            async addToFavourite(el) {
                try {
                    el.favourite = !el.favourite
                    await apiClient.put(`/api/favourite/favourite-upd/${el._id}`, {favourite: el.favourite})
                } catch (err) {
                    console.log(err)
                }
            },
            async findCocktail() {
                let result = await apiClient.get('/api/' + this.findText)
                console.log(result.data);
                this.cocktails = result.data
            },
            async resetCocktails() {
                try {
                    this.findText = "";
                    const result = await apiClient.get("/api/base");
                    this.cocktails = result.data;
                } catch (err) {
                    console.log(err);
                }
            },
            async addCocktail() {
            try {
                const newCocktail = {
                    name: this.enterName,
                    img: this.selectImg,
                    ingredients: this.enterIngr,
                    favourite: false,
                    story: ""
                };
                const url = `/api/add`;
                const response = await apiClient.post(url, null, { params: newCocktail });
                this.cocktails.push(response.data);

                this.enterName = '';
                this.selectImg = '/images/cocktail1.png';
                this.enterIngr = '';
            } catch (err) {
                console.log(err);
            }
        },
            async deleteCocktail(element, index) {
            try {
                await apiClient.delete('/api/' + element._id);
                this.cocktails.splice(index, 1);
            } catch (err) {
                console.log(err);
            }
        },
        },
        async mounted() {
            try {
                const result = await apiClient.get("/api/base")
                console.log(result);
                this.cocktails = result.data
            } catch (err) {
                console.log(err);
            } finally {
                this.dataLoading = false
            }
        }
    }
</script>
<style lang="scss" scoped>
.base {
    position: relative;
    .base__bg {
        position: absolute;
        width: 100%;
        height: calc(100vh - 142px);
        object-fit: cover;
        z-index: 1;
    }
    .base__container {
        z-index: 2;
        position: relative;
        max-height: 785px;
        max-width: 1630px;
        margin: 0 auto;
        display: flex;
        gap: 20px;
        padding: 30px 0px;
        .base__base {
            width: 65%;
            padding: 15px;
            height: 100%;
            @media (max-width: 850px) {
                width: 50%;
            }
            .base__loading {
                width: 100%;
                height: 685px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                > div {
                    
                    img {
                    border: 2px solid rgb(113, 191, 255);
                    width: 50px;
                    height: 50px;
                    border-radius: 10px;
                    background-color: rgb(113, 191, 255);
                    animation: loadAnimation infinite 2s alternate;
                    }
                }
                @keyframes loadAnimation {
                    0% {
                        transform: rotate(0deg) scale(1);
                        border-radius: 50%;
                    } 50% {
                        transform: rotate(360deg) scale(1.5);
                        border-radius: 5px;
                    }
                }
            }
            .base__titlecontainer {
                width: 100%;
                h1 {
                    text-align: center;
                    font-size: 50px;
                    font-weight: 800;
                    -webkit-text-stroke: 1px rgb(255, 255, 255);
                    color: rgb(0, 0, 0);
                    @media (max-width: 750px) {
                        font-size: 40px;
                    }
                }
            }
            .base__grid {
                padding-right: 5px;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 30px;
                justify-content: start;
                max-height: 665px;
                overflow: auto;
                &::-webkit-scrollbar {
                    width: 1px;
                }
                &::-webkit-scrollbar-thumb {
                    background-color: rgb(64, 123, 172);
                }
                .base__item {
                    border-radius: 5px;
                    background-color: rgb(80, 80, 80);
                    padding: 20px;
                    color: black;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                    .base__storybutton {
                        background-color: unset;
                        color: aquamarine;
                        font-size: 25px;
                        position: absolute;
                        bottom: 5px;
                        left: 10px;
                        transition: all 0.15s ease;
                        &:hover {
                            color: rgb(0, 255, 170);
                            transform: scale(1.1);
                        }
                        &:active {
                            transform: scale(1.3);
                            color: aqua;
                        }
                    }
                    .base__overflow {
                        position: fixed;
                        width: 100%;
                        height: 100vh;
                        z-index: 1000;
                        top: 0;
                        left: 0;
                        background-color: rgba(35, 35, 54, 0.76);
                        .base__story {
                            padding: 30px;
                            background-color: rgb(80, 80, 80);
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translateX(-50%) translateY(-50%);
                            max-width: 500px;
                            max-height: 400px;
                            .base__nullstory {
                                color: antiquewhite;
                                font-size: 22px;
                                font-weight: 800;
                            }
                            .base__storytext {
                                color: antiquewhite;
                                font-size: 18px;
                                font-weight: 800;
                            }
                        }
                    }
                    .base__close {
                        background-color: unset;
                        font-size: 25px;
                        color: wheat;
                        position: absolute;
                        top: 5px;
                        right: 10px;
                        &:hover {
                            transform: scale(1.1);
                        }
                        &:active {
                            transform: scale(1.3);
                            color: rgb(255, 155, 24);
                        }
                    }
                    .base__favorite {
                        background-color: unset;
                        font-size: 20px;
                        color: rgb(136, 136, 136);
                        position: absolute;
                        top: 8px;
                        left: 13px;
                        transition: all 0.15s ease;
                        &:hover {
                            color: rgb(228, 211, 180);
                            transform: scale(1.1);
                        }
                        &:active {
                            transform: scale(1.3);
                            color: rgb(252, 61, 99);
                        }
                    }
                    .base__addfavourite {
                        background-color: unset;
                        font-size: 20px;
                        color: rgb(252, 61, 99);
                        position: absolute;
                        top: 8px;
                        left: 13px;
                        transition: all 0.15s ease;
                        &:hover {
                            color: crimson;
                            transform: scale(1.1);
                        }
                        &:active {
                            transform: scale(1.3);
                            color: rgb(136, 136, 136);
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
        }
        .base__decoration {
            height: calc(100vh - 202px);
            border-right: 1px solid rgb(64, 123, 172);
            width: 1%;
            
        }
        .base__add {
            border-radius: 5px;
            width: 30%;
            padding: 30px;
            align-self: flex-end;
            height: 725px;
            display: flex;
            flex-direction: column;
            background-color: rgb(80, 80, 80);
            @media (max-width: 850px) {
                width: 45%;
            }
            .base__findcont {
                display: flex;
                gap: 10px;
                width: 100%;
                align-items: center;
                margin-bottom: auto;
                .base__find {
                    width: 100%;
                    background-color: unset;
                    border-bottom: 1px solid rgb(64, 123, 172);
                    font-size: 20px;
                    color: rgb(248, 43, 255);
                    padding: 0px 5px 3px 5px;
                    caret-color: rgb(64, 123, 172);
                }
                button {
                    background-color: rgb(80, 80, 80);
                    font-size: 22px;
                    font-weight: 800;
                    color: rgb(113, 191, 255);
                    width: 30%;
                    border: 1px solid rgb(117, 117, 117);
                    transition: all 0.3s ease;
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
            .base__profimg {
                width: 200px;
                margin-bottom: 50px;

            }
            form {
                display: flex;
                flex-direction: column;
                position: relative;
                height: 300px;
                .base__valid {
                    // -------------------------------------------------------------+++++++++
                    position: relative;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    >div {
                        button {
                        background-color: unset;
                        font-size: 20px;
                        color: antiquewhite;
                        border: 1px solid antiquewhite;
                        padding: 0px 7px;
                        border-radius: 50%;
                        transition: all 0.1s ease;
                        margin-top: -10px;
                        }
                        &:hover .base__validinfo {
                                visibility: visible;
                        }
                    .base__validinfo {
                        visibility: hidden;
                        font-size: 15px;
                        color: antiquewhite;
                        background-color: rgba(104, 104, 104, 0.836);
                        padding: 10px;
                        position: absolute;
                        left: 90%;
                        bottom: 140%;
                    }
                    }
                }
                label {
                    font-size: 25px;
                    color: rgb(113, 191, 255);
                    margin-bottom: 10px;
                    @media (max-width: 1110px) {
                        font-size: 18px;
                    }
                }
                input {
                    background-color: unset;
                    border-bottom: 1px solid rgb(64, 123, 172);
                    margin-bottom: 40px;
                    font-size: 20px;
                    color: rgb(248, 43, 255);
                    padding: 0px 5px 3px 5px;
                    caret-color: rgb(64, 123, 172);
                }
                select {
                    background-color: rgb(80, 80, 80);

                    color: rgb(248, 43, 255);
                    border-bottom: 1px solid rgb(64, 123, 172);
                    margin-bottom: 40px;
                    font-size: 20px;
                }
                .base__addbutton {
                    background-color: rgb(80, 80, 80);
                    font-size: 22px;
                    font-weight: 800;
                    color: rgb(113, 191, 255);
                    padding: 10px;
                    width: 100%;
                    border: 1px solid rgb(117, 117, 117);
                    transition: all 0.3s ease;
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
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
    }
}
</style>

