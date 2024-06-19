"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.MONGO = void 0;
// export const MONGO = "mongodb://127.0.0.1:27017/FindYourCocktail?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.6"
exports.MONGO = 'mongodb+srv://vxdosick:AAA003Sq@cluster0.sodpfvn.mongodb.net/FindYourCocktail?retryWrites=true&w=majority';
exports.PORT = process.env.PORT || 3000;
