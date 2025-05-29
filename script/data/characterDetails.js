import { urlString } from "./state.js";
import { saveState, restoreState} from "./historyStack.js";
//LOCALSTORAGE FOR CHARACTER DETAILS PAGE

 async function matchedCharacterId(event, childClassToMatch) {

    const eventTargetDiv = event.target.closest(childClassToMatch);
    const eventTargetObjectKey =  Object.keys(eventTargetDiv.dataset)[0];
    const eventId = Number(event.target.closest(childClassToMatch).dataset[eventTargetObjectKey]);
     let charactersData = urlString.data.results;
     console.log("eventid:", eventId)
    //
    const hasMatch = charactersData.find(character => character.id === eventId);
    const noMatch = hasMatch === undefined;

    if(noMatch) {
        charactersData = JSON.parse(localStorage.getItem("otherCharactersData"));
    }
    //
    const matchedId = charactersData.find(character => character.id === eventId)
    localStorage.setItem("matchedId", JSON.stringify(matchedId));
    
    const characterUrl = JSON.parse(localStorage.getItem("matchedId")).location.url;
      
    async function otherCharacters() {
        try {
            //URL CONTROL
            if(!characterUrl || typeof characterUrl !== "string" || characterUrl.includes("characters.html")) {
                console.log("invalid url or no location");
                return [];
            }

            const res = await fetch(characterUrl);

            //JSON CONTROL
            const contentType = res.headers.get("content-type") ;
            if(!contentType?.includes("application/json")) {
                throw new Error("unexpected reponse type:", contentType);
            }

            const data = await res.json();

            const characterUrlArray = data.residents;
            const dataPromises = characterUrlArray.map((async url => {
                const res = await fetch(url);
                return res.json();
            }))

            const allData = await Promise.all(dataPromises)
            return allData

        } catch(err) {
            console.log("unexpected error:", err.message);
            return [];
        }
    }

    const allData = await otherCharacters();    
  
     const getRandomData = () => {
            const selectedNums = [];
            let currentIndex = 0;

            currentIndex = Math.floor(Math.random()* 10);
            selectedNums.push(currentIndex)

            while(currentIndex < allData.length - 1) {
                const randomNums = Math.floor(Math.random() * 10);

                currentIndex += randomNums;

                
                if(currentIndex >= allData.length) {
                    currentIndex = allData.length - 1;
                    break
                }
                
                selectedNums.push(currentIndex)     
            }
            
            // PREVENTING REPEAT IN ARRAY
            const selectedDatas = selectedNums.map(num => allData[num]);
            const uniqueNumbers = [...new Set(selectedDatas)];
            
            if(uniqueNumbers[0] !== undefined) {
              const indexToRemove = uniqueNumbers.findIndex(character => character.id === matchedId.id);
              uniqueNumbers.splice(indexToRemove, 1);
            }  
           // PREVENTING REPEAT IN ARRAY
            return uniqueNumbers

        }
     
      localStorage.setItem("otherCharactersData" ,JSON.stringify(getRandomData()));
      const otherCharactersParsed = JSON.parse(localStorage.getItem("otherCharactersData"));
        saveState(otherCharactersParsed);
    
         window.location.href = "character-details.html"
    
}

    const containerSelector = "#row-div";
    const childClassToMatch = "cart-html";
    

   export function characterDetailEventListener(containerSelector, childClassToMatch) {
        const container = document.querySelector(containerSelector);

         if(!container) return;

        container.addEventListener("click", (event) => {
            matchedCharacterId(event , ` .${childClassToMatch} `)
        });

    }

    const arrowLeftDiv =  document.querySelector(".arrow-left");
    arrowLeftDiv.addEventListener("click", (e) => {
        restoreState();
        console.log("e target:", e.target);
    })

characterDetailEventListener(containerSelector, childClassToMatch);

