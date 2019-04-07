// Engelsk / Norsk / Beskrivelse / skal vises
var aEngelskNorsk = [
    ["apple", "eple", "", true],
    ["asparagus", "aspergers",  true],
    ["bacon", "bacon", true],
    ["bread","brød", "", true],
    ["bun","hamburgerbrød", "", true],
    ["cheddar","cheddar", "", true],
    ["cheese","ost", "", true],
    ["cream", "kremfløte", "", true],
    ["chocolate", "sjokolade", true],
    ["cinnamon", "kanel", true],
    ["coffe", "kaffe", true],
    ["croissant", "croissant", true],
    ["cucumber", "agurk", true],
    ["fish", "fisk", "", true],
    ["french fries","pommes frites", "", true],
    ["grilled salmon", "grillet laks", "", true],
    ["garlic", "hvitløk", true],
    ["green paprika", "grønn paprika", true],
    ["hamburger","hamburger", "", true],
    ["ham", "skinke", true],
    ["honey", "honning", true],
    ["jam", "syltetøy", "", true],
    ["ketchup","ketchup", "", true],
    ["lettuce","salat", "", true],
    ["lemon", "sitron", true],
    ["meat","kjøtt", "", true],
    ["mayonnaise","majones", "", true],
    ["mushroom", "sopp", true],
    ["mustard", "sennep", true],
    ["onion", "løk", true],
    ["orange", "appelsin", true],
    ["pancake", "pannekake", true],
    ["parmesan", "parmesan", true],
    ["pepper", "pepper", true],
    ["pepperoni", "pepperoni", true],
    ["pizza", "pizza", true],
    ["rasberry", "bringebær", true],
    ["rice", "ris", true],
    //["sandwich","sandwich", "", false],
    ["salad","salat", "", true],
    //["seafood", "sjømat", "", false],
    ["steak", "biff", "", true],
    ["beef", "biff", "", true],
    ["sour cream", "rømme", "", true],
    ["salmon", "laks", "", true],
    ["salmon steak", "laksebiff", "", true],
    //["sweet", "søtt", "", false],
    ["salami", "salami", true],
    //["sandwich", "smørrbrød", false],
    ["sausage", "pølse", true],
    ["spinach", "spinat", true],    
    ["strawberry", "jordbær", true],
    ["syrup", "sirup", true],
    ["tomato sauce", "tomat saus", true],
    ["turkey", "kalkun", true],
    ["tomato","tomat", "", true],
    ["trout", "ørret",  true],
    //["vegetable","grønnsaker", "", false],
    ["waffle", "vaffel", "", true],
    ["mozzarella", "mozzarella", "", true],
    ["chicken", "kylling", true],
    ["maple syrup", "lønnesirup", "", true]
];

function translate(sWord) {
    //console.log(sWord);
    //var bFound = false;

    for (var i=0; i<aEngelskNorsk.length; i++) {
        if (sWord === aEngelskNorsk[i][0]) {
            sWord = aEngelskNorsk[i][1];
            i=aEngelskNorsk.length;
        }
    }
    return sWord;
}

// Sjekke om true og skal skrives ut i lista
function checkIfPrint(sWord) {
    //console.log(sWord);
    var bPrint = false;
    for (var i=0; i<aEngelskNorsk.length; i++) {
        //console.log(i);
        if (sWord === aEngelskNorsk[i][0]) {
            bPrint = aEngelskNorsk[i][3]
        }
    }
    return bPrint;
    
}