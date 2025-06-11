


function loadFavoritesPage() {
    const container = document.createElement("div");
    const loadFavDivs = JSON.parse(localStorage.getItem("favDivs"));
    

    container.innerHTML = `
    <header class="d-flex flex-column align-items-center">

            <a href="#" class="arrow-left position-relative">
                <img src="/public/arrow-89-24.png" alt="">
            </a>
            <a class="border border-black d-flex justify-content-center pt-1" href="/script/index.html">
            <img style="width: 160px; height: 50px;" src="/public/logo.png" alt="">
            </a>
            <h2 class="mt-3 text-white">My Favorites</h2>
            
        </header>

        <main class="mt-5 main">

            <div class="container mt-5"> 
                <div  id="row-div" class="row  d-flex justify-content-center js-characters">
                    
                </div>
            </div>
        </main>
    `

    const rowDiv = container.querySelector("#row-div");
    
    // no fav message
    if (!loadFavDivs || loadFavDivs.length === 0) {
        rowDiv.innerHTML = '<div class="col-12 text-center"><h4 class="text-white">No favorites</h4></div>';
        return container;
    }
    
    // add favs
    loadFavDivs.forEach((favObj) => {
        rowDiv.innerHTML += favObj.html;
    })

    return container
} 

export const favoritesPage = () => loadFavoritesPage();