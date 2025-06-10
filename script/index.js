import { routerConfig } from "./data/routes.js";
import { initRouter } from "./data/route.js";
import { router } from "./data/route.js";
//import { navigate } from "./data/route.js";

//window.navigate = navigate;
window.app = router


window.addEventListener("DOMContentLoaded", () => {
    initRouter(routerConfig);
})


