import { router } from "../data/route.js"; 

/* <!-- data-route="${window.location.pathname}?${window.location.search}&status=alive" --> */

export const createFilterNav = () => {
    const filterContainer = document.createElement("div");

    filterContainer.className = "buttons d-flex justify-content-center gap-3 js-container-btns";

    filterContainer.innerHTML = `
                <a id="alive-btn" class="rounded-pill text-light btn btn-outline-secondary position-relative js-alive-btn"
                 data-action="filter" data-route="${router.buildUrl({status: "alive"}, "")}" >
                     Alive 
                    <span class="button-close-alive close-button btn text-light rounded-circle    
                     justify-content-center align-items-center position-absolute" data-remove-filter="status">X</span>
                </a>


                <a id="dead-btn" class="rounded-pill text-light btn btn-outline-secondary position-relative js-dead-btn"
                 data-action="filter"  data-route="${router.buildUrl({status: "dead"}, "")}" >
                     Dead
                    <span class="button-close-alive close-button btn text-light rounded-circle    
                     justify-content-center align-items-center position-absolute" data-remove-filter="status">X</span>
                </a>

                <a id="unkown-btn" class="rounded-pill text-light btn btn-outline-secondary position-relative js-unknown-btn"
                 data-action="filter" data-route="${router.buildUrl({status: "unknown"}, "")}" >
                     Unknown
                    <span class="button-close-alive close-button btn text-light rounded-circle justify-content-center align-items-center position-absolute"
                     data-remove-filter="status">X</span>
                </a>
                </div>
            ` 

            return filterContainer
} 