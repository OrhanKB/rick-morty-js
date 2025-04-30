const characters = document.querySelector("#characters")
const locations = document.querySelector("#locations")
const favorites = document.querySelector("#favorites")

characters.addEventListener("click", e => {
    document.location.href = "/pages/characters.html"
} 
);

locations.addEventListener("click", e => {
    document.location.href = "../src/pages/locations.html"
})

favorites.addEventListener("click", e => {
    document.location.href = "../src/pages/favorites.html"
})