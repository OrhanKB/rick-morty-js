 import {renderCharacters} from "../characters.js";
 import { urlString, getCharacters } from "./state.js";
 
const paginationDiv = document.querySelector(".pagination");

export function renderPagination() {
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
    const forwardBtn = document.querySelector(".js-forward-button");
    const currentPageBtn = document.querySelector(".js-current-page")

    prevBtn.style.display = currentPage > firstPage ? "flex" : "none" ;
    firstPageBtn.style.display = currentPage > firstPage ? "flex" : "none" ;
    prevPageBtn.style.display = currentPage - firstPage > 1 ? "flex" : "none" ;
    prevEpBtn.style.display = currentPage - firstPage > 2 ? "flex" : "none" ;
    nextEpBtn.style.display = currentPage >= lastPage - 2 ? "none" : "flex"
    nextPageBtn.style.display = isNaN(nextPageInt) ? "none" : "flex" ;
    forwardBtn.style.display = currentPage === lastPage ? "none" : "flex";

    if(currentPage - lastPage === 0) {
        lastPageBtn.style.display = "none"
    } else if(nextPageInt - lastPage === 0) {
        lastPageBtn.style.display = "none"
    }
    nextEpBtn.disabled = true;
    prevEpBtn.disabled = true;
    currentPageBtn.setAttribute("style", "background-color: gray")
}

let currentNumber = [];
async function paginationButtonClick(event) {

    const target = event.target;
    const num = Number(target.innerHTML);

   if(!isNaN(num)) {
        currentNumber.push(num);
        if(currentNumber.length > 1) {
            currentNumber.shift();
        }
   }
   
   currentNumber.length === 0  ? currentNumber.push(1) : [];
   
   const baseUrl = urlString.urlOutside.split("?")[0];
   const queryStrings = urlString.urlOutside.split("?")[1];
   const params = new URLSearchParams(queryStrings);
   params.has("page") ? params.set("page", num) : params.append("page", num)
   urlString.urlOutside = `${baseUrl}?${params}`
   
   if(event.target.innerHTML === "&gt;") {
    params.has("page") ? params.set("page", currentNumber[0] += 1) : params.append("page", currentNumber[0] += 1);
    urlString.urlOutside = `${baseUrl}?${params}`
   }   
   else if(event.target.innerHTML === "&lt;") {
    params.has("page") ? params.set("page", currentNumber[0] -= 1) : params.append("page", currentNumber[0] -= 1);
    urlString.urlOutside = `${baseUrl}?${params}`
   }
    urlString.data = await getCharacters()
    renderCharacters();
    renderPagination();
    window.scrollTo(0,0);    
}

function setupEventListeners() {
    paginationDiv.addEventListener("click", paginationButtonClick) 

}

setupEventListeners();
renderPagination();

