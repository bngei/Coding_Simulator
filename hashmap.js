// Creating hashmap
let projectHashmap = localStorage.getItem("projectHashmap");
if(projectHashmap === null){
    projectHashmap = {
        basicWebsite: {
            cost: 10,
            increase: 1,
            totalOwned: 0
        },
        toDoList: {
            cost: 50,
            increase: 5,
            totalOwned: 0
        },
        weatherApp: {
            cost: 500,
            increase: 10,
            totalOwned: 0
        },
        portfolioWebsite: {
            cost: 1000,
            increase: 50,
            totalOwned: 0 
        },
        blogPlatform: {
            cost: 5000,
            increase: 100,
            totalOwned: 0
        },
        eCommerceWebsite: {
            cost: 20000,
            increase: 500,
            totalOwned: 0
        },
        mobileApp: {
            cost: 100000,
            increase: 1000,
            totalOwned: 0
        },
        socialMediaPlatform: {
            cost: 500000,
            increase: 5000,
            totalOwned: 0
        },
        videoGame: {
            cost: 1000000,
            increase: 10000,
            totalOwned: 0
        },
        searchEngine: {
            cost: 10000000,
            increase: 50000,
            totalOwned: 0
        },
        operatingSystem: {
            cost: 1000000000,
            increase: 100000,
            totalOwned: 0
        }
    }
    localStorage.setItem("projectHashmap", JSON.stringify(projectHashmap))
} else {
    projectHashmap = JSON.parse(projectHashmap);
}

// Creating language hashmap
let languageHashmap = localStorage.getItem("languageHashmap");
if(languageHashmap === null){
    languageHashmap = {
        python: {
        cost: 0,
        purchased: false,
        active: false,
        code: [
            'print("Hello World!")'
            ]
        },
        cpp: {
            cost: 500,
            purchased: false,
            active: false
        },
        javascript: {  
            cost: 5000, 
            purchased: false,
            active: false
        },
        html: {
            cost: 50000,
            purchased: false,
            active: false
        },
        php: {
            cost: 500000,
            purchased: false,
            active: false
        },
        mysql: {
            cost: 5000000,
            purchased: false,
            active: false
        },
        r: {
            cost: 50000000,
            purchased: false,
            active: false
        },
        assembly: {
            cost: 500000000,
            purchased: false,
            active: false
        },
        malbolge: {
            cost: 5000000000,
            purchased: false,
            active: false
        },
        cow: {
            cost: 50000000000,
            purchased: false,
            active: false
        }
    }
    localStorage.setItem("languageHashmap", JSON.stringify(languageHashmap))
} else {
    languageHashmap = JSON.parse(languageHashmap);
}