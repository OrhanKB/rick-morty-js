  const route = {
    currentRoute: null,
    allRoutes: [],
    prevUrl: null,
}



// init route and handle clicks
export function initRouter(routes) {
    route.allRoutes = routes;

    handleNavigation();

    // Listen for hash changes instead of popstate
    window.addEventListener("hashchange", handleNavigation);
    window.addEventListener("popstate", handleNavigation)

    //handle link clicks
    document.addEventListener("click", (e) => {

        // ARROW LEFT BACK BUTTON
        const arrowLeft = e.target.closest(".arrow-left");
        if(arrowLeft) {
            e.preventDefault();
            window.history.back();
            return;
        }

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

            const hashFull = window.location.hash.slice(1) || '/character';
            const [path, query] = hashFull.includes('?') ? hashFull.split('?') : [hashFull, ''];
            const params = new URLSearchParams(query);
            params.delete(filterKey);

            const queryString = params.toString();
            const newPath = queryString ? `${path}?${queryString}` : path;
            navigate(newPath);
        }

        

    });



}


//loads page
const handleNavigation = async () => {
    const hashFull = window.location.hash.slice(1) || '/';
    let [locationPathname, locationSearch] = hashFull.includes('?') 
        ? [hashFull.split('?')[0], '?' + hashFull.split('?')[1]] 
        : [hashFull, ''];
    
    const currentFullUrl = locationPathname + locationSearch;
    
    if(locationPathname.startsWith('/script')) {
        locationPathname = locationPathname.replace('/script', '');
    }
    
    if(locationPathname === '' || locationPathname === '/') {
        locationPathname = '/';
    }
   
    
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

    // Get page name from hash for CSS loading
    const hashPath = window.location.hash.slice(1) || '/';
    const parts = hashPath.split("/");    
    const pageName = parts[1]; // Get first part after /
    
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
    
    // Remove /script prefix if exists
    if(path.startsWith('/script')) {
        path = path.replace('/script', '');
    }
    
    //UPDATING ID PATH PARAMETER
    if (path.includes('/character/')) {
        // reset ID parameter,  get /character pathway
        const segments = path.split('/');
        
        // get last segment(latest id);
        const lastSegment = segments[segments.length - 1];
        if (lastSegment && !isNaN(lastSegment)) {
            path = `/character/${lastSegment}`; 
        }
    }
    
    // Use hash navigation
    window.location.hash = path;
} 

//URL PARAMETER UPDATER
 function buildUrl(newParams = {}, id) {
    let hashPath = window.location.hash.slice(1) || '/character';
    
    if(hashPath.includes('?')) {
        hashPath = hashPath.split('?')[0];
    }
    
    const currentSearch = window.location.hash.includes('?') 
        ? window.location.hash.split('?')[1] 
        : '';
    const params = new URLSearchParams(currentSearch);
    
    Object.entries(newParams).forEach(([key, value]) => {
        if(value === null || value === undefined) {
            params.delete(key);
        } else {
            params.set(key, value);
        }
    });
    
    if(id) {
        return `/character/${id}`;
    }
    
    const queryString = params.toString();
    return queryString ? `${hashPath}?${queryString}` : hashPath;
} 


function loadCssStyle(pageName) {
    const oldLink = document.getElementById("dynamic-page-css");
    if(oldLink) {
        oldLink.remove();
    }
    
    // Determine CSS file based on page name
    if(pageName === "" || pageName === undefined) {
        pageName = "homepage";
    } else if(pageName === "character") {
        // Check if it's character detail (has ID) or character list
        const hashPath = window.location.hash.slice(1);
        const pathParts = hashPath.split("/").filter(p => p);
        pageName = pathParts.length >= 2 && !isNaN(pathParts[1]) ? "character-details" : "character";
    } else if(pageName === "favorites") {
        pageName = "favorites";
    }
   
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.id = "dynamic-page-css";
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






 