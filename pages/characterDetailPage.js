import { renderCharacterDetail } from "../script/components/characterDetail.js";
import { createOtherCharacters } from "../script/components/otherCharacters.js";

let state = {
    character: null
}

const loadCharacter = async () => {
    try {
        // Use hash for routing
        const path = window.location.hash.slice(1) || '/';
        const response = await fetch(`https://rickandmortyapi.com/api${path}`);
        const character = await response.json();
        
        state.character = character;
        
        return true;
    } catch(error) {
        console.log("error:", error);
        return false;
    }
}

const renderCharacterDetailPage = async () => {
    const loaded = await loadCharacter();

    if(!loaded) {
        return `<div>Failed to load character</div>`;
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
    </header>
    <!--HEADER NAV-->

    <!--MAIN STATUS-->
    <div class="container mt-5 detail-container justify-content-center character">
        
    </div>
    <!--MAIN STATUS-->

    
    <!--OTHER CHARACTERS-->
    
        <div class="container-characters"> 
            <h5 class="text-white mb-4">Other Characters</h5>
            <div class="characters-grid"> 
                <!-- JS DIVS HERE -->
            
                <div class="no-data-found">
                    <img src="/public/no-data-found.png" alt="No data">
                </div>
            </div>
        </div>
    `;

    //render characterdetail
    const characterDiv = container.querySelector(".character");
     
    characterDiv.appendChild(renderCharacterDetail(state.character))
    

    //OTHER CHARACTERS 
    const otherCharsElement = await createOtherCharacters(state.character, container);
    const otherCharsDiv = container.querySelector(".container-characters");
    otherCharsDiv.appendChild(otherCharsElement);

    return container;
}

export const characterDetailsPage = () => renderCharacterDetailPage();

