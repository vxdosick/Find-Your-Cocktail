<template>
  <div class="app">
    <header>
      <div class="header__container">
        <nav class="header__menu">
          <ul>
            <li class="border__decor" ><a class="border__decor" href="#/">Home</a></li>
            <li><a href="#/base">Base</a></li>
            <li><a class="header__logo" href="#/"><img src="./assets/cocktail-logo.webp" alt="header logo"></a></li>
            <li><a href="#/favourite">Favourite</a></li>
            <li class="border__decorright" ><a class="border__decorright" href="#/generator">Generator</a></li>
          </ul>
        </nav>
      </div>
    </header>
    <main>
        <router-view></router-view>
    </main>
    <footer></footer>
  </div>
</template>
<script>
  export default {
    name: "App"
  }
</script>
<style lang="scss">
*{
	padding: 0;
	margin: 0;
	border: 0;
}
*, *:before, *:after{
	-moz-box-sizing: border-box;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}
:focus, :active{outline: none;}
a:focus, a:active{outline: none;}

nav,footer,header,aside{display: block;}

html, body{
	height: 100%;
	width: 100%;
	font-style: 100%;
	line-height: 1;
	font-size: 14px;
	-ms-text-size-adjust: 100%;
	-moz-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
	font-family: "Roboto", sans-serif;
}

input, button, textarea{font-family: inherit;}

input::-ms-clear{display:none;}
button{cursor: pointer;}
button::-moz-focus-inner{padding: 0;border: 0;}
a, a:visited{text-decoration: none;}
a:hover{text-decoration: none;}
ul li{list-style-type: none;}
img{vertical-align: top;}
html {
    scroll-behavior: smooth;
}
a {
  color: rgb(206, 206, 206);
}
h1,h2, h3, h4, h5, h6{font-weight: 400;}
/*---------------------*/
  .app {
    width: 100%;
    height: 100vh;
    background-color: rgb(27, 27, 27);
    color: rgb(206, 206, 206);
    font-family: "Ubuntu Sans Mono", monospace;
    header  {
      width: 100%;
      padding: 20px 0px;
      border-bottom: 2px solid rgb(64, 123, 172);
      .header__container {
        max-width: 1630px;
        padding: 0px 15px;
        margin: 0 auto;
        .header__menu ul {
          .border__decor {
            border-radius: 10px 0px 0px 10px;
          }
          .border__decorright {
            border-radius: 0px 10px 10px 0px;
          }
          display: flex;
          align-items: center;
          justify-content: space-between;
          a:not(.header__logo) {
            color: rgb(32, 32, 32);
            font-weight: 800;
            display: block;
            width: 100%;
            transition: all 0.3s ease;
            border: 1px solid rgb(117, 117, 117);
            &:hover {
              background-color: rgb(104, 104, 104);
              border: 0;
              border: 1px solid rgb(93, 182, 255);
              color: rgb(0, 0, 0);
              text-shadow: 0px 0px 4px rgba(255, 255, 255, 1);
              font-size: 28px;
              -webkit-box-shadow: inset 0px -51px 44px -45px rgb(0, 140, 255);
              -moz-box-shadow: inset 0px -51px 44px -45px rgb(0, 140, 255);
              box-shadow: inset 0px -51px 44px -45px rgb(0, 140, 255);
              transform: scale(1.02);
            }
            @media (max-width: 800px) {
              font-size: 18px;
            }
          }
          .header__logo {
            transition: all 0.3s ease;
            &:hover {
              transform: scale(1.15);
            }
             img {
              width: 100px;
              border-radius: 50%;

            }
          }
          li {
            font-size: 25px;
            text-align: center;
            line-height: 250%;
          }
          li:first-child, li:nth-child(2), li:nth-child(4), li:nth-child(5) {
            background-color: rgb(80, 80, 80);
            flex: 1;
          }
          li:nth-child(3) {
            flex: 1;
            display: flex;
            justify-content: center;
          }
        }
      }
    }
    main {
      position: relative;
    }
  }
</style>