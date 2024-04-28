const getCharacterAPI = "https://rickandmortyapi.com/api/character";
const divRow = document.querySelector("#row-div")
//?page=2

//DOM
/*
<div class="col-sm-4">
                  <div class="card" style="width: 18rem; height: 22rem;">
                      <span class="favorite position-absolute end-0 mt-4 px-4"><img src="/public/icons8-heart-32.png" alt=""></span>
                      <img class="card-img-top p-2" src="https://picsum.photos/250/250" alt="Card image cap">
                      <div class="card-body p-0">
                        <h6 class="card-title">Rick Sanchez</h6>
                        <div class="character-status">
                    <p class="m-1"><span class="activity"><img class="" src="/public/icons8-skull-50.png" alt=""></span> Alive</p>
                    <p class="m-1"><span class="entity"><img src="/public/icons8-alien-50.png" alt=""></span>Human</p>  
                    </div>
                </div>
            </div>
    </div>
                  

*/
//DOM

const fetchCharacterAPI = async () => {
    try {
        const res = await fetch(getCharacterAPI);
        const data = await res.json()
        
      const cardsDOM = data.results.map(item => {
                
          const cardHTML = `
            <div class="col-sm-4">
                  <div class="card" style="width: 18rem; height: 22rem;">
                      <span class="favorite position-absolute end-0 mt-4 px-4"><img src="/public/icons8-heart-32.png" alt=""></span>
                      <img class="card-img-top p-2" src="${item.image}" alt="Card image cap">
                      <div class="card-body p-0">
                        <h6 class="card-title">${item.name}</h6>
                        <div class="character-status">
                    <p class="m-1"><span class="activity"><img class="" src="/public/icons8-skull-50.png" alt=""></span> ${item.status}</p>
                    <p class="m-1"><span class="entity"><img src="/public/icons8-alien-50.png" alt=""></span>${item.species}</p>  
                    </div>
                </div>
            </div>
    </div>
            `
            return cardHTML
        }); 

        divRow.innerHTML = ""

        divRow.innerHTML = cardsDOM
        
       return cardsDOM

    } catch(err) {
        console.log("error:", err)
    }
}

fetchCharacterAPI()

