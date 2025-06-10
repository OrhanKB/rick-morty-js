




export const createOtherCharacters = async (character) => {
    let container = document.createElement("div");
    

    const fetchOthers = character.location.url
    
    const loadOthers = async () => {
        try {
            const response = await fetch(fetchOthers);
            const data =  await response.json();
            return data.residents
        } catch(error) {
            console.log("erorr:", error)
        }
    }

    const fetchOthersData = await loadOthers();

    const getRandomData = () => {
        const selectedNums = [];
        let currentIndex = 0;

        currentIndex = Math.floor(Math.random()* 10);
        selectedNums.push(currentIndex)

        while(currentIndex < fetchOthersData.length - 1) {
            const randomNums = Math.floor(Math.random() * 10);

            currentIndex += randomNums;

            
            if(currentIndex >= fetchOthersData.length) {
                currentIndex = fetchOthersData.length - 1;
                break
            }
            
            selectedNums.push(currentIndex)     
        }
        
        // PREVENTING REPEAT IN ARRAY
        const selectedDatas = selectedNums.map(num => fetchOthersData[num]);
        const uniqueNumbers = [...new Set(selectedDatas)];
        
       // PREVENTING REPEAT IN ARRAY
        return uniqueNumbers
    }

    const randomDataArray = getRandomData();
    

   /* async function fetchSequantially() {
        const randomCharArray = [];
        for(let url of randomDataArray) {
            try{
                const response = await fetch(url);
                const data = await response.json();
                randomCharArray.push(data);
                
            } catch(error) {
                console.log("error:", error)
            }
        }
        
        return randomCharArray;    
    } */

    async function fetchSequantially() {
            try {   
                const fetchPromises = randomDataArray.map(url =>  fetch(url).then(response => response.json()) );
                const randomCharArray = await Promise.all(fetchPromises)
                console.log("randomchararray:", randomCharArray);
                return randomCharArray;    
            } catch(error) {    
                console.log("error", error)
                return [];
            }
    } 
    
    const randomizedCharacterData = await fetchSequantially();
    
   // let html = "";
    randomizedCharacterData.forEach((character) => {
         container.innerHTML += `
         <div class="character-card" data-details-id=${character.id} data-role="details-card">
              <img src="${character.image}" alt="${character.name}">
              <div class="character-info">
                <p class="details-name">${character.name}</p>
                <p class="details-location">${character.location.name}</p>
                <p class="details-species">${character.species}/${character.gender}</p>
              </div>
              <a href="#" class="character-arrow">
                <img src="/public/arrow-89-24.png" width="16" alt="View">
              </a>
        </div>
        ` 
    });
   
    return container;
}