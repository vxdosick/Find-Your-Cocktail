<template>
    <img class="main__bg" src="../assets/hero-background.webp" alt="hero-background">
    <div class="main__container">
        <div class="main__hero">
            <div class="main__title">
            <h1>Have you found your cocktail yet?</h1>
        </div>
    </div>
    </div>
</template>
<script>
    export default {
        name: "HomeComponent"
    }
</script>
<style lang="scss" scoped>
    .main__bg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: calc(100vh - 142px);
        object-fit: cover;
        z-index: 0;
    }
    .main__container {
        max-width: 1630px;
        margin: 0 auto;
        z-index: 1;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        .main__hero {
            width: 100%;
            height: calc(100vh - 142px);
            display: flex;
            justify-content: center;
            align-items: center;
            .main__title {
            display: inline-block;
            overflow: hidden;
            border-right: 2px solid rgba(255, 255, 255, 0.75);
            white-space: nowrap;
            margin: 0 auto;
            letter-spacing: 0.15em;
            animation: blink-caret 0.75s step-end infinite;
            margin-left: 40px;
            height: 100px;
            margin-bottom: 100px;
            @media (max-width: 1600px) {
                width: 820px;
                height: 40px;
                animation: blink-caret 0.75s step-end infinite;
                margin: 0 auto;
            }
            @media (max-width: 850px) {
                width: 550px;
                height: 50px;
                animation: blink-caret 0.75s step-end infinite;
                margin: 0 auto;
            }
            h1 {
                color: rgb(255, 255, 255);
                text-align: center;
                line-height: 110%;
                font-size: 80px;
                font-weight: 900;
                -webkit-text-stroke: 2px rgb(0, 0, 0);
                display: inline-block;
                animation: typing 10s steps(40, end) infinite, blink-caret 0.75s step-end infinite;
                white-space: nowrap;
                overflow: hidden; 
                border-right: .15em solid rgb(93, 182, 255);
                @media (max-width: 1600px) {
                    animation: typing 10s steps(40, end) infinite, blink-caret 0.75s step-end infinite;
                    font-size: 40px;
                }
                @media (max-width: 850px) {
                    animation: typing 10s steps(40, end) infinite, blink-caret 0.75s step-end infinite;
                    font-size: 40px;
                    letter-spacing: -6px;
                }
            }
        }
        }
    }
    //------------------------------------------------------------------------------------
    @keyframes typing {
        0% {
          width: 0;
        }
        40% {
          width: 100%;
        }
        60% {
            width: 100%;
        }
        85% {
            width: 0;
        }
        100% {
          width: 0;
        }
    }

    @keyframes blink-caret {
        from, to {
          border-color: transparent;
        }
        50% {
          border-color: rgb(93, 182, 255);
        }
    }
</style>