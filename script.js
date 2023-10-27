// Creating passive objects
let hashmap = localStorage.getItem("hashmap");
if(hashmap === null){

    hashmap = {
        basic_website: {
            cost: 10,
            increase: 1,
            total_owned: 0
        },
        to_do_list: {
            cost: 50,
            increase: 5,
            total_owned: 0
        },
        weather_app: {
            cost: 500,
            increase: 10,
            total_owned: 0
        },
        portfolio_website: {
            cost: 1000,
            increase: 50,
            total_owned: 0 
        },
        blog_platform: {
            cost: 5000,
            increase: 100,
            total_owned: 0
        },
        e_commerce_website: {
            cost: 20000,
            increase: 500,
            total_owned: 0
        },
        mobile_app: {
            cost: 100000,
            increase: 1000,
            total_owned: 0
        },
        social_media_platform: {
            cost: 500000,
            increase: 5000,
            total_owned: 0
        },
        video_game: {
            cost: 1000000,
            increase: 10000,
            total_owned: 0
        },
        search_engine: {
            cost: 10000000,
            increase: 50000,
            total_owned: 0
        },
        operating_system: {
            cost: 1000000000,
            increase: 100000,
            total_owned: 0
        },
        python: {
            cost: 0,
            purchased: true
        },
        cpp: {
            cost: 500,
            purchased: false
        },
        javascript: {  
            cost: 5000, 
            purchased: false
        },
        html: {
            cost: 50000,
            purchased: false
        },
        php: {
            cost: 500000,
            purchased: false
        },
        mysql: {
            cost: 5000000,
            purchased: false
        },
        r: {
            cost: 50000000,
            purchased: false
        },
        assembly: {
            cost: 500000000,
            purchased: false
        },
        malbolge: {
            cost: 5000000000,
            purchased: false
        },
        cow: {
            cost: 50000000000,
            purchased: false
        }
    }
    localStorage.setItem("hashmap", JSON.stringify(hashmap))
} else {
    hashmap = JSON.parse(hashmap);
}


// Initalizing total counter
let total = parseInt(localStorage.getItem("total"));
if(total === null || isNaN(total)){
    total = parseInt(0);
    localStorage.setItem("total", 0);
} else {
    total = parseInt(total);
    const display = document.getElementsByClassName("total_display")[0];
    display.textContent = total;
}


// Initalizing passive counter
let passive = localStorage.getItem("passive");
if(passive === null){
    passive = 0;
    localStorage.setItem("passive", 0);
} else {
    passive = parseInt(passive);
    const display = document.getElementsByClassName("passive_display")[0];
    display.textContent = passive + " per second";
    
}


// Adding incrementing functionality
function clickingIncrementor(){
    const display = document.getElementsByClassName("total_display")[0];
    let total = parseInt(localStorage.getItem("total"));

    total += 100000000000;
    display.textContent = total;
    localStorage.setItem("total", total);
}


// Function that purchases a project and outputs the information
function purchaseProject(currentProject, nextProject) {
    const passive_display = document.getElementsByClassName("passive_display")[0];
    const total_display = document.getElementsByClassName("total_display")[0];
    let total = parseInt(localStorage.getItem("total"));
    let passive = parseInt(localStorage.getItem("passive"));
    const costDisplay = document.getElementsByClassName(currentProject + "_cost")[0];
    const totalOwnedDisplay = document.getElementsByClassName(currentProject + "_total_owned")[0];

    if(total >= hashmap[currentProject].cost)
    {
        // Buying the project
        hashmap[currentProject].total_owned += 1;


        passive += parseInt(hashmap[currentProject].increase);
        total -= parseInt(hashmap[currentProject].cost);


        // Updating the cost
        hashmap[currentProject].cost = Math.floor(hashmap[currentProject].cost * 1.15);
        costDisplay.textContent = hashmap[currentProject].cost;


        // Displaying all information
        passive_display.textContent = passive + " per second";
        total_display.textContent = total;
        totalOwnedDisplay.textContent = hashmap[currentProject].total_owned;


        // Displaying next project
        hashmap[nextProject].purchased = true;
        document.getElementsByClassName(nextProject + "_container")[0].style.display = "block"; 
        console.log(nextProject + "_container");

        // Updating the local storage
        localStorage.setItem("total", total);
        localStorage.setItem("passive", passive);
        localStorage.setItem("hashmap", JSON.stringify(hashmap));
    }
}


// Adding passive implementation
function passiveImplementation() {
    setInterval(function(){
        let total = parseInt(localStorage.getItem("total")) || 0;
        let passive = parseInt(localStorage.getItem("passive")) || 0;
        
    
        total += passive;
        localStorage.setItem("total", total);

        const display = document.getElementsByClassName("total_display")[0];
        display.textContent = total;
    }, 1000);
}


// Outputting the cost
function outputCost(project){
    let object = hashmap[key];
    let cost = object.cost;

    const display = document.getElementsByClassName(project + "_cost")[0];
    display.textContent = cost;
}


// Hiding the passive container
function displayPassiveContainer(){
    const container = document.getElementsByClassName("passive_container")[0];
    console.log(container)
    console.log(container.style.display)
    if(container.style.display == "none"){
        container.style.display = "flex";
    } else {
        container.style.display = "none";
    }
}

function displayLanguageContainer(){
    const container = document.getElementsByClassName("active_container")[0];
    if(container.style.display === "none"){
        container.style.display = "flex";
    } else {
        container.style.display = "none";
    }
}


// When a user purchases a new language the next one will be unlocked
function purchaseLanguage(currentLanguage, nextLanguage){
    const total_display = document.getElementsByClassName("total_display")[0];
    let total = parseInt(localStorage.getItem("total"));

    console.log(total)
    if(total >= parseInt(hashmap[currentLanguage].cost)){
        total -= hashmap[currentLanguage].cost;
        localStorage.setItem("total", total);
        total_display.textContent = total;
        hashmap[nextLanguage].purchased = true;
        document.getElementsByClassName(nextLanguage + "_button")[0].style.display = "flex";
    }
}


passiveImplementation();