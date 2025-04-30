import { urlString } from "./state.js";

//LOCALSTORAGE FOR CHARACTER DETAILS PAGE
function matchedCharacterId(event) {
    const eventId = Number(event.target.closest(".cart-html").dataset.cartId)
    const charactersData = urlString.data.results;
    const matchedId = charactersData.find(character => character.id === eventId)
    localStorage.setItem("matchedId", JSON.stringify(matchedId));    
    window.location.href = "character-details.html"
}

  function characterDetailEventListener () {
    const charactersDiv = document.querySelector("#row-div")
    charactersDiv.addEventListener("click", matchedCharacterId);
    
}

characterDetailEventListener();
//LOCALSTORAGE FOR CHARACTER DETAILS PAGE

const characterLocationUrl = JSON.parse(localStorage.getItem("matchedId"));
const characterURL = characterLocationUrl.location.url
 
 async function otherCharacters() {
    try {   
        const res = await fetch(characterURL);
        const data  = await res.json();
        const characterUrlArray = data.residents
        return characterUrlArray
    } catch(err) {
        console.log("error:", err)
    }
}

 const otherCharactersData = await otherCharacters();

 async function fetchUrlSequantially(otherCharactersData) {
    const results = [];

    for(const url of otherCharactersData) {
        try {
            const res = await fetch(url);
            const data = await res.json();
            results.push(data)
            
        } catch(err) {
            console.log("err:", error)
        }
    }
    return results
}

const characters = await fetchUrlSequantially(otherCharactersData);
characters.forEach((character) => {
    console.log("character:", character)
})

