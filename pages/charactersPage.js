import { createCharacterCard } from "../script/components/characterCard.js";
import {createFilterNav} from "../script/components/filterNav.js";
import { renderPagination } from "../script/components/pagination.js";

let state = {
    characters: [],
    currentPage: 1,
    totalPages: 1,
    filters: {
        status: null
    }
}

const loadCharacters = async () => {
    try {
        const hashFull = window.location.hash.slice(1) || '/character';
        const [path, query] = hashFull.includes('?') ? hashFull.split('?') : [hashFull, ''];
        const urlParams = query ? `${path}?${query}` : path;        
        const response = await fetch(`https://rickandmortyapi.com/api${urlParams}`);
        
        const data = await response.json();
        const dataNextParams = data.info.next;
        const dataPrevParams = data.info.prev
        const urlQuery = dataNextParams ? dataNextParams.split("?")[1] : dataPrevParams.split("?")[1];
        const querySearchParams = new URLSearchParams(urlQuery);
        state.currentPage = dataNextParams ? Number(querySearchParams.get("page")) - 1 :
        Number(querySearchParams.get("page")) + 1; 
        
        state.characters = data.results;
        state.totalPages = data.info.pages;
        
        return true
    } catch(error) {      
        console.log("error:", error)
        return false
    }
}

const  renderCharactersPage = async () => {

        const loaded = await loadCharacters();

        if(!loaded) {
            return `<div>Failed to load characters</div>`
        }

        const container = document.createElement("div");

        container.innerHTML = `
        <header class="d-flex flex-column align-items-center">

            <a href="" class="arrow-left position-relative">
                <img src="/public/arrow-89-24.png" alt="">
            </a>
            <a class="border border-black d-flex justify-content-center pt-1" href="#/" data-route="/">
            <img style="width: 160px; height: 50px;" src="/public/logo.png" alt="">
            </a>
            <h2 class="mt-3 text-white">Characters</h2>
            
        </header>

        <main class="mt-5 main">

            <div class="container mt-5"> 
                <div  id="row-div" class="row  d-flex justify-content-center js-characters">
                    
                </div>
            </div>
        </main>

        <!--PAGINATION-->
        <nav class="ml-5 pagination-nav " aria-label="...">
            <ul class="pagination justify-content-center mt-3"> 
                
            </ul>
          </nav>
        <!--PAGINATION-->
        `
        //RENDER CHARACTER CARDS
        const characterContainer = container.querySelector("#row-div");
        if(characterContainer) {
            characterContainer.innerHTML = "";

        state.characters.forEach((character) => {
                const card = createCharacterCard(character);
                characterContainer.appendChild(card)
            });
        };

        //render filterNav
        const insideDiv = container.querySelector(".main");
        insideDiv.prepend(createFilterNav());

        const hashFull = window.location.hash.slice(1) || '/character';
        const query = hashFull.includes('?') ? hashFull.split('?')[1] : '';
        const urlParams = new URLSearchParams(query);
        
        if(urlParams.has("status")) {
            const activeStatus = urlParams.get("status");
            
            const statusBtn = container.querySelector(`[data-route*="${activeStatus}"]`);
            
            if(statusBtn) {
                const statusSpan = statusBtn.children[0];
                statusSpan.style.display = "flex";
            }
            
        }

        //alive-dead images
        const deadAliveImages = container.querySelectorAll(".alive-dead");
        deadAliveImages.forEach((img) => {    
            
            const card = img.closest(".card");  
            const characterId = card.dataset.cartId;
            const character = state.characters.find(c => c.id === parseInt(characterId));
            if(character && character.status === "Alive") {
                img.src = "/public/activity.png"
            } else {
                img.src=  "/public/icons8-skull-50.png"
            }
        });
        
        //pagination render
        const paginationNav = document.createElement("nav");
        const paginationUl = document.createElement("ul");
        paginationNav.className = "ml-5 pagination-nav";
        paginationUl.classList = "pagination justify-content-center mt-3";
        paginationNav.appendChild(paginationUl);
        container.appendChild(paginationNav);
        paginationUl.appendChild(renderPagination(state.currentPage, state.totalPages));
        
        return container
}

export const charactersPage = () => renderCharactersPage()