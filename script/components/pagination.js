import { router } from "../data/route.js";

/* data-route="${window.location.pathname}?page=${prevPageInt}" */

export const renderPagination = (currentPage, totalPage) => {
    const paginationDiv = document.createElement("div");
    paginationDiv.style.display = "flex";

    const firstPage = 1;
    const nextPageInt = currentPage + 1;
    const prevPageInt = currentPage - 1;
    const lastPage = totalPage;
    
    

    paginationDiv.innerHTML = `
            <button class="js-prev-button" data-route="${router.buildUrl({page: prevPageInt}, "")}">
            &lt;
            </button>

            <button class="js-first-page" data-route="${router.buildUrl({page: firstPage}, "")}" >
            ${firstPage}
            </button>

            <button class="js-prev-ellipsis">...</button>
            <button class="js-prev-page" 
            data-route="${router.buildUrl({page: prevPageInt})}"
            </button>

            <button class="js-current-page" data-route="${router.buildUrl({page: currentPage}, "")}">
            ${currentPage}
            </button>

            <button class="js-next-page" data-route="${router.buildUrl({page: nextPageInt}, "")}">
            ${nextPageInt}
            </button>

            <button class="js-next-ellipsis" >...</button>

            <button class="js-last-page" data-route="${router.buildUrl({page: lastPage}, "")}">
            ${lastPage}
            </button>

            <button class="js-forward-button" data-route="${router.buildUrl({page: nextPageInt}, "")}">
            &gt;
            </button>
    `

    const prevBtn =      paginationDiv.querySelector(".js-prev-button");
    const firstPageBtn = paginationDiv.querySelector(".js-first-page");
    const prevEpBtn =    paginationDiv.querySelector(".js-prev-ellipsis");
    const prevPageBtn =  paginationDiv.querySelector(".js-prev-page");
    const nextPageBtn =  paginationDiv.querySelector(".js-next-page");
    const nextEpBtn =    paginationDiv.querySelector(".js-next-ellipsis");
    const lastPageBtn =  paginationDiv.querySelector(".js-last-page");
    const forwardBtn =   paginationDiv.querySelector(".js-forward-button");
  const currentPageBtn = paginationDiv.querySelector(".js-current-page");

  prevBtn.style.display = currentPage > firstPage ? "flex" : "none" ;
  firstPageBtn.style.display = currentPage > firstPage ? "flex" : "none" ;
  prevPageBtn.style.display = currentPage - firstPage > 1 ? "flex" : "none" ;
  prevEpBtn.style.display = currentPage - firstPage > 2 ? "flex" : "none" ;
  nextEpBtn.style.display = currentPage >= lastPage - 2 ? "none" : "flex"
  nextPageBtn.style.display = isNaN(nextPageInt) ? "none" : "flex" ;
  forwardBtn.style.display = currentPage === lastPage ? "none" : "flex";

      if(currentPage - lastPage === 0) {
        lastPageBtn.style.display = "none"
        nextPageBtn.style.display = "none";
    } else if(nextPageInt - lastPage === 0) {
        lastPageBtn.style.display = "none"
    }
    nextEpBtn.disabled = true;
    prevEpBtn.disabled = true;
    currentPageBtn.setAttribute("style", "background-color: gray");

    
    
    return paginationDiv
}