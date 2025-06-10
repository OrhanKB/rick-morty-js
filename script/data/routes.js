import { homePage } from "../../pages/homePage.js"
import { charactersPage } from "../../pages/charactersPage.js"
import {characterDetailsPage } from "../../pages/characterDetailPage.js"


export const routerConfig = {
    "/script/": homePage,
    "/script/character": charactersPage,
    "/script/character/:id": characterDetailsPage,
    "/script/locations":  null,
    "/script/favorites":  null,
    "*": homePage
}