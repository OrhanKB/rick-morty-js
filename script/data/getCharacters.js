   import { renderCharacters } from "../characters.js";
  import { urlString, getCharacters} from "./state.js";
  import { renderPagination } from "./pagination.js";

    // CATEGORIZING BUTTONS
    const buttonConfig = {
        ".js-alive-btn" : {status: "alive", closeButton: "button-close-alive"},
        ".js-dead-btn" : {status: "dead", closeButton: "button-close-dead"},
        ".js-unknown-btn": {status: "unknown", closeButton: "button-close-unknown"}
    }
    
    async function handleButtonClick(event) {
        const button = event.target.closest("[data-action]");

      const [urlBase, queryString] = urlString.urlOutside.split("?");
      const params = new URLSearchParams(queryString);
        

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
        
         params.has("status") ? params.set("status", status) : params.append("status", status)
          urlString.urlOutside = `${urlBase}?${params}`
          document.querySelector("."+closeButton).style.display = "flex";
          
          allCloseButtons.forEach((button) => {
            button.classList[0] !== closeButton ? button.style.display = "none" : [];
          });

        } else if (action === "close") {
         params.delete("status");
          urlString.urlOutside =  `${urlBase}?${params.toString()}`
            
          button.style.display = "none";
        }
  if (Number(params.get("page")) >= urlString.data.info.pages) {
          params.set("page", 1);
          urlString.urlOutside = `${urlBase}?${params}`
        }
        urlString.data = await getCharacters();
        // pagination number adjuster to prevent error       
        
        renderCharacters();
        renderPagination();
        
      }
      function setupEventListeners() {
        
        const container = document.querySelector(".js-container-btns"); 
        container.addEventListener("click", handleButtonClick)
      }
      // CATEGORIZING BUTTONS
 
  setupEventListeners();  
  

  




















 


  






