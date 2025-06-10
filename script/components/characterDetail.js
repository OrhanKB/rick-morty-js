

export const renderCharacterDetail = (character) => {
        const container = document.createElement("div");

        container.innerHTML = `
             <div class="row d-flex g-5  text-light mx-auto" style="max-width: fit-content">
            <div class="col-auto">
                <img style="height: 407px; width: 375px;" class="rounded" src="${character.image}" alt="">
            </div>

            <div class="col-auto d-inline-block" style="font-family: 'Times New Roman', Times, serif;
               padding: 60px;padding-left: 0px; max-width: 570px">

                <h1 style="font-weight: 600;">${character.name}</h1>

                <div class="row informations mx-auto" style="max-width: fit-content">

                    <h5 class="text-secondary mt-3 mb-4 w-100">Informations</h5>

                    <div class="col-md-6 ">
                        <p class="status-head">Status</p>
                        <p class="status-input">${character.status}</p>
                    </div>
                    <div class="col-md-6">
                        <p class="status-head">Gender</p>
                        <p class="status-input">${character.gender}</p>
                    </div>
 
                <div class="w-100"></div>

                <div  class="col-md-6">
                    <p class="status-head">Species</p>
                    <p class="status-input">${character.species}</p>
                </div>
                <div  class="col-md-6 ">
                    <p class="status-head">Origin</p>
                    <p class="status-input">${character.origin.name}</p>
                </div>

                <div class="w-100"></div>

                <div class="col-md-6 ">
                    <p class="status-head">Location</p>
                    <p class="status-input">${character.location.name}</p>
                </div>
                <div  class="col-md-6 ">
                    <p class="status-head">Type</p>
                    <p class="status-input">${character.type === "" ? "-" : character.type}</p>
                </div>      
                </div>
            </div>
        </div>
        `
        return container
}