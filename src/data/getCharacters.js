let getCharacterAPI = "https://rickandmortyapi.com/api/character";
const divRow = document.querySelector("#row-div")
const aliveBtn = document.querySelector("#alive-btn");
const deadBtn = document.querySelector("#dead-btn");
const unkownBtn = document.querySelector("#unkown-btn");
const allCloseButton = document.querySelectorAll(".close-button");
const closeBtnAlive = document.querySelector(".button-close-alive");
const closeBtnDead = document.querySelector(".button-close-dead");
const closeBtnUnkown = document.querySelector(".button-close-unknown");


//FILTERING
function filterAlive() {
 getCharacterAPI = "https://rickandmortyapi.com/api/character?status=alive"
    fetchCharacterAPI()
    
}

function filterDead() {
    getCharacterAPI = "https://rickandmortyapi.com/api/character?status=dead"
     fetchCharacterAPI()
     
}

function filterUnknown() {
    getCharacterAPI = "https://rickandmortyapi.com/api/character?status=unknown"
    fetchCharacterAPI()
}


aliveBtn.addEventListener("click", () => {
    divRow.innerHTML = ""
    allCloseButton.forEach(button => button.style.display = "none")
    filterAlive()
    closeBtnAlive.setAttribute("style", "display:flex")
    
});

deadBtn.addEventListener("click", () => {
    divRow.innerHTML = ""
    allCloseButton.forEach(button => button.style.display = "none")
    filterDead()
    closeBtnDead.setAttribute("style", "display:flex")
})

unkownBtn.addEventListener("click", () => {
    divRow.innerHTML = ""
    allCloseButton.forEach(button => button.style.display = "none")
    filterUnknown()
    closeBtnUnkown.setAttribute("style", "display:flex")
})

closeBtnAlive.addEventListener("click", e => {
    e.stopPropagation()
    divRow.innerHTML = "";
    getCharacterAPI = "https://rickandmortyapi.com/api/character";
    fetchCharacterAPI()
    closeBtnAlive.setAttribute("style", "display:none");
    
})

closeBtnDead.addEventListener("click", e => {
    e.stopPropagation();
    divRow.innerHTML = ""
    getCharacterAPI = "https://rickandmortyapi.com/api/character"
    fetchCharacterAPI()
    closeBtnDead.setAttribute("style", "display:none");
})

closeBtnUnkown.addEventListener("click", e => {
    e.stopPropagation();
    divRow.innerHTML = "";
    getCharacterAPI = "https://rickandmortyapi.com/api/character"
    fetchCharacterAPI()
    closeBtnUnkown.setAttribute("style", "display:none");
})
//FILTERING

const fetchCharacterAPI = async () => {
    try {
        const res = await fetch(getCharacterAPI);
        const data = await res.json()
        
        
      const cardsDOM = data.results.map(item => {

        let status = item.status === "Alive" ? "/public/activity.png" : "/public/icons8-skull-50.png";
        
        
        

          const cardHTML = `
            <div class="col-sm-4">
                  <div class="card" style="width: 18rem; height: 22rem;">
                      <span id="favorite-${item.id}" class="favorite position-absolute end-0 mt-4 px-4"><img src="/public/icons8-heart-32.png" alt=""></span>
                      <img class="card-img-top p-2" src="${item.image}" alt="Card image cap">
                      <div class="card-body p-0">
                        <h6 class="card-title">${item.name}</h6>
                        <div class="character-status">
                    <p class="m-1"><span class="activity"><img class="" src="${status}" alt=""></span> ${item.status}</p>
                    <p class="m-1"><span class="entity"><img src="/public/icons8-alien-50.png" alt=""></span>${item.species}</p>  
                    </div>
                </div>
            </div>
    </div>
            `
            
            return cardHTML
 
            
        }); 

        divRow.innerHTML = ""
        divRow.innerHTML = cardsDOM.join("");
        
        //favorites
        data.results.forEach(item => {
            const favoriteIcon = document.querySelector(`#favorite-${item.id}`);
            favoriteIcon.addEventListener("click", () => changeFavoriteIcon(item.id));
        })
        //favorites

        
       return cardsDOM
    
    } catch(err) {
        console.log("error:", err)
    }
}

fetchCharacterAPI()            


function changeFavoriteIcon(characterId) {
    const favoriteIcon = document.querySelector(`#favorite-${characterId} img`);
    
    if(favoriteIcon.src.includes("64")) {
        favoriteIcon.src = "/public/icons8-heart-32.png"
    } else {
        favoriteIcon.src = "/public/icons8-heart-64.png"
    }
}


