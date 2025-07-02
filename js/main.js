class GameApp {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.apiHost = 'free-to-play-games-database.p.rapidapi.com';
        this.rowElement = document.getElementById("row");
        this.detailBoxElement = document.querySelector(".detail-box");
        this.navLinks = document.querySelectorAll(".nav-link");

        this.addNavLinksListeners();
        this.addCardClickListener();

        this.gameList("mmorpg");
    }

    getHeaders() {
        return {
            'x-rapidapi-key': this.apiKey,
            'x-rapidapi-host': this.apiHost
        };
    }

    addNavLinksListeners() {
        for (let i = 0; i < this.navLinks.length; i++) {
            this.navLinks[i].addEventListener("click", (e) => {
                const category = e.target.textContent.trim();
                this.gameList(category);
            });
        }
    }

    addCardClickListener() {
        this.rowElement.addEventListener("click", (e) => {
            const card = e.target.closest(".card");
            document.getElementById("detail").classList.replace("d-none", "d-flex")
            this.gameDetails(card.dataset.id);

        });
    }

    async gameList(category) {
        const options = {
            method: 'GET',
            headers: this.getHeaders()
        };

        const response = await fetch(`https://${this.apiHost}/api/games?category=${category}`, options);
        const games = await response.json();

        let box = '';
        for (let i = 0; i < games.length; i++) {
            let game = games[i];
            box += `
                <div class="col-xl-3 col-lg-4 col-md-6 mb-3">
                    <div class="card h-100 page text-white pointer" data-id="${game.id}">
                        <img src="${game.thumbnail}" class="card-img-top" alt="${game.title}">
                        <div class="card-body">
                            <h5 class="card-title">${game.title}</h5>
                            <p class="card-text">${game.short_description}</p>
                        </div>
                    </div>
                </div>
            `;
        }

        this.rowElement.innerHTML = box;
        this.detailBoxElement.innerHTML = '';
    }

    async gameDetails(id) {
        const options = {
            method: 'GET',
            headers: this.getHeaders()
        };

        const response = await fetch(`https://${this.apiHost}/api/game?id=${id}`, options);
        const game = await response.json();

        this.detailBoxElement.innerHTML = `
            <div class="card text-white bg-dark mt-5 w-100 max-600 mx-auto  d-flex align-items-center justify-content-center z-3">
             
          
                        <img src="${game.thumbnail}" class=" rounded-start w-100" alt="${game.title}">
                   
                     <button class="btn text-white position-absolute top-0 end-0 p-3" id="x">x</button>
                        <div class="card-body">
                            <h5 class="card-title">${game.title}</h5>
                            <p class="card-text"><strong>Category:</strong> ${game.genre}</p>
                            <p class="card-text"><strong>Platform:</strong> ${game.platform}</p>
                            <p class="card-text"><strong>Status:</strong> ${game.status}</p>
                       
                   
                </div>
            </div>
        `;
        document.getElementById("x").addEventListener("click", function () {
            document.getElementById("detail").classList.replace("d-flex", "d-none")

        })
    }
}


const app = new GameApp('4132811013msh9b499aca166eaacp121626jsnae34504c4806');
