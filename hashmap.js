// Creating project hashmap
let projectHashmap = localStorage.getItem("projectHashmap");
if(projectHashmap === null){
    projectHashmap = {
        basicWebsite: {
            cost: 10,
            increase: 1.00,
            totalOwned: 0,
            display: false
        },
        toDoList: {
            cost: 50.00,
            increase: 5.00,
            totalOwned: 0
        },
        portfolioWebsite: {
            cost: 500.00,
            increase: 10.00,
            totalOwned: 0 
        },
        weatherApp: {
            cost: 1000.00,
            increase: 50.00,
            totalOwned: 0
        },
        blogPlatform: {
            cost: 5000.00,
            increase: 100.00,
            totalOwned: 0
        },
        eCommerceWebsite: {
            cost: 20000.00,
            increase: 500.00,
            totalOwned: 0
        },
        mobileApp: {
            cost: 100000.00,
            increase: 1000.00,
            totalOwned: 0
        },
        socialMediaPlatform: {
            cost: 500000.00,
            increase: 5000.00,
            totalOwned: 0
        },
        videoGame: {
            cost: 1000000.00,
            increase: 10000.00,
            totalOwned: 0
        },
        searchEngine: {
            cost: 10000000.00,
            increase: 50000.00,
            totalOwned: 0
        },
        operatingSystem: {
            cost: 1000000000.00,
            increase: 100000.00,
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
            payout: 59999999999999,
            purchased: false,
            active: false,
            code: [
                'print("Hello World!")',
                'value = 5',
                'return(2+3)'
            ]
        },
        html: {
            cost: 500,
            payout: 50,
            purchased: false,
            active: false,
            code: [
                '<p>Hello World!</p>',
                '<p>Value: 50</p>',
                '<p>25+25</p>'
            ]
        },
        javascript: {  
            cost: 5000, 
            payout: 500,
            purchased: false,
            active: false,
            code: [
                'console.log("Hello World!")',
                'var value = 500',
                'return(250+250)'
            ]
        },
        php: {
            cost: 50000,
            payout: 5000,
            purchased: false,
            active: false,
            code: [
                'echo "Hello World!"',
                '$value = 5000',
                'return(2500+2500)'
            ]
        },
        r: {
            cost: 500000,
            payout: 50000,
            purchased: false,
            active: false,
            code: [
                
                'print("Hello World!")',
                'value <- 50000',
                'return(25000+25000)'
            ]
        },
        mysql: {
            cost: 5000000,
            payout: 500000,
            purchased: false,
            active: false,
            code: [
                'SELECT * FROM table;',
                'value = 500000',
                'RETURN 250000+250000;'
            ]
        },
        cpp: {
            cost: 50000000,
            payout: 1000000,
            purchased: false,
            active: false,
            code: [
                'cout << "Hello World!" << endl;',
                'int value = 1000000;',
                'return(500000+500000);'
            ]
        },
        assembly: {
            cost: 500000000,
            payout: 50000000,
            purchased: false,
            active: false,
            code: [
                "msg db 'Hello, world!', 0xa",
                'value db 50000000',
                'mov eax, 50000000'
            ]
        },
        malbolge: {
            cost: 5000000000,
            payout: 500000000,
            purchased: false,
            active: false,
            code: [
                "('&%:9]!~}|z2Vxwv-,POqponl$Hjig%eB@@>}=<M:9wv6WsU2T|nm-,jcL(I&%$#`CB]V?Tx<uVtT`Rpo3NlF.Jh++FdbCBA@?]!~|4XzyTT43Qsqq(LnmkjFhg${z@>",
                "'&%$#>=<;492765.Rsrqponmlk#('~}$#yx>_^][ZYXWVUTSRQPONMibgf_dcba`Y}]VUZYXWPOsSRQPON0Fj-,+*)('&%$#!~}|{zyxwvutsrqponm+*)('&%$#cb~`={zs9Zpun4l2pohgf,+*)('&%p"
            ]
        },
        cow: {
            cost: 50000000000,
            payout: 5000000000,
            purchased: false,
            active: false,
            code: [
                'OOOMoOMoOMoOMoOMoOMoOMoOMoOMMMmoOMMMMMMmoOMMMMOOMOomOoMoOmoOmoomOoMMMmoOMMMMMMmoOMMMMOOMOomOoMoOmoOmoomOoMMMmoOMMMMMMmoOMMMMOOMOomOoMoOmoOmooOOOmoOOOOmOomOoMMMmoOMMMMOOMOomoOMoOmOomoomoOMoOMoOMoOMoOMoOMoOMoOMoOMoomOoOOOmoOOOOmOomOoMMMmoOMMMMOOMOomoOMoOmOomoomOomOoMMMmoOmoOMMMMOOMOomoOMoOmOomoomoOMoOMoOMoOMoOMoOMoomOoOOOmoOOOOmOomOoMMMmoOMMMMOOMOomoOMoOmOomoomOomOoMMMmoOmoOMMMMOOMOomoOMoOmOomoomoOMoOMoOMoOMoOMoOMoOMoOMoOMoOMoOMoOMoOMoomOoOOOmoOOOOmOomOoMMMmoOMMMMOOMOomoOMoOmOomoomOomOoMMMmoOmoOMMMMOOMOomoOMoOmOomoomoOMoOMoOMoOMoOMoOMoOMoOMoOMoOMoOMoOMoOMoomOoOOOmoOOOOmOomOoMMMmoOMMMMOOMOomoOMoOmOomoomOomOoMMMmoOmoOMMMMOOMOomoOMoOmOomoomoOMoOMoOMoOMoOMoOMoOMoOMoOMoOMoOMoOMoOMoOMoOMoOMoomOoOOOmoOOOOmOomOomOomOoMMMmoOmoOmoOMMMMOOMOomoOMoOmOomoomoOMoOMoOMoOMoOMoOMoOMoOMoOMoOMoOMoOMoOMoOMoOMoOMoOMoomOoOOOmoOOOOmOomOoMMMmoOMMMMOOMOomoOMoOmOomoomOomOomOoMMMmoOmoOmoOMMMMOOMOomoOMoOmOomoomoOMoOMoOMoOMoOMoOMoOMoOMoomOoOOOmoOOOOmOomOoMMMmoOMMMMOOMOomoOMoOmOomoomOomOoMMMmoOmoOMMMMOOMOomoOMoOmOomoomoOMoOMoOMoOMoOMoOMoOMoOMoOMoOMoOMoOMoOMoOMoOMoOMoomOoOOOmoOOOOmOomOoMMMmoOMMMMOOMOomoOMoOmOomoomOomOoMMMmoOmoOMMMMOOMOomoOMoOmOomoomOomOomOoMMMmoOmoOmoOMMMMOOMOomoOMoOmOomoomoOMoOMoOMoomOoOOOmoOOOOmOomOoMMMmoOMMMMOOMOomoOMoOmOomoomOomOoMMMmoOmoOMMMMOOMOomoOMoOmOomoomoOMoOMoOMoOMoOMoOMoOMoOMoOMoOMoOMoOMoOMoomOoOOOmoOOOOmOomOoMMMmoOMMMMOOMOomoOMoOmOomoomOomOoMMMmoOmoOMMMMOOMOomoOMoOmOomoomoOMoOMoOMoOMoOMoomOoOOOmoOOOOmOomOomOoMMMmoOmoOMMMMOOMOomoOMoOmOomoomoOMoOMoomOo'
            ]
        }
    }
    localStorage.setItem("languageHashmap", JSON.stringify(languageHashmap))
} else {
    languageHashmap = JSON.parse(languageHashmap);
}


// Creating upgrade hashmap
let upgradeHashmap = localStorage.getItem("upgradeHashmap");
if(upgradeHashmap === null){
    upgradeHashmap = {
        basicWebsite: {
            cost: 100,
            purchased: false,
            display: false,
            text: "Increases the payout of basic websites by 15%"
        },
        toDoList: {
            cost: 500,
            purchased: false,
            display: false,
            text: "Increases the payout of to-do-lists by 15%"
        },
        portfolioWebsite: {
            cost: 5000,
            purchased: false,
            display: false,
            text: "Increases the payout of portfolio websites by 15%"
        },
        weatherApp: {
            cost: 10000,
            purchased: false,
            display: false,
            text: "Increases the payout of weather apps by 15%"
        },
        blogPlatform: {
            cost: 50000,
            purchased: false,
            display: false,
            text: "Increases the payout of blog platforms by 15%"
        },
        eCommerceWebsite: {
            cost: 200000,
            purchased: false,
            display: false,
            text: "Increases the payout of e-commerce websites by 15%"
        },
        mobileApp: {
            cost: 1000000,
            purchased: false,
            display: false,
            text: "Increases the payout of mobile apps by 15%"
        },
        socialMediaPlatform: {
            cost: 5000000,
            purchased: false,
            display: false,
            text: "Increases the payout of social media platforms by 15%"
        },
        videoGame: {
            cost: 10000000,
            purchased: false,
            display: false,
            text: "Increases the payout of video games by 15%"
        },
        searchEngine: {
            cost: 100000000,
            purchased: false,
            display: false,
            text: "Increases the payout of search engines by 15%"
        },
        operatingSystem: {
            cost: 10000000000,
            purchased: false,
            display: false,
            text: "Increases the payout of operating systems by 15%"
        },
        projects: {
            cost: 1,
            purchased: false,
            display: false,
            text: "Increases the payout of all projects by 15%"
        },
        languages: {
            cost: 2,
            purchased: false,
            display: false,
            text: "Increases the payout of coding by 15%"
        }
    }
    localStorage.setItem("upgradeHashmap", JSON.stringify(upgradeHashmap))
} else {
    upgradeHashmap = JSON.parse(upgradeHashmap);
}
