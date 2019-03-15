function transalte(sWord) {
    //console.log(sWord);
    var aEngelskNorsk = [
        ["lettuce","salat"],
        ["salad","salat"],
        ["tomato","tomat"],
        ["bread","brød"],
        ["sandwich","sandwich"],
        ["cheese","ost"],
        ["bun","hamburgerbrød"],
        ["hamburger","hamburger"],
        ["ketchup","ketchup"],
        ["meat","kjøtt"],
        ["mayonnaise","majones"],
        ["french fries","pommes frites"],
        ["cheddar","cheddar"],
        ["vegetable","grønnsaker"],
        ["apple", "eple"],
        ["waffle", "vaffel"],
        ["sour cream", "rømme"],
        ["salmon", "laks"],
        ["salmon steak", "lakse biff"],
        ["grilled salmon", "grillet laks"],
        ["fish", "fisk"],
        ["seafood", "sjømat"],
        ["steak", "biff"],
        ["mozarella", "mozarella"],
        ["cream", "krem"],
        ["sweet", "søtt"],
        ["jam", "syltetøy"]
        
        
        
    ];
    //console.log(aEngelskNorsk);
    var bFound = false;

    /*do 
    {*/
        for (var i=0; i<aEngelskNorsk.length; i++) {
            /*console.log(sWord);
            console.log(aEngelskNorsk[i][0]);
            console.log(sWord == aEngelskNorsk[i][0]);
            console.log(sWord === aEngelskNorsk[i][0]);
            console.log();*/
            
            if (sWord === aEngelskNorsk[i][0]) {
                sWord = aEngelskNorsk[i][1];
                i=aEngelskNorsk.length;
            }
        }
        //console.log(i);
    //} while(!bFound)
    //console.log(sWord);
    
    return sWord;
}