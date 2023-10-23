// Creating passive objects
let hashmap = {
    lemonade_stand: {
        cost: 10,
        increase: 1,
        total_owned: 0
    },
    newspaper_delivery: {
        cost: 50,
        increase: 5,
        total_owned: 0
    },
    car_wash: {
        cost: 100,
        increase: 10,
        total_owned: 0
    },
    pizza_delivery: {
        cost: 500,
        increase: 50,
        total_owned: 0 
    },
}
localStorage.setItem("hashmap", hashmap)


// Initalizing total counter
let total = localStorage.getItem("total");
if(total === null){
    total = 0;
    localStorage.setItem("total", total);
} else {
    total = parseInt(total);
    const display = document.getElementsByClassName("total_display")[0];
    display.textContent = total;
}


// Initalizing passive counter
let passive = localStorage.getItem("passive");
if(passive === null){
    passive = 0;
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
        object.cost = Math.floor(object.cost * 2);
    }
}


// Adding passive implementation
function passiveImplementation() {
    setInterval(function(){
        let total = localStorage.getItem("total");
        let passive = localStorage.getItem("passive");

        total = parseInt(total);
        passive = parseInt(passive);

        total += passive;
        localStorage.setItem("total", total);

        const display = document.getElementsByClassName("total_display")[0];
        display.textContent = total;

    }, 1000);
}


// Outputting the cost
function outputCost(name){
    let object = hashmap[name];
    let cost = object.cost;

    const display = document.getElementsByClassName(name)[0];
    display.textContent = cost;
}