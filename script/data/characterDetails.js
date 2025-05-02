import { urlString } from "./state.js";
//LOCALSTORAGE FOR CHARACTER DETAILS PAGE
async function matchedCharacterId(event) {
    const eventId = Number(event.target.closest(".cart-html").dataset.cartId)
    const charactersData = urlString.data.results;
    const matchedId = charactersData.find(character => character.id === eventId)
    localStorage.setItem("matchedId", JSON.stringify(matchedId));
    
    const characterUrl = matchedId.location.url;
    
    async function otherCharacters() {
        try {
            const res = await fetch(characterUrl);
            const data = await res.json();
            const characterUrlArray = data.residents;

            const dataPromises = characterUrlArray.map((async url => {
                const res = await fetch(url);
                return res.json();
            }))

            const allData = await Promise.all(dataPromises)
           
            return allData

        } catch(err) {
            console.log("error:", err)
        }
    }

    const allData = await otherCharacters();
    localStorage.setItem("otherCharactersData" ,JSON.stringify(allData));
    
    window.location.href = "character-details.html"
     
}

  function characterDetailEventListener () {
    const charactersDiv = document.querySelector("#row-div")
    charactersDiv.addEventListener("click", matchedCharacterId);
    
}

characterDetailEventListener();

