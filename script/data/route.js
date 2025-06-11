  const route = {
    currentRoute: null,
    allRoutes: [],
    prevUrl: null,
}



// init route and handle clicks
export function initRouter(routes) {
    route.allRoutes = routes;

    handleNavigation();

    window.addEventListener("popstate", handleNavigation)

    //handle link clicks
    document.addEventListener("click", (e) => {

        // FAVORITE BUTTON CONTROL
        const favBtn = e.target.closest(".favorite");
        if(favBtn) {
            e.preventDefault();
            e.stopPropagation(); 
            
            const existingFavs = JSON.parse(localStorage.getItem("favDivs")) || [];
            
            // data-cart-id
            const cartElement = favBtn.closest("[data-cart-id]");
            const cartId = cartElement.getAttribute("data-cart-id");
            
            // get gridwrapper
            const gridWrapper = cartElement.parentElement;
            
            // toggle fav icon
            const favIcon = favBtn.children[0];
            const isFavorited = favIcon.classList.contains("favorited");
            
            if (!isFavorited) {
                // add new fav
                const favObject = {
                    id: cartId,
                    html: gridWrapper.outerHTML
                };
                existingFavs.push(favObject);
                localStorage.setItem("favDivs", JSON.stringify(existingFavs));
                favIcon.classList.add("favorited");
            } else {
                // remove from favs
                const index = existingFavs.findIndex(fav => fav.id === cartId);
                if (index !== -1) {
                    existingFavs.splice(index, 1);
                    localStorage.setItem("favDivs", JSON.stringify(existingFavs));
                    favIcon.classList.remove("favorited");
                }
                
                // remove fav from DOM
                if (window.location.pathname.includes('/favorites')) {
                    gridWrapper.remove();
                    
                    // no favorites
                    if (existingFavs.length === 0) {
                        const rowDiv = document.querySelector("#row-div");
                        if (rowDiv) {
                            rowDiv.innerHTML = '<div class="col-12 text-center"><h4 class="text-white">No favorites</h4></div>';
                        }
                    }
                }
            }
            return; 
        }

        const routeElement = e.target.closest("[data-route]");
        
        if(routeElement) {
            e.preventDefault();
            const route = routeElement.getAttribute("data-route");
            navigate(route);
        }
        
        //X SPAN CLOSING
        if(e.target.matches("[data-remove-filter]")) {
            e.preventDefault();
            const filterKey = e.target.getAttribute("data-remove-filter");

            const url = new URL(window.location);
            url.searchParams.delete(filterKey);

            const newPath = url.pathname + url.search;
            navigate(newPath);
        }

        

    });



}


//loads page
const handleNavigation = async () => {
    const locationPathname = window.location.pathname;
    const locationSearch = window.location.search;
    
    const currentFullUrl = locationPathname + locationSearch;
    
    locationPathname === "/index.html" ? locationPathname = "/" : "*" ;
   
    
    let matchedRoute = route.allRoutes[locationPathname];
    let extractedId = null;
    
    // dynamic route 
    if (!matchedRoute) {
        for (const routePath in route.allRoutes) {
            if (routePath.includes(':id')) {
                // change :id part with regex
                const pattern = routePath.replace(':id', '\\d+');
                const regex = new RegExp(`^${pattern}$`);
                
                if (regex.test(locationPathname)) {
                    matchedRoute = route.allRoutes[routePath];
                    // remove id
                    extractedId = locationPathname.split('/').pop();
                    break;
                }
            }
        }
    }
    
    // wildcard
    if (!matchedRoute) {
        matchedRoute = route.allRoutes["*"];
    }

    const parts = window.location.pathname.split("/");    
    const pageName = parts[2];
    
    loadCssStyle(pageName);    

    if(route.currentRoute !== matchedRoute || route.prevUrl !== currentFullUrl) {
        route.currentRoute = matchedRoute;
        route.prevUrl = currentFullUrl;
        const app = document.getElementById("app");
        
        // Loading state 
        app.innerHTML = `
            <div style="
                background-color: rgb(52, 52, 52); 
                height: 100vh; 
                display: flex; 
                justify-content: center; 
                align-items: center;
                color: white;
                font-family: Arial, sans-serif;
            ">
                <div>Loading...</div>
            </div>
        `;
        
        try {
            // pass as parameter if have ID
            const content = extractedId ? await matchedRoute(extractedId) : await matchedRoute();
            
            // clean loading state
            app.innerHTML = "";
            app.appendChild(content);
            
            // restore favs
            restoreFavorites();
        } catch(error) {    
            console.log("Error:", error)
        }
    }
} 

// restoring favs func

function restoreFavorites() {
    const savedFavs = JSON.parse(localStorage.getItem("favDivs")) || [];
    
    // Clear all favorite states first
    document.querySelectorAll('.favorite img').forEach(img => {
        img.classList.remove('favorited');
    });
    
    // Then restore only the favorites that exist in the current page
    savedFavs.forEach(favObj => {
        const cartId = favObj.id;
        const favBtn = document.querySelector(`[data-cart-id="${cartId}"] .favorite`);
        if (favBtn && favBtn.children[0]) {
            favBtn.children[0].classList.add("favorited");
        }
    });
} 

    //pathway updater
    const navigate = (route) => {
    let path = route === "index.html" ? "/" : `${route}`;
    
    //UPDATING ID PATH PARAMETER
    if (path.includes('/character/')) {
        // reset ID parameter,  get /character pathway
        const segments = path.split('/');
        
        // get last segment(latest id);
        const lastSegment = segments[segments.length - 1];
        if (lastSegment && !isNaN(lastSegment)) {
            path = `/script/character/${lastSegment}`; 
        }
    }
    
    window.history.pushState({}, "", path);    
    
    handleNavigation();
} 

//URL PARAMETER UPDATER
 function buildUrl(newParams = {}, id) {
    const url = new URL(window.location);

    Object.entries(newParams).forEach(([key, value]) => {
        if(value === null || value === undefined ) {
            url.searchParams.delete(key);
        } else {
            url.searchParams.set(key, value);
        }
    });
    
    if(id) {
        const params = [...url.searchParams.keys()];
        params.forEach(param => url.searchParams.delete(param));
        
        url.pathname = `${url.pathname}/${id}`;
        return url.pathname;
    }
    
    return url.pathname + url.search;
} 


function loadCssStyle(pageName) {
    const oldLink = document.getElementById("dynamic-page-css");
    if(oldLink) {
        oldLink.remove();
    }
    
    pageName === "" || pageName === undefined  || pageName === "index.html" ?
    pageName = "homepage" : pageName = pageName;
   
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.id = "dynamic-page-css";
     window.location.pathname.split("/").length === 4 ? pageName = "character-details" : pageName = pageName ;
    link.href = `/styles/${pageName}.css`;
    
    document.head.appendChild(link);
}

export const router = {
    routes: route.allRoutes,
    currentRoute: route.currentRoute,
    init: initRouter,
    navigate: navigate,
    buildUrl: buildUrl
}






 