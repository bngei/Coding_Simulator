// Global variables
let totalDisplay = document.getElementsByClassName("totalDisplay")[0];
let passiveDisplay = document.getElementsByClassName("passiveDisplay")[0];
let total = parseFloat(localStorage.getItem("total")) || 0;
let passive = parseFloat(localStorage.getItem("passive")) || 0;


// Initalizing total counter
if(total === null || isNaN(total)){
    total = parseFloat(0.00);
    localStorage.setItem("total", 0.00);
} else {
    total = parseFloat(total);
    totalDisplay.textContent = total.toFixed(2);
}


// Initalizing passive counter
if(passive === null){
    passive = 0.00;
    localStorage.setItem("passive", 0.00);
} else {
    passive = parseFloat(passive);
    passiveDisplay.textContent = passive.toFixed(2) + " per second";
}


// Adding incrementing functionality
function increaseTotal(value){
    total += value;
    totalDisplay.textContent = total.toFixed(2);
    localStorage.setItem("total", total);
}


// Update passive income
function calculatePassive(){
    let newPassive = 0.00;
    for(let project in projectHashmap){
        if(projectHashmap[project].totalOwned > 0){
            
            let increase = parseFloat(projectHashmap[project].increase);
            let totalOwned = parseFloat(projectHashmap[project].totalOwned);

            newPassive += parseFloat((increase * totalOwned).toFixed(2));
        }
    }
    passiveDisplay.textContent = newPassive + " per second";
    localStorage.setItem("passive", newPassive);
}


// Save hashmaps in local storage
function saveHashmaps(){
    localStorage.setItem("projectHashmap", JSON.stringify(projectHashmap));
    localStorage.setItem("languageHashmap", JSON.stringify(languageHashmap));
    localStorage.setItem("upgradeHashmap", JSON.stringify(upgradeHashmap));
}


// Function that purchases a project and outputs the information
function purchaseProject(currentProject, nextProject){
    if(total >= projectHashmap[currentProject].cost){
        // Buying the project
        projectHashmap[currentProject].totalOwned += 1;
        passive += parseFloat(projectHashmap[currentProject].increase);
        total -= parseFloat(projectHashmap[currentProject].cost);
        projectHashmap[currentProject].cost = (projectHashmap[currentProject].cost * 1.15).toFixed(2);

        // Displaying passive and total
        passiveDisplay.textContent = passive.toFixed(2) + " per second";
        totalDisplay.textContent = total.toFixed(2);

        // Displaying next project
        document.getElementsByClassName(nextProject + "Container")[0].style.display = "block"; 
        displayInfo(nextProject);
        displayInfo(currentProject);

        // Displaying the current project's upgrade
        if(upgradeHashmap[currentProject].purchased === false){
            upgradeHashmap[currentProject].display = true;
            document.getElementById(currentProject + "Upgrade").style.display = "block";
        }

        // Displaying upgrade container
        if(currentProject == "basicWebsite" && upgradeHashmap["basicWebsite"].opened == false){
            upgradeHashmap["basicWebsite"].opened = true;
            displayUpgradeContainer();
        }

        // Updating the local storage
        localStorage.setItem("total", total);
        localStorage.setItem("passive", passive);
        saveHashmaps();
        calculatePassive();
    }

    if(currentProject == "weatherApp" || currentProject == "socialMediaPlatform"){
        displayGeneralUpgrade();
    }
}


// When a user purchases a new language the next one will be unlocked
function purchaseLanguage(currentLanguage, nextLanguage){
    if(total >= parseFloat(languageHashmap[currentLanguage].cost) && languageHashmap[currentLanguage].purchased == false){
        total -= languageHashmap[currentLanguage].cost;
        languageHashmap[currentLanguage].purchased = true;
        totalDisplay.textContent = total.toFixed(2);
        document.getElementsByClassName(nextLanguage + "Button")[0].style.display = "flex";
        localStorage.setItem("total", total);
        saveHashmaps();
    }
} 


// Purchases an upgrade and hide it from the upgrade container
function purchaseUpgrade(project){
    if(total >= upgradeHashmap[project].cost){
        // Buying and hiding the upgrade
        total -= upgradeHashmap[project].cost;
        totalDisplay.textContent = total.toFixed(2);
        upgradeHashmap[project].purchased = true;
        upgradeHashmap[project].display = false;
        document.getElementById(project + "Upgrade").style.display = "none";

        // Increasing the income of the project by 15%
        projectHashmap[project].increase = (projectHashmap[project].increase * 1.15).toFixed(2);

        // localStorage.setItem("passive", passive + )
        displayInfo(project);
        localStorage.setItem("total", total);
        saveHashmaps();
        calculatePassive();
    }
}


// Purchases the language upgrade
function purchaseLanguageUpgrade(){
    if(total >= upgradeHashmap["language"].cost){
        for(let key in languageHashmap){
            languageHashmap[key].payout = (languageHashmap[key].payout * 1.15).toFixed(2);
        }

        total -= upgradeHashmap["language"].cost;
        totalDisplay.textContent = total.toFixed(2);
        upgradeHashmap["language"].purchased = true;
        upgradeHashmap["language"].display = false;
        document.getElementById("languageUpgrade").style.display = "none";
        localStorage.setItem("total", total);
        saveHashmaps();
    }
}


// Purchases the project upgrade
function purchaseProjectUpgrade(){
    if(total >= upgradeHashmap["project"].cost){
        for(let key in projectHashmap){
            projectHashmap[key].increase = (projectHashmap[key].increase * 1.15).toFixed(2);
            displayInfo(key);
        }

        total -= upgradeHashmap["project"].cost;
        totalDisplay.textContent = total.toFixed(2);
        upgradeHashmap["project"].purchased = true;
        upgradeHashmap["project"].display = false;
        document.getElementById("projectUpgrade").style.display = "none";
        localStorage.setItem("total", total);
        saveHashmaps();
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
    saveHashmaps();
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
        localStorage.setItem("total", total.toFixed(2));
        totalDisplay.textContent = total.toFixed(2);
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
function displayProjectContainer(){
    const container = document.getElementsByClassName("projectContainer")[0];
    if(container.style.display == "none"){
        projectHashmap["basicWebsite"].display = true;
        container.style.display = "flex";
        let projectContainer = document.querySelector('.projectContainer');
        let containerElements = projectContainer.querySelectorAll('.projectContainer > div[class$="Container"]');

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


// Displaying the description for each passive projects
function displayDescription(){
    let infoElements = document.querySelectorAll('.info');
    let descriptionElements = document.querySelectorAll('.description');
    if(infoElements[0].style.display === "none"){
        for(let i = 0; i < infoElements.length; i++){
            infoElements[i].style.display = "block";
        }
        for(let i = 0; i < descriptionElements.length; i++){
            descriptionElements[i].style.display = "none";
        }   
    } else {
        for(let i = 0; i < infoElements.length; i++){
            infoElements[i].style.display = "none";
        }
        for(let i = 0; i < descriptionElements.length; i++){
            descriptionElements[i].style.display = "block";
        }
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


// Displaying the upgrade container
function displayUpgradeContainer() {
    const upgradeContainer = document.getElementsByClassName("upgradeContainer")[0];
    const container = document.getElementsByClassName("upgrades");
    if(upgradeContainer.style.display === "none"){
        upgradeContainer.style.display = "block";
        for(let i = 0; i < container.length; i++){
            let id = container[i].id;
            id = id.substring(0, id.length - "Upgrade".length);
            if(upgradeHashmap[id].display === true && upgradeHashmap[id].purchased === false){
                document.getElementById(id + "Upgrade").style.display = "flex";
            } else {
                document.getElementById(id + "Upgrade").style.display = "none";
            }
        }
    } else {
        upgradeContainer.style.display = "none";
    }
}


// Updating the upgrade description when hovered over
function setUpgradeText(project){
    // Get the upgradeText span element
    let upgradeTextElement = document.querySelector('.upgradeText');
        
    // Set the content of the upgradeText span
    if (upgradeTextElement) {
        upgradeTextElement.textContent = upgradeHashmap[project].text;
    }
}


// Displaying the languages and projects upgrades
function displayGeneralUpgrade() {
    if(upgradeHashmap["language"].display == false){
        upgradeHashmap["language"].display = true;
        document.getElementById("languageUpgrade").style.display = "block";
    }
    else {
        upgradeHashmap["project"].display = true;
        document.getElementById("projectUpgrade").style.display = "block";
    }
    saveHashmaps();
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
        increaseTotal(parseFloat(languageHashmap[activeLanguage].payout));
        updateCode(activeLanguage);
    } else {
        console.log("Syntax Error");
    }

    if(projectHashmap["basicWebsite"].display == false && total >= 10){
        projectHashmap["basicWebsite"].display = true;
        saveHashmaps();
        displayProjectContainer();
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


// Listen for the enter key for the IDE
let ideTextarea = document.querySelector(".ideTextarea");
if (ideTextarea) {
    ideTextarea.addEventListener("keydown", function(event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault(); // Prevent the default behavior of the Enter key (new line)
            enterCode();
        }
    });
}


getJoke();
setInterval(getJoke, 20000);
displayLanguages();
passiveImplementation();