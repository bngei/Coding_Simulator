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
            cost: 1000,
            increase: 500,
            total_owned: 0
        },
        mobile_app: {
            cost: 50000,
            increase: 1000,
            total_owned: 0
        },
        social_media_platform: {
            cost: 100000,
            increase: 5000,
            total_owned: 0
        },
        video_game: {
            cost: 500000,
            increase: 10000,
            total_owned: 0
        },
        search_engine: {
            cost: 1000000,
            increase: 50000,
            total_owned: 0
        },
        operating_system: {
            cost: 10000000,
            increase: 100000,
            total_owned: 0
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

    total += 1;
    display.textContent = total;
    localStorage.setItem("total", total);
}


// Adding passive incrementing functionality
function passiveIncrementor(name) {
    const passive_display = document.getElementsByClassName("passive_display")[0];
    const total_display = document.getElementsByClassName("total_display")[0];
    let total = localStorage.getItem("total");

    let object = hashmap[name];
    if(total >= object.cost && object)
    {
        passive += object.increase;
        total -= object.cost;

        passive_display.textContent = passive + " per second";
        total_display.textContent = total;

        localStorage.setItem("total", total);
        localStorage.setItem("passive", passive);

        object.total_owned += 1;
        object.cost = Math.floor(object.cost * 1.15);
        outputCost(name);
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
function outputCost(){
    for(const key in hashmap){
        let object = hashmap[key];
        let cost = object.cost;
        let class_name = key + "_cost";

        const display = document.getElementsByClassName(class_name)[0];
        display.textContent = cost;
    }
}

passiveImplementation();
outputCost();


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