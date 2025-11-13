import { homePage } from "../../pages/homePage.js"
import { charactersPage } from "../../pages/charactersPage.js"
import {characterDetailsPage } from "../../pages/characterDetailPage.js"
import { favoritesPage } from "../../pages/favoritesPage.js"


export const routerConfig = {
    "/": homePage,
    "/character": charactersPage,
    "/character/:id": characterDetailsPage,
    "/favorites":  favoritesPage,
    "*": homePage
}