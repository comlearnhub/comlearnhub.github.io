const sidebar = document.getElementById("sidebar");    
const menuBtn = document.getElementById("menuBtn");   
const overlay = document.getElementById("overlay");   
const search = document.getElementById("search");    
const resourceGrid = document.getElementById("resourceGrid");   
const noResult = document.getElementById("noResult");
const resultCount = document.getElementById("resultCount");    


// ======================================
// MOBILE MENU
// ======================================

function openMenu() {
    sidebar.classList.add("open");
    overlay.classList.add("show");
}


function closeMenu() {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
}


menuBtn.addEventListener("click", 
    function () {
        if (sidebar.classList.contains("open"))        
        {
            closeMenu();
        } 
        else 
        {
            openMenu();
        }
    }
);

overlay.addEventListener("click", closeMenu);


// ======================================
// OPEN WEBSITE
// ======================================

function openResource(type) {
    const links = {
        computer: "https://comlearnhub.github.io/basic",           
        files: "file-types/index.html",
        command: "Command" 
    };

    const url = links[type];
    if (!url) {
        console.error("Website link not found:",type);       
        return;
    }

    window.location.href = url;
}


// ======================================
// ALL OPEN BUTTONS
// ======================================
document
    .querySelectorAll("[data-open]")
    .forEach(button => {
        button.addEventListener(
            "click",
            function () {
                const target = this.dataset.open;                   
                openResource(target);
            }
        );
    });


// ======================================
// SIDEBAR
// ======================================
document
    .querySelectorAll(".nav[data-section]")
    .forEach(button => {
        button.addEventListener(
            "click",
            function () {
                const section = this.dataset.section;
                if (section === "home") {
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });
                } else {
                    openResource(section);
                }

                document
                    .querySelectorAll(".nav")
                    .forEach(item => {
                        item.classList.remove(
                            "active"
                        );
                    });
                this.classList.add("active");
                closeMenu();
            }
        );
    });

// ======================================
// SEARCH
// ======================================

search.addEventListener(
    "input",
    function () {
        const query =search.value.trim().toLowerCase();
        const cards =
            [
                ...resourceGrid
                    .querySelectorAll(
                        ".resource-card"
                    )
            ];

        // Empty search
        if (!query) {
            cards.forEach(card => {
                card.classList.remove(
                    "hidden"
                );
            });
            noResult.classList.add(
                "hidden"
            );
            resultCount.textContent =
                "2 resources";
            return;
        }

        let found = 0;
        cards.forEach(card => {
            const text = card.innerText.toLowerCase();
                
            if (text.includes(query))      
            {
                card.classList.remove("hidden");             
                found++;
            }
             else 
            {
                card.classList.add(
                    "hidden"
                );
            }
        });

        resultCount.textContent = found +(found === 1 ? " resource": " resources");        
        if (found === 0) {
            noResult.classList.remove("hidden");        
        } else {
            noResult.classList.add("hidden");           
        }
    }
);
