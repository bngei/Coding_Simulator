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
function increaseTotal(value){
    total += value;
    totalDisplay.textContent = total;
    localStorage.setItem("total", total);
}


// Function that purchases a project and outputs the information
function purchaseProject(currentProject, nextProject){
    if(total >= projectHashmap[currentProject].cost){
        // Buying the project
        projectHashmap[currentProject].totalOwned += 1;

        passive += parseInt(projectHashmap[currentProject].increase);
        total -= parseInt(projectHashmap[currentProject].cost);

        // Updating the cost
        projectHashmap[currentProject].cost = Math.floor(projectHashmap[currentProject].cost * 1.15);

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
        localStorage.setItem("projectHashmap", JSON.stringify(projectHashmap));
    }
}


// When a user purchases a new language the next one will be unlocked
function purchaseLanguage(currentLanguage, nextLanguage){
    if(total >= parseInt(languageHashmap[currentLanguage].cost) && languageHashmap[currentLanguage].purchased == false){
        total -= languageHashmap[currentLanguage].cost;
        languageHashmap[currentLanguage].purchased = true;
        totalDisplay.textContent = total;
        document.getElementsByClassName(nextLanguage + "Button")[0].style.display = "flex";
        localStorage.setItem("total", total);
        localStorage.setItem("languageHashmap", JSON.stringify(languageHashmap));
    }
} 


// Activate a language and deactivate the others
function activateLanguage(currentLanguage){
    languageHashmap[currentLanguage].active = true;
    for(let key in languageHashmap){
        if(key === currentLanguage && languageHashmap[key].purchased === true){
            updateCode(currentLanguage);
            languageHashmap[key].active = true;
            document.getElementsByClassName(key + "Button")[0].style.backgroundColor = "#8ec07c";
        } else {
            languageHashmap[key].active = false;
            document.getElementsByClassName(key + "Button")[0].style.backgroundColor = "burlywood";
        }
    }
    localStorage.setItem("languageHashmap", JSON.stringify(languageHashmap));
}


// Returns the active language
function getActiveLanguage(){
    for(let key in languageHashmap){
        if(languageHashmap[key].active === true){
            return key;
        }
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

    costDisplay.textContent = projectHashmap[project].cost;
    totalOwnedDisplay.textContent = projectHashmap[project].totalOwned;
    increaseDisplay.textContent = projectHashmap[project].increase;
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

            if(projectHashmap[className].totalOwned > 0){
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
    } else {
        container.style.display = "none";
    }
}


// Display the purchased languages
function displayLanguages(){
    const activeContainer = document.querySelector('.activeContainer');
    const buttons = activeContainer.querySelectorAll('button');
    for(let i = 0; i < buttons.length; i++){
        let className = buttons[i].className;
        className = className.substring(0, className.length - "Button".length);
        if(languageHashmap[className].purchased === true){
            buttons[i].style.display = "block";
        } else {
            buttons[i].style.display = "block";
            return;
        }
    }
}


// Displaying the ide container
function displayIdeContainer(){
    const container = document.getElementsByClassName("ideContainer")[0];
    if(container.style.display === "none"){
        container.style.display = "block";
    } else {
        container.style.display = "none";
    }
}


// Updating the new code line 
function updateCode(language){
    const codeElement = document.getElementsByClassName("code")[0];
    const codeString = document.querySelector(".code").textContent.replace("Code the following line:", "").trim();
    let index = languageHashmap[language].code.indexOf(codeString)
    const hashmap = languageHashmap[language].code;
    if(index + 1 < hashmap.length){
        index += 1;
    } else {
        index = 0;
    }
    console.log(hashmap[index])
    if(language === "html"){
        codeElement.textContent = "Code the following line:\n" + hashmap[index];
    } else {
        codeElement.innerHTML = "Code the following line:<br>" + hashmap[index];
    }
}


// Enter the code in the ide
function enterCode(){
    const codeString = document.querySelector(".code").textContent.replace("Code the following line:", "").trim();
    let userInput = document.querySelector(".ideTextarea");
    if(codeString === userInput.value){
        userInput.value = "";
        const activeLanguage = getActiveLanguage();
        increaseTotal(parseInt(languageHashmap[activeLanguage].payout));
        updateCode(activeLanguage);
    } else {
        console.log("Syntax Error");
    }
}


// Restarting the game
function restartGame(){
    localStorage.clear();
    location.reload();
}


// API
async function getJoke(){ 
    try {
        const response = await fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart');
        const data = await response.json();    

        let setupElement = document.querySelector(".setup");
        let deliveryElement = document.querySelector(".delivery");
        setupElement.textContent = data.setup;
        deliveryElement.textContent = data.delivery;
    } catch (error) {
        console.log(error);
    }
}


getJoke();
setInterval(getJoke, 20000);
displayLanguages();
passiveImplementation();