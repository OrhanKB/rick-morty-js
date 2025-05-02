import { urlString } from "./data/state.js";
//import { characters } from "./data/characterDetails.js";

const parseCharacterDetails = JSON.parse(localStorage.getItem("matchedId"));

function renderCharacterDetails() {
    let detailCardHtml;

    detailCardHtml = `
        <div class="row d-flex g-5  text-light mx-auto" style="max-width: fit-content">
            <div class="col-auto">
                <img style="height: 407px; width: 375px;" class="rounded" src="${parseCharacterDetails.image}" alt="">
            </div>

            <div class="col-auto d-inline-block" style="font-family: 'Times New Roman', Times, serif;
               padding: 60px;padding-left: 0px; max-width: 570px">

                <h1 style="font-weight: 600;">${parseCharacterDetails.name}</h1>

                <div class="row informations mx-auto" style="max-width: fit-content">

                    <h5 class="text-secondary mt-3 mb-4 w-100">Informations</h5>

                    <div class="col-md-6 ">
                        <p class="status-head">Status</p>
                        <p class="status-input">${parseCharacterDetails.status}</p>
                    </div>
                    <div class="col-md-6">
                        <p class="status-head">Gender</p>
                        <p class="status-input">${parseCharacterDetails.gender}</p>
                    </div>
 
                <div class="w-100"></div>

                <div  class="col-md-6">
                    <p class="status-head">Species</p>
                    <p class="status-input">${parseCharacterDetails.species}</p>
                </div>
                <div  class="col-md-6 ">
                    <p class="status-head">Origin</p>
                    <p class="status-input">${parseCharacterDetails.origin.name}</p>
                </div>

                <div class="w-100"></div>

                <div class="col-md-6 ">
                    <p class="status-head">Location</p>
                    <p class="status-input">${parseCharacterDetails.location.name}</p>
                </div>
                <div  class="col-md-6 ">
                    <p class="status-head">Type</p>
                    <p class="status-input">${parseCharacterDetails.type === "" ? "-" : parseCharacterDetails.type}</p>
                </div>      
                </div>
            </div>
        </div>
    `
    document.querySelector(".detail-container").innerHTML = detailCardHtml

}

renderCharacterDetails();



const parsedOtherCharactersData = JSON.parse(localStorage.getItem("otherCharactersData"));

/* function renderOtherCharacters() {
    let otherCharactersHtml = ``

    parsedOtherCharactersData.forEach((character) => {

        otherCharactersHtml =  otherCharactersHtml += `
            <div class="col-sm-4 mb-3<!--d-flex justify-content-center -->">
                <img class="details-img rounded-circle mx-2" src="${character.image}" alt="">
                <div class="details">
                    <p class="details-name" w-100>${character.name}</p>
                    <p class="details-location">${character.location.name}</p>
                    <p class="details-species">${character.species}/${character.gender}</p>
                </div>
                <a class="d-flex align-items-center" href=""><img class="details-arrow" src="/public/arrow-89-24.png" alt=""> </a>
            </div>
        `
    })
    document.querySelector(".other-characters-row").innerHTML = otherCharactersHtml;
}

renderOtherCharacters(); */

function renderOtherCharacters() {
    let otherCharactersHtml = ``;

    parsedOtherCharactersData.forEach((character) => {
        console.log("character:", character)
        otherCharactersHtml += `
            <div class="col-sm-4 mb-3"> <!-- Parent column (controls width) -->
                <div class="d-flex align-items-center overflow-hidden text-nowrap p-2 rounded"> <!-- Flex container for content -->
                    <img class="details-img rounded-circle me-2" src="${character.image}" alt="${character.name}"  object-fit: cover;">
                    <div class="details flex-grow-1 overflow-hidden"> <!-- Forces text to respect parent width -->
                        <p class="details-name mb-1 text-truncate">${character.name}</p>
                        <p class="details-location mb-1 text-truncate">${character.location.name}</p>
                        <p class="details-species text-truncate">${character.species}/${character.gender}</p>
                    </div>
                    <a class="ms-2 d-flex align-items-center" href="#">
                        <img class="details-arrow" src="/public/arrow-89-24.png" alt="View" width="16">
                    </a>
                </div>
            </div>
        `;
    });

    document.querySelector(".other-characters-row").innerHTML = otherCharactersHtml;
}

renderOtherCharacters();





