import { homePage } from "../../pages/homePage.js"
import { charactersPage } from "../../pages/charactersPage.js"
import {characterDetailsPage } from "../../pages/characterDetailPage.js"
import { favoritesPage } from "../../pages/favoritesPage.js"


export const routerConfig = {
    "/script/": homePage,
    "/script/character": charactersPage,
    "/script/character/:id": characterDetailsPage,
    "/script/favorites":  favoritesPage,
    "*": homePage
}