  const route = {
    currentRoute: null,
    allRoutes: [],
    prevUrl: null,
}

// bu kısım route u initliyor ve click handle lıyor
export function initRouter(routes) {
    route.allRoutes = routes;

    handleNavigation();

    window.addEventListener("popstate", handleNavigation)

    //handle link clicks
    document.addEventListener("click", (e) => {

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
   
    // İlk önce tam eşleştirme dene
    let matchedRoute = route.allRoutes[locationPathname];
    let extractedId = null;
    
    // Tam eşleştirme yoksa dynamic route ara
    if (!matchedRoute) {
        for (const routePath in route.allRoutes) {
            if (routePath.includes(':id')) {
                // :id kısmını regex ile değiştir
                const pattern = routePath.replace(':id', '\\d+');
                const regex = new RegExp(`^${pattern}$`);
                
                if (regex.test(locationPathname)) {
                    matchedRoute = route.allRoutes[routePath];
                    // ID'yi çıkar
                    extractedId = locationPathname.split('/').pop();
                    break;
                }
            }
        }
    }
    
    // Hiçbiri yoksa wildcard
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
        
        app.innerHTML = "";
        
        try {
            // ID varsa parametre olarak geç
            const content = extractedId ? await matchedRoute(extractedId) : await matchedRoute();
            app.appendChild(content);
        } catch(error) {    
            console.log("Error:", error)
        }
    }
} 

    //pathway updater
    const navigate = (route) => {
    const path = route === "index.html" ? "/" : `${route}`;
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




 