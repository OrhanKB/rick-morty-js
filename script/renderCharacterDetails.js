
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



function renderOtherCharacters() {
    let otherCharactersHtml = ``;

    if(parsedOtherCharactersData[0] === null) {
        return [];
    }    

    parsedOtherCharactersData.forEach((character) => {
        
        otherCharactersHtml += `      
            <div style = "margin: -15px; " class="col-sm-4 mb-1"> 
                <div class="d-flex align-items-center other-characters-html" data-details-id=${character.id}> 
                    <img class="details-img rounded-circle" src="${character.image}"  alt="${character.name}" object-fit: cover;> 
                    <div class="details  flex-grow-1  overflow-hidden m-3"> 
                        <p class="details-name mb-1">${character.name}</p>
                        <p class="details-location mb-1 ">${character.location.name}</p>
                        <p class="details-species">${character.species}/${character.gender}</p>
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

const noDataFoundDiv = document.querySelector(".no-data-found");

parsedOtherCharactersData.length === 0 ? parsedOtherCharactersData[0] = null :  [] ;
parsedOtherCharactersData[0] === null  ?  noDataFoundDiv.style.opacity = 1 : [] ;

renderOtherCharacters();





