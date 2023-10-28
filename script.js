// Global variables
let totalDisplay = document.getElementsByClassName("totalDisplay")[0];
let passiveDisplay = document.getElementsByClassName("passiveDisplay")[0];
let total = parseInt(localStorage.getItem("total")) || 0;
let passive = parseInt(localStorage.getItem("passive")) || 0;


// Initalizing total counter
if(total === null || isNaN(total)){
    total = parseInt(0);
    localStorage.setItem("total", 0);
} else {
    total = parseInt(total);
    totalDisplay.textContent = total;
}


// Initalizing passive counter
if(passive === null){
    passive = 0;
    localStorage.setItem("passive", 0);
} else {
    passive = parseInt(passive);
    passiveDisplay.textContent = passive + " per second";
}


// Adding incrementing functionality
function clickingIncrementor(){
    total += 10000000000;
    totalDisplay.textContent = total;
    localStorage.setItem("total", total);
}


// Function that purchases a project and outputs the information
function purchaseProject(currentProject, nextProject){
    if(total >= hashmap[currentProject].cost){
        // Buying the project
        hashmap[currentProject].totalOwned += 1;

        passive += parseInt(hashmap[currentProject].increase);
        total -= parseInt(hashmap[currentProject].cost);

        // Updating the cost
        hashmap[currentProject].cost = Math.floor(hashmap[currentProject].cost * 1.15);

        // Displaying all information
        passiveDisplay.textContent = passive + " per second";
        totalDisplay.textContent = total;

        // Displaying next project
        document.getElementsByClassName(nextProject + "Container")[0].style.display = "block"; 
        displayInfo(nextProject);
        displayInfo(currentProject);

        // Updating the local storage
        localStorage.setItem("total", total);
        localStorage.setItem("passive", passive);
        localStorage.setItem("hashmap", JSON.stringify(hashmap));
    }
}


// When a user purchases a new language the next one will be unlocked
function purchaseLanguage(currentLanguage, nextLanguage){
    if(total >= parseInt(hashmap[currentLanguage].cost) && hashmap[currentLanguage].purchased == false){
        total -= hashmap[currentLanguage].cost;
        hashmap[currentLanguage].purchased = true;
        totalDisplay.textContent = total;
        document.getElementsByClassName(nextLanguage + "Button")[0].style.display = "flex";
        localStorage.setItem("total", total);
        localStorage.setItem("hashmap", JSON.stringify(hashmap));
    }
} 


// Adding passive implementation
function passiveImplementation(){
    setInterval(function(){    
        total += passive;
        localStorage.setItem("total", total);
        totalDisplay.textContent = total;
    }, 1000);
}


// Displaying the project's information
function displayInfo(project){
    const costDisplay = document.getElementsByClassName(project + "Cost")[0];
    const totalOwnedDisplay = document.getElementsByClassName(project + "TotalOwned")[0];
    const increaseDisplay = document.getElementsByClassName(project + "Increase")[0];

    costDisplay.textContent = hashmap[project].cost;
    totalOwnedDisplay.textContent = hashmap[project].totalOwned;
    increaseDisplay.textContent = hashmap[project].increase;
}


// Displaying the passive container
function displayPassiveContainer(){
    const container = document.getElementsByClassName("passiveContainer")[0];
    if(container.style.display == "none"){
        container.style.display = "flex";
        let passiveContainer = document.querySelector('.passiveContainer');
        let containerElements = passiveContainer.querySelectorAll('.passiveContainer > div[class$="Container"]');

        for(let i = 0; i < containerElements.length; i++){
            let className = containerElements[i].className;
            className = className.substring(0, className.length - "Container".length);
            displayInfo(className);

            if(hashmap[className].totalOwned > 0){
                containerElements[i].style.display = "block";
            } else {
                containerElements[i].style.display = "block";
                return;
            }
        }
    } else {
        container.style.display = "none";
    }
}


// Displaying the active container
function displayActiveContainer(){
    const container = document.getElementsByClassName("activeContainer")[0];
    if(container.style.display === "none"){
        container.style.display = "flex";
        let activeContainer = document.querySelector('.activeContainer');
        let buttons = activeContainer.querySelectorAll('button');

        for(let i = 0; i < buttons.length; i++){
            let className = buttons[i].className;
            className = className.substring(0, className.length - "Button".length);
            if(hashmap[className].purchased === true){
                buttons[i].style.display = "block";
            } else {
                buttons[i].style.display = "block";
                return;
            }
        }
    } else {
        container.style.display = "none";
    }
}


// Displaying the ide container
function displayIdeContainer(){
    const container = document.getElementsByClassName("ideContainer")[0];
    if(container.style.display === "none"){
        container.style.display = "flex";
    } else {
        container.style.display = "none";
    }
}


// Restarting the game
function restartGame(){
    localStorage.clear();
    location.reload();
}


passiveImplementation();