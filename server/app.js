"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const config_1 = require("./config");
const allItemsRouter_1 = require("./router/allItemsRouter");
const favouriteRouter_1 = require("./router/favouriteRouter");
const generateRouter_1 = require("./router/generateRouter");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: 'https://find-your-cocktail-2.onrender.com',
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
(0, mongoose_1.connect)(config_1.MONGO);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api", allItemsRouter_1.cocktailRouter);
app.use("/api/favourite", favouriteRouter_1.favouriteRouter);
app.use("/api/generate", generateRouter_1.generateRouter);
app.listen(config_1.PORT, () => {
    console.log("Server is running");
});
