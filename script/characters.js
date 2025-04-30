import { getCharacters, urlString } from "./data/state.js";
import "./data/getCharacters.js"



export function renderCharacters() {

    let cardHTML = ``;
    
    urlString.data.results.forEach((character) => {

        function characterStatus(character) {
        return  character.status === "Alive" ? "../public/activity.png" : "../public/icons8-skull-50.png";    
        }

        cardHTML = cardHTML+= `
        <div class=" col-sm-4 ">
              <div class="card h-100 cart-html" style="width: 18rem; height: 22rem;cursor: pointer" data-cart-id="${character.id}">
                  <span id="favorite-${character.id}" class="favorite position-absolute end-0 mt-4 px-4"><img src="/public/icons8-heart-32.png" alt=""></span>
                  <img class="card-img-top p-2" src="${character.image}" alt="Card image cap">
                  <div class="card-body p-2">
                    <h6 class="card-title">${character.name}</h6>
                    <div class="character-status">
                <p class="m-1"><span class="activity"><img class="alive-dead" src="${characterStatus(character)}" alt=""></span> ${character.status}</p>
                <p class="m-1"><span class="entity"><img src="/public/icons8-alien-50.png" alt=""></span>${character.species}</p>  
                </div>
            </div>
        </div>
</div>
        `;

    })
        document.querySelector(".js-characters").innerHTML = cardHTML;
    }

     
    renderCharacters();


    
