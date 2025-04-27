  export const urlString = {
    urlOutside : "https://rickandmortyapi.com/api/character?",
    data : undefined,
    urlPages: undefined,
  }
  

  export async function getCharacters ()  {
   
     try{ 

         let url = await urlString.urlOutside; 

         const response = await fetch(url);
        if(!response.ok) {
          throw new Error("Response error")
        };
  
        const data = await response.json();
        
        urlString.urlPages = data.info.pages;
             
        return data;
       
     } catch(error) {
        console.log("error:", error)
      
    }
  }
  

urlString.data = await getCharacters(); 

console.log("urlstring data:", urlString)




  
