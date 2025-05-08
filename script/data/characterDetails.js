import { urlString } from "./state.js";
//LOCALSTORAGE FOR CHARACTER DETAILS PAGE

async function matchedCharacterId(event) {

    const eventId = Number(event.target.closest(".cart-html").dataset.cartId);
    const charactersData = urlString.data.results;
    const matchedId = charactersData.find(character => character.id === eventId)
    localStorage.setItem("matchedId", JSON.stringify(matchedId));
    
    const characterUrl = matchedId.location.url;
    
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
            
           // const selectedDatas = selectedNums.map(num => allData[num]);
           const selectedDatas = selectedNums.map((num) => {
                console.log("num:", num)
           })
            

            return selectedDatas

        } 


    
        
    localStorage.setItem("otherCharactersData" ,JSON.stringify(getRandomData()));
    
   // window.location.href = "character-details.html"
    
    
}


  function characterDetailEventListener () {
    const charactersDiv = document.querySelector("#row-div");
    charactersDiv.addEventListener("click", matchedCharacterId);   
}


characterDetailEventListener();

