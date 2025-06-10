




const renderHomePage = async () => {
    const container = document.createElement("div");

    container.innerHTML = `
         <header class="d-flex justify-content-center mt-4">
            <a href="#">
                <img style="width: 160px; height: 50px;" src="/public/logo.png" alt="">
            </a>
        </header>

        <main class="d-flex justify-content-center mt-4">
            <img style="width: 300px; height: 420px;" src="/public/highlightImage.png" alt="">
        </main>

        <div class="container text-light mt-4">
            <h3>Rick and Morty Universe <b class="text-info">API</b></h3>
            <p>Characters, locations, episodes and more.</p>
            <div class="button-container">
                <button class="btn btn-light" data-route="character">Characters</button>
                <button class="btn btn-secondary" data-route="locations">Locations</button>
                <button class="btn btn-danger" data-route="favorites">My Favorites</button>
            </div>
        </div>
    `
    return container;
}

export const homePage = () => renderHomePage();