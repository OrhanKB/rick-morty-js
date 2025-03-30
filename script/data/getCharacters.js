    
   
  import { renderCharacters } from "../characters.js";
       
    export const urlString = {
      urlOutside : "https://rickandmortyapi.com/api/character",
      data : undefined,
    }    

    // CATEGORIZING BUTTONS
    const buttonConfig = {
        ".js-alive-btn" : {status: "alive", closeButton: "button-close-alive"},
        ".js-dead-btn" : {status: "dead", closeButton: "button-close-dead"},
        ".js-unknown-btn": {status: "unknown", closeButton: "button-close-unknown"}
    }    
    
    async function handleButtonClick(event) {
        const button = event.target.closest("[data-action]");
       
        if (!button) return;
      
        const action = button.getAttribute("data-action");
        
        if (button.classList.contains("button-close-alive") || 
            button.classList.contains("button-close-dead") || 
            button.classList.contains("button-close-unknown")) {
          event.stopPropagation(); // Stop event bubbling
        } 

        if (action === "filter") {

          const buttonClass = Array.from(button.classList).find(cls => "."+cls in buttonConfig);

          if (!buttonClass) return;
            
       
         const {status, closeButton} = buttonConfig["." + buttonClass];
         
         const allCloseButtons = document.querySelectorAll(`[data-action="close"]`)
          //
          urlString.urlOutside = `https://rickandmortyapi.com/api/character?status=${status}`;
          document.querySelector("."+closeButton).style.display = "flex";
          
          allCloseButtons.forEach((button) => {
            button.classList[0] !== closeButton ? button.style.display = "none" : [];
              
          })
          
        
        } else if (action === "close") {
          
          urlString.urlOutside = "https://rickandmortyapi.com/api/character";
          button.style.display = "none";
        }

        urlString.data = await getCharacters();
        renderCharacters();
      }
      
      
      function setupEventListeners() {
        const container = document.querySelector(".js-container-btns"); 
        container.addEventListener("click", handleButtonClick)
        
      }
      // CATEGORIZING BUTTONS
     
export async function getCharacters ()  {

    try{ //
         const url = await urlString.urlOutside; 
        
         const response = await fetch(url)
      
        

        if(!response.ok) {
            throw new Error("Bad response")
        };

        const data = await response.json();
        return data;
       
     } catch(error) {
        console.log("error:", error)
    }
    
}

  setupEventListeners();
  urlString.data = await getCharacters();


  
   
  





















 


  






