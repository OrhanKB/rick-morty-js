import { characterDetailEventListener } from "./characterDetails.js";
import { urlString } from "./state.js";
  
   // const containerSelector = ".other-characters-row";
   // const childClassToMatch = "other-characters-html";
     const containerSelector = ".characters-grid"
     const childClassToMatch = "character-card"
    characterDetailEventListener(containerSelector, `${childClassToMatch}`);


 

    

    

