import { router } from "../data/route.js";


export const createCharacterCard = (character) => {
    const card = document.createElement("div");
    card.className = "col-xl-4 col-xxxl-3 mb-3";

    card.innerHTML = `
    <div class="card" data-cart-id="${character.id}" data-route="${router.buildUrl({}, character.id)}">
            <span id="favorite-${character.id}" class="favorite position-absolute end-0 mt-4 px-4">
                <img src="/public/icons8-heart-32.png" alt="">
            </span>
            <img class="card-img-top p-2" src="${character.image}" alt="Card image cap">
            <div class="card-body p-2">
                <h6 class="card-title">${character.name}</h6>
                <div class="character-status">
                    <p class="m-1">
                        <span class="activity">
                            <img class="alive-dead" alt="">
                        </span> 
                        ${character.status.toLowerCase()}
                    </p>
                    <p class="m-1">
                        <span class="entity">
                            <img src="/public/icons8-alien-50.png" alt="">
                        </span>
                        ${character.species}
                    </p>  
                </div>
            </div>
        </div>
    `

    return card;
}