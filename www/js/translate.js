// Engelsk / Norsk / Beskrivelse / skal vises
var aEngelskNorsk = [
    ["apple", "eple", "", true],
    ["asparagus", "aspergers", "",  true],
    ["bacon", "bacon", "", true],
    ["bread","brød", "", true],
    ["bun","hamburgerbrød", "", true],
    ["cheddar","cheddar", "", true],
    ["cheese","ost", "", true],
    ["cream", "kremfløte", "", true],
    ["chocolate", "sjokolade", "", true],
    ["cinnamon", "kanel", "", true],
    ["coffe", "kaffe", "", true],
    ["croissant", "croissant", "", true],
    ["cucumber", "agurk", "", true],
    ["fish", "fisk", "", true],
    ["french fries","pommes frites", "", true],
    ["grilled salmon", "grillet laks", "", true],
    ["garlic", "hvitløk", "", true],
    ["green paprika", "grønn paprika", "", true],
    ["hamburger","hamburger", "", true],
    ["ham", "skinke", "", true],
    ["honey", "honning", "", true],
    ["jam", "syltetøy", "", true],
    ["ketchup","ketchup", "", true],
    ["lettuce","salat", "", true],
    ["lemon", "sitron", "", true],
    ["meat","kjøtt", "", true],
    ["mayonnaise","majones", "", true],
    ["mushroom", "sopp", "", true],
    ["mustard", "sennep", "", true],
    ["onion", "løk", "", true],
    ["orange", "appelsin", "", true],
    ["pancake", "pannekake", "", true],
    ["parmesan", "parmesan", "", true],
    ["pepper", "pepper", "", true],
    ["pepperoni", "pepperoni", "", true],
    ["pizza", "pizza", "", true],
    ["rasberry", "bringebær", "", true],
    ["rice", "ris", "", true],
    ["salad","salat", "", true],
    ["steak", "biff", "", true],
    ["beef", "biff", "", true],
    ["sour cream", "rømme", "", true],
    ["salmon", "laks", "", true],
    ["salmon steak", "laksebiff", "", true],
    ["salami", "salami", "", true],
    ["sausage", "pølse", "", true],
    ["spinach", "spinat", "", true],    
    ["strawberry", "jordbær", "", true],
    ["syrup", "sirup", "", true],
    ["tomato sauce", "tomat saus", "", true],
    ["turkey", "kalkun", "", true],
    ["tomato","tomat", "", true],
    ["trout", "ørret", "", true],
    ["waffle", "vaffel", "", true],
    ["mozzarella", "mozzarella", "", true],
    ["chicken", "kylling", "", true],
    ["maple syrup", "lønnesirup", "", true],
    ["beer", "øl", "", true],
    ["crust", "skorpe", "", true],
    ["doug", "deig", "", true],
    ["sauce", "saus", "", true],
    ["pie", "pai", "", true],
    ["pastry", "bakverk", "", true],
    ["sweet", "søtt", "", true],
    ["basil", "basillikum", "", true],
    ["frozen pizza", "frossen pizza", "", true],
    ["liquor", "brennevin", "", true],
    ["alcohol", "alkohol", "", true],
    ["ice", "is", "", true],
    ["tea", "te", "", true],
    ["coffee", "kaffe", "", true],
    ["water", "vann", "", true],
    ["wine", "vin", "", true],
    ["milk", "melk", "", true],
    ["ginger ale", "ingefærøl", "", true],
    ["lager", "lager", "", true]


];

function translate(sWord) {
    //console.log(sWord);

    for (var i=0; i<aEngelskNorsk.length; i++) {
        if (sWord == aEngelskNorsk[i][0]) {
            sWord = aEngelskNorsk[i][1];
            //i=aEngelskNorsk.length;
            return sWord;
        }
    }
    
    return sWord;
    
    
}

// Sjekke om true og skal skrives ut i lista
function checkIfPrint(sWord) {
    console.log(sWord);
    var bPrint = false;
    for (var i=0; i<aEngelskNorsk.length; i++) {
        //console.log(i);
        if (sWord === aEngelskNorsk[i][0]) {
            bPrint = aEngelskNorsk[i][3]
        }
    }
    return bPrint;
    
}