<template>
    <div class="wrapper">
        <img class="fav__background" src="../assets/bg-fav.webp" alt="background">
        <div class="fav">
            <div class="base__loading" v-if="dataLoading == true">
                    <div>
                        <img src="../assets/cocktail-logo.webp" alt="loading">
                    </div>
                </div>
            <div v-else-if="favourite.length < 1" class="fav__titlecontainer">
                <h1 class="fav__titlehero">Add something to your favourites</h1>
            </div>
            <div v-else class="fav__grid">
                <div v-for="(el, i) in favourite" :key="el._id" class="base__item">
                    <img :src="el.img" alt="icon">
                    <h2 class="base__name">{{ el.name }}</h2>
                    <p class="base__ingredients">{{ el.ingredients }}</p>
                    <div class="fav__story">
                        <textarea v-if="el.story === ''" v-model="el.storyText" placeholder="Write your own fascinating story..."></textarea>
                        <p v-else>{{ el.story }}</p>
                    </div>
                    <button :class="{base__favorite: !el.favourite, base__addfavourite: el.favourite}" @click="addToFavourite(el, i)">&#x2764;</button>
                    <div class="fav__buttons">
                        <button @click="deleteStory(el)">Delete &#x2A2F;</button>
                        <button @click="addStory(el)">Add +</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import axios from 'axios';
import apiClient from '@/services/api';

export default {
    name: "FavouriteComponent",
    data() {
        return {
            favourite: [],
            dataLoading: true
        }
    },
    methods: {
        async deleteStory(el) {
            el.story = ""
            el.storyText = ""
            await apiClient.put(`/api/favourite/favourite-story/${el._id}`, { story: el.story })
        },
        async addStory(el) {
            el.story = el.storyText
            await apiClient.put(`/api/favourite/favourite-story/${el._id}`, { story: el.story })
        },
        async addToFavourite(el, i) {
            el.favourite = !el.favourite
            await apiClient.put(`/api/favourite/favourite-upd/${el._id}`, { favourite: el.favourite })
            if (!el.favourite) {
                this.favourite.splice(i, 1)
            }
        },
        async deleteCocktail(el, i) {
            await apiClient.delete(`/api/favourite/favourite-del/${el._id}`)
            this.favourite.splice(i, 1)
        }
    },
    async mounted() {
        try {
            const result = await apiClient.get("/api/favourite/favourite")
            this.favourite = result.data.map(item => ({ ...item, storyText: '' }))
            console.log(this.favourite);
            console.log(result.data);
        } catch (err) {
            console.log(err);
        } finally {
            this.dataLoading = false
        }
    }
}
</script>
<style lang="scss" scoped>
    .wrapper {
        position: relative;
        .fav__background {
            position: absolute;
            width: 100%;
            height: calc(100vh - 142px);
            object-fit: cover;
            z-index: 1;
        }
        .fav {
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
            position: relative;
            z-index: 2;
            max-height: 785px;
            max-width: 1630px;
            margin: 0 auto;
            padding: 50px 15px;
            display: flex;
            .fav__titlecontainer {
                height: calc(100vh - 284px);
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                .fav__titlehero {
                    text-align: center;
                    font-size: 50px;
                    font-weight: 800;
                    -webkit-text-stroke: 1px rgb(255, 255, 255);
                    color: rgb(0, 0, 0);
            }
            }
            .fav__titlehero {
                text-align: center;
                font-size: 50px;
                font-weight: 800;
            }
            .fav__grid {
                width: 100%;
                justify-content: center;
                padding-right: 5px;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 400px));
                gap: 30px;
                overflow: auto;
                max-height: 685px;
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
                    .fav__story {
                        width: 100%;
                        padding: 10px;
                        border: 1px solid antiquewhite;
                        &::-webkit-scrollbar {
                            width: 1px;
                        }
                        &::-webkit-scrollbar-thumb {
                            background-color: antiquewhite;
                        }
                        p {
                            word-break: break-all;
                        }
                        textarea {
                            width: 100%;
                            height: 100%;
                            resize: none;
                            background-color: unset;
                            color: antiquewhite;
                            font-size: 15px;
                            &::placeholder {
                                font-size: 15px;
                                color: rgb(207, 194, 177);
                            }
                            &::-webkit-scrollbar {
                                width: 1px;
                            }
                            &::-webkit-scrollbar-thumb {
                                background-color: antiquewhite;
                            }
                            }
                    }
                    .fav__buttons {
                        display: flex;
                        align-items: center;
                        margin-top: 20px;
                        width: 100%;
                        gap: 2%;
                        button {
                            border-radius: 5px;
                            width: 49%;
                            background-color: unset;
                            color: antiquewhite;
                            font-weight: 800;
                            font-size: 16px;
                            border: 1px solid antiquewhite;
                            height: 30px;
                            transition: all 0.4s ease;
                            &:hover {
                                color: black;
                                border: 1px solid black;
                                background-color: antiquewhite;
                            }
                        }
                    }
                    .fav__story {
                        height: 100px;
                        font-size: 15px;
                        color: antiquewhite;
                        font-weight: 800;
                        overflow: auto;
                        padding-right: 5px;
                        &::-webkit-scrollbar {
                            width: 1px;
                        }
                        &::-webkit-scrollbar-thumb {
                            background-color: rgb(64, 123, 172);
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
                        margin-bottom: 20px;
                    }
                }
            }
        }
    }
</style>