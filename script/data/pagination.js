 import {urlString , getCharacters} from "./getCharacters.js";
import { renderCharacters } from "../characters.js";

const paginationDiv = document.querySelector(".pagination");

function renderPagination() {
    const totalPage = urlString.data.info.pages;
    const lastPage = totalPage;
    const firstPage = 1;

    let nextString = urlString.data.info.next !== null ? urlString.data.info.next.split("")
    .filter(chars => /^\d$/.test(chars)) : [] ;
    const nextPageInt = !isNaN(parseInt(nextString.join(""))) ? parseInt(nextString.join("")) : NaN;

    let prevString = urlString.data.info.prev !== null ? urlString.data.info.prev.split("")
    .filter(chars => /^\d$/.test(chars)): [] ;
    const prevPageInt = !isNaN(parseInt(prevString.join(""))) ? parseInt(prevString.join("")) : NaN;
    
    const currentPage = !isNaN(nextPageInt) ? nextPageInt - 1 : prevPageInt + 1;

     paginationDiv.innerHTML = `
                <button class="js-prev-button">&lt;</button>

                <button class="js-first-page">${firstPage}</button>
                <button class="js-prev-ellipsis">...</button>

                <button class="js-prev-page">${prevPageInt}</button>
                <button class="js-current-page">${currentPage}</button>
                <button class="js-next-page">${nextPageInt}</button>

                <button class="js-next-ellipsis" >...</button>
                <button class="js-last-page">${lastPage}</button>

                <button class="js-forward-button">&gt;</button>

    `
    const prevBtn = document.querySelector(".js-prev-button");
    const firstPageBtn = document.querySelector(".js-first-page");
    const prevEpBtn = document.querySelector(".js-prev-ellipsis");
    const prevPageBtn = document.querySelector(".js-prev-page");
    const nextPageBtn = document.querySelector(".js-next-page");
    const nextEpBtn = document.querySelector(".js-next-ellipsis");
    const lastPageBtn = document.querySelector(".js-last-page");

    prevBtn.style.display = currentPage > firstPage ? "flex" : "none" ;
    firstPageBtn.style.display = currentPage > firstPage ? "flex" : "none" ;
    prevPageBtn.style.display = currentPage - firstPage > 1 ? "flex" : "none" ;
    prevEpBtn.style.display = currentPage - firstPage > 2 ? "flex" : "none" ;
    nextEpBtn.style.display = currentPage >= lastPage - 2 ? "none" : "flex"
    nextPageBtn.style.display = isNaN(nextPageInt) ? "none" : "flex" ;
    lastPageBtn.style.display = lastPage === nextPageInt ? "none" : "flex";
    
}

async function paginationButtonClick(event) {
    const target = event.target;
    const num = target.innerHTML;
   urlString.urlOutside = `https://rickandmortyapi.com/api/character?page=${num}`
    
    num === "&gt;" ? urlString.urlOutside = `https://rickandmortyapi.com/api/character?page=${num + 1}` : [];

   
   urlString.data = await getCharacters();
   
   renderCharacters();
   renderPagination();
}

function setupEventListeners() {
    paginationDiv.addEventListener("click", paginationButtonClick) 
}

setupEventListeners();
renderPagination();

