// core/historyStack.js

import {characterDetailEventListener} from "./characterDetails.js";

const existingStack = JSON.parse(sessionStorage.getItem("historyStack")) || [] ;

export function saveState(data) {

    const cssLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
    .map(link => link.href);

    const state = {
        html: document.body.innerHTML,
        scroll: window.scrollY,
        data: structuredClone(data),
        css: cssLinks
    }

    existingStack.push(state)
    sessionStorage.setItem("historyStack", JSON.stringify(existingStack));
}


const containerSelector = ".characters-grid";
const childClassToMatch = "character-card";
    

function rebindEvents() {
    characterDetailEventListener(containerSelector, childClassToMatch)
}


export function restoreState() {
    const historyStackParsed = JSON.parse(sessionStorage.getItem("historyStack")) || [] ;
    console.log("historystackParsed:", historyStackParsed)
    const lastDataValue = historyStackParsed[historyStackParsed.length - 1].data
    const lasthHtmlBody = historyStackParsed[historyStackParsed.length - 1].html;
    const lastCssLinks = historyStackParsed[historyStackParsed.length - 1].css;

    lastCssLinks.forEach((href) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
    })  

    document.body.innerHTML = lasthHtmlBody;
   // historyStackParsed.pop();

   // sessionStorage.setItem("historyStack", JSON.stringify(historyStackParsed));

    rebindEvents()

}


