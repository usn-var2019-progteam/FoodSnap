if (window.sessionStorage.getItem("BrukerId") > 0) {
    var iVisits = window.localStorage.getItem("visits");
    $("#bruker").html(window.sessionStorage.getItem("Brukernavn")+' ('+iVisits+')');
    bodyNotify("Du er nå logget inn!", "success");
    
    //console.log(window.sessionStorage.getItem("BrukerType"));

    // hvis admin så vise admin i menyen
    if (window.sessionStorage.getItem("BrukerType") === "Admin")
        $("#adminPage").show();
    
    // ta bort Registrer / loginn knappen
    $("#Login").hide();
    $("#myPage").show();
}

var g_dKcal = 0;
var g_dFett = 0;
var g_dKarbo = 0;
var g_dProt = 0;
//var g_iCountFoodShown = 0;
var g_iFoodShownCounter = 0; // brukes til å telle antall matvarere som vises

var g_chosenFood = [
    ["",0,0,0,0,""],
    ["",0,0,0,0,""],
    ["",0,0,0,0,""],
    ["",0,0,0,0,""],
    ["",0,0,0,0,""],
    ["",0,0,0,0,""],
    ["",0,0,0,0,""],
    ["",0,0,0,0,""],
    ["",0,0,0,0,""],
    ["",0,0,0,0,""],
    ["",0,0,0,0,""],
    ["",0,0,0,0,""],
    ["",0,0,0,0,""],
    ["",0,0,0,0,""],
    ["",0,0,0,0,""],
    ["",0,0,0,0,""],
    ["",0,0,0,0,""],
    ["",0,0,0,0,""],
    ["",0,0,0,0,""],
    ["",0,0,0,0,""],
    ["",0,0,0,0,""],
    ["",0,0,0,0,""],
    ["",0,0,0,0,""],
    ["",0,0,0,0,""],
    ["",0,0,0,0,""],
    ["",0,0,0,0,""],
    ["",0,0,0,0,""],
    ["",0,0,0,0,""],
    ["",0,0,0,0,""],
    ["",0,0,0,0,""],
    ["",0,0,0,0,""],
    ["",0,0,0,0,""],
    ["",0,0,0,0,""]
];

function ldBarReset() {
    g_dKcal = 0;
    g_dFett = 0;
    g_dKarbo = 0;
    g_dProt = 0;
    activateLdBar(g_dKcal, g_dKarbo, g_dProt, g_dFett);
}

function activateCamera() {
    if (document.getElementById("mypic").hasAttribute("capture"))
        $("#mypic").removeAttr("capture", "environment"); // camera blir front camera
    $("#mypic").trigger('click');
}

$("#taBilde").click(function () {
    $("#mypic").attr("capture", "environment");
    $("#mypic").trigger('click');
});

$("#lastOppBilde").click(function () {
    activateCamera();
});

var input = document.querySelector('input[type=file]'); 
input.onchange = function () {
        
    // reset ldBar
    ldBarReset();
    //resette bilde info
    $("#imageInfo").html("");
    $("#imageInfo").hide();
    
    var file = input.files[0];
    //upload(file);
    drawOnCanvas(file);   
    //displayAsImage(file); 
};

function drawOnCanvas(file) {
    
    var reader = new FileReader();
    reader.onload = function (e) {
        var dataURL = e.target.result,
            c = document.querySelector('canvas'),
            ctx = c.getContext('2d'),
            img = new Image();

        img.onload = function () {
            c.width = img.width;
            c.height = img.height;
            ctx.drawImage(img, 0, 0);
        };

        img.src = dataURL;
        
        analyzeImage(img.src);
        //console.log(img.src);
    };

    reader.readAsDataURL(file);
}

function displayAsImage(file) {
    var imgURL = URL.createObjectURL(file),
        img = document.createElement('img');

    img.onload = function () {
        URL.revokeObjectURL(imgURL);
    };

    img.src = imgURL;
    document.body.appendChild(img);
}

function analyzeImage() {
    $(".loading").show(); // starter spinner for vent på info fra bilde
    
    var file    = document.querySelector('input[type=file]').files[0]; //sames as here
    var reader  = new FileReader();
    var sImage = "";

    ldBarReset();

    reader.onloadend = function () 
    {
        //var iCountImages = 0;
        const app = new Clarifai.App({apiKey: 'c420a1047f0f49dab1686251b5d3b3fd'});
        //console.log(reader);
        sImage = reader.result;
        sImage = sImage.substring(23);
    
        app.models.predict(Clarifai.FOOD_MODEL, {base64: sImage}).then(
        function(response) {
            //console.log(response);
            var aImageData = response.outputs[0].data.concepts;
            //console.log(aImageData);
            //console.log(response.outputs[0].data.concepts);
            var sHtml  = '<span id="headerAnalyse">Huk av det du trenger:</span>';
           
            sHtml +='<div class="funkyradio">';
                //sHtml += "<table>";
            var aFoodGraph = [];
            //var aProcentGraph = [];
            //var g_iFoodShownCounter = 0;
            var iTeller = 0;
            
            
            
            for (var i=0; i<aImageData.length; i++)
            {
                var sFoodname = aImageData[i].name;
                //var dProbibility = aImageData[i].value*100;
                
                //if (parseFloat(dProbibility) >= 80.00)
                if (checkIfPrint(sFoodname))
                {
                    aFoodGraph[g_iFoodShownCounter] = sFoodname;
                    //aProcentGraph[g_iFoodShownCounter] = dProbibility;
                    
                    // Oversette matrett / Ingrediens fra Engelsk til Norsk
                    var sMat = translate(sFoodname);
                    // hente ut innhold i maten
                    var aInnhold = sjekkInnhold(sMat);
                    sHtml += '<div class="funkyradio-danger">';
                    sHtml += '<input type="checkbox" name="checkbox" id="checkbox'+(++iTeller)+'" onchange="onCheckboxChanged(this.checked, '+iTeller+')" onclick="innhold('+iTeller+', \''+sMat+'\');" />';
                    sHtml += '<label for="checkbox'+iTeller+'">'+sMat+'</label>';
                    sHtml += '<span class="valueGram" id="valueGram'+iTeller+'">100 gram&nbsp;&nbsp;-&nbsp;&nbsp;</span>';
                    sHtml += '<span class="valueGram red" id="valueKcal'+iTeller+'">'+aInnhold[1]+' Kcal&nbsp;&nbsp;-&nbsp;&nbsp;</span>';
                    sHtml += '<span class="valueGram blue" id="valueKarb'+iTeller+'">'+aInnhold[2]+' karb&nbsp;&nbsp;-&nbsp;&nbsp;</span>';
                    sHtml += '<span class="valueGram green" id="valueProt'+iTeller+'">'+aInnhold[3]+' prot&nbsp;&nbsp;-&nbsp;&nbsp;</span>';
                    sHtml += '<span class="valueGram" id="valueFett'+iTeller+'">'+aInnhold[4]+' fett</span>';
                    sHtml += '<input type="range" min="1" max="500" value="100" class="slider" id="slide'+iTeller+'" oninput="onChangeSlider('+iTeller+', \''+sMat+'\');" />';
                    sHtml += '</div>';
                    
                    g_iFoodShownCounter++;
                }
            }
            sHtml += '<div id="extraFood">';
            sHtml += '</div>';
            sHtml +='</div>';
             //sHtml += '<div>';
            
                sHtml += '<div class="dropdown show">';
                sHtml += '<a class="btn btn-link dropdown-toggle form-control" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
                  sHtml += '&#128269; Søk ingrediens';
                sHtml += '</a>';
  
                    sHtml += '<div class="dropdown-menu" aria-labelledby="dropdownMenuLink">';
                        sHtml += '<a class="dropdown-item" onclick="addExtraFood(\'avokado\');">avokado</a>';
                        sHtml += '<a class="dropdown-item" onclick="addExtraFood(\'mandler\');">mandler</a>';
                        sHtml += '<a class="dropdown-item" onclick="addExtraFood(\'valnøtter\');">valnøtter</a>';
                        sHtml += '<a class="dropdown-item" onclick="addExtraFood(\'lettrømme, 10 % fett\');">lettrømme, 10 % fett</a>';
                        sHtml += '<a class="dropdown-item" onclick="addExtraFood(\'jalapeno\');">jalapeno</a>';
                        sHtml += '<a class="dropdown-item" onclick="addExtraFood(\'oliven, sort\');">oliven, sort</a>';
                        sHtml += '<a class="dropdown-item" onclick="addExtraFood(\'rød paprika\');">rød paprika</a>';
                        sHtml += '<a class="dropdown-item" onclick="addExtraFood(\'egg, kokt\');">egg, kokt</a>';
                        sHtml += '<a class="dropdown-item" onclick="addExtraFood(\'gul paprika\');">gul paprika</a>';
                        sHtml += '<a class="dropdown-item" onclick="addExtraFood(\'egg, rå\');">egg, rå</a>';
                    sHtml += '</div>';
                sHtml += '</div>';
            
            //sHtml += '<input type="text" class="form-control" id="foodSearch" placeholder="&#128269; Søk ingrediens" />';
            //sHtml += '<div id="foodSearchResult"></div>';
            //sHtml += '</div>';
            
            $("#imageInfo").show();
            $("#blankImageInfo").show();
            $("#imageInfo").html(sHtml);
            $(".loading").hide();
            
            window.location.href = "#flyttHitEtterBildeAnalyses";
            
            $(".ui-autocomplete").show();
            //$(function () {
			
                $("#foodSearch").autocomplete({
                    minLength: 2,
                    autoFocus: false,
                    source: 'ajax_search_food.php',
                    appendTo: '#foodSearchResult',
                    dataType: "json",
                    type: "GET",
                    position: {collision: "flip"},
                    response: function (event, ui) {
                        var data = ui.content;
                        console.log(event);
                        console.log(data);
                    },
                    select: function (event, ui) {
                        console.log(event);
                        console.log(ui);
                            //showFoodResult(ui.value);
                    }
                });
            //});
        },
        function(err) 
        {
            $(".loading").hide();
            //console.log(err);
            var error = err.status;
            //console.log(error);
            if (error == "400")
                bodyNotify("Bilde må innholde mat!", "error");
                //alert("Bilde må innholde mat");
                // there was an error
        });

        //var sImage = reader.result;
    };

    if (file) 
    {
        reader.readAsDataURL(file); //reads the data as a URL
    } 
    else 
    {
        //preview.src = "";
    }
}

function searchFood() {
   
}

function addExtraFood(sMat) {
    var iTeller = g_iFoodShownCounter;
    var aInnhold = sjekkInnhold(sMat);
    
    var  sHtml ='<div class="funkyradio">';
         sHtml += '<div class="funkyradio-danger">';
         //sHtml += '<input type="checkbox" name="checkbox" id="checkbox'+(++iTeller)+'"  onclick="innhold('+iTeller+', \''+sMat+'\');" checked />';
         sHtml += '<input type="checkbox" name="checkbox" id="checkbox'+(++iTeller)+'" onchange="onCheckboxChanged(this.checked, '+iTeller+')" onclick="innhold('+iTeller+', \''+sMat+'\');" checked />';
         sHtml += '<label for="checkbox'+iTeller+'">'+sMat+'</label>';
         sHtml += '<span class="valueGram" id="valueGram'+iTeller+'">100 gram&nbsp;&nbsp;-&nbsp;&nbsp;</span>';
         sHtml += '<span class="valueGram red" id="valueKcal'+iTeller+'">'+aInnhold[1]+' Kcal&nbsp;&nbsp;-&nbsp;&nbsp;</span>';
         sHtml += '<span class="valueGram blue" id="valueKarb'+iTeller+'">'+aInnhold[2]+' karb&nbsp;&nbsp;-&nbsp;&nbsp;</span>';
         sHtml += '<span class="valueGram green" id="valueProt'+iTeller+'">'+aInnhold[3]+' prot&nbsp;&nbsp;-&nbsp;&nbsp;</span>';
         sHtml += '<span class="valueGram" id="valueFett'+iTeller+'">'+aInnhold[4]+' fett</span>';
         sHtml += '<input type="range" min="1" max="500" value="100" class="slider" id="slide'+iTeller+'" oninput="onChangeSlider('+iTeller+', \''+sMat+'\');" />';
         sHtml += '</div>';
         sHtml +='</div>';
         
    $("#extraFood").append(sHtml);
    $("#valueGram").css("font-size", "12px");
    $("#valueGram").css("font-weight", "bold");
    onCheckboxChanged(true, iTeller);
    
    //console.log(iTeller);
    //console.log(aInnhold);
    innhold(iTeller, sMat) // legger til innhooldet sammen med alt som er valg
    g_iFoodShownCounter++;
}

//Viser endret innhodl ved bruka v slider
function onChangeSlider(iTeller, sMat)
{
    var aInnhold = sjekkInnhold(sMat);

    var sliderValue = $("#slide"+iTeller).val();
    $("#valueGram"+iTeller).html(sliderValue+" &nbsp;&nbsp;-&nbsp;&nbsp;");

    g_chosenFood[iTeller][1] = (sliderValue*aInnhold[1])/100;
    $("#valueKcal"+iTeller).html(g_chosenFood[iTeller][1].toFixed(1)+" Kcal&nbsp;&nbsp;-&nbsp;&nbsp;");
    
    g_chosenFood[iTeller][2] = (sliderValue*aInnhold[2])/100;
    $("#valueKarb"+iTeller).html(g_chosenFood[iTeller][2].toFixed(1)+" karb&nbsp;&nbsp;-&nbsp;&nbsp;");
    
    g_chosenFood[iTeller][3] = (sliderValue*aInnhold[3])/100;
    $("#valueProt"+iTeller).html(g_chosenFood[iTeller][3].toFixed(1)+" prot&nbsp;&nbsp;-&nbsp;&nbsp;");
    
    g_chosenFood[iTeller][4] = (sliderValue*aInnhold[4])/100;
    $("#valueFett"+iTeller).html(g_chosenFood[iTeller][4].toFixed(1)+" fett");
    
    // oppdatere innhold i valgt og endret mat/ regne ut total
    var dKcalTotal = 0.0;
    var dKarbTotal = 0.0;
    var dProtTotal = 0.0;
    var dFettTotal = 0.0;
    
    for (var i=0; i<g_chosenFood.length; i++) {
        dKcalTotal += g_chosenFood[i][1];
        dKarbTotal += g_chosenFood[i][2];
        dProtTotal += g_chosenFood[i][3];
        dFettTotal += g_chosenFood[i][4];
    }
    //console.log("etterpå: "+dKcalTotal);
    
    activateLdBar(dKcalTotal, dKarbTotal, dProtTotal, dFettTotal);
}

//henter ut linjen i arrayen som passer til maten som er valt
function sjekkInnhold(innhold) {
    for (var i=0; i<g_aLines.length; i++) {  // g_aLines er deklarert i mattabell.js
        //if (g_aLines[i][0].includes(innhold)) {
        if (innhold.localeCompare(g_aLines[i][0]) === 0)
        {
            var aLine = g_aLines[i];
            return aLine;
        }
    }
    return "IKKE";
}

// endrer verdiene på grafene etterhvert som mat velges og endres
function activateLdBar(g_dKcal, g_dKarbo, g_dProt, g_dFett) {
    var b1 = document.querySelector("#kcal");
    var b = new ldBar(b1);
    b.set(g_dKcal);

    b1 = document.querySelector("#carb");
    b = new ldBar(b1);
    b.set(g_dKarbo);
    
    b1 = document.querySelector("#prot");
    b = new ldBar(b1);
    b.set(g_dProt);
    
    b1 = document.querySelector("#fat");
    b = new ldBar(b1);
    b.set(g_dFett);

    b1 = document.querySelector("#kcall");
    var b = new ldBar(b1);
    b.set(g_dKcal);

    b1 = document.querySelector("#carbl");
    b = new ldBar(b1);
    b.set(g_dKarbo);
    
    b1 = document.querySelector("#protl");
    b = new ldBar(b1);
    b.set(g_dProt);
    
    b1 = document.querySelector("#fatl");
    b = new ldBar(b1);
    b.set(g_dFett);
}

function innhold(CheckboxNr, innhold) {

    var aInnhold = sjekkInnhold(innhold);
    /*console.log("hit igjen");
    console.log(aInnhold);
    console.log(g_chosenFood);
    console.log(CheckboxNr);
    console.log($("#checkbox"+CheckboxNr).is(":checked"));*/
    //
    // kopiere valgt mat inn i chosenFood tabellen på den plassen den har i rekkefølgen på visning av maten
    g_chosenFood[CheckboxNr][0] = aInnhold[0];
    g_chosenFood[CheckboxNr][1] = aInnhold[1];
    g_chosenFood[CheckboxNr][2] = aInnhold[2];
    g_chosenFood[CheckboxNr][3] = aInnhold[3];
    g_chosenFood[CheckboxNr][4] = aInnhold[4];
    g_chosenFood[CheckboxNr][5] = aInnhold[5];
    
    //resetter ldbar til 0;
    ldBarReset();
    /*g_dKcal = 0;
    g_dKarbo = 0;
    g_dProt = 0;
    g_dFett = 0;*/
    
    //hvis checkboksene er checked skal maten legges sammen med annet som er valgt, hvis ikke skal det trekkes fra
    if ($("#checkbox"+CheckboxNr).is(":checked")) {
        
        
        /*g_dKcal += parseFloat(aInnhold[1]);
        g_dKarbo += parseFloat(aInnhold[2]);
        g_dProt += parseFloat(aInnhold[3]);
        g_dFett += parseFloat(aInnhold[4]);*/
    }
    else {
        /*g_dKcal -= parseFloat(aInnhold[1]);
        g_dKarbo -= parseFloat(aInnhold[2]);
        g_dProt -= parseFloat(aInnhold[3]);
        g_dFett -= parseFloat(aInnhold[4]);*/
        
        //resette tellerne på rettesn som taes bort
        $("#slide"+CheckboxNr).val(100);
        
        $("#valueGram"+CheckboxNr).html("100 gr&nbsp;&nbsp;-&nbsp;&nbsp;");
        $("#valueKcal"+CheckboxNr).html(aInnhold[1]+" Kcal&nbsp;&nbsp;-&nbsp;&nbsp;");
        $("#valueKarb"+CheckboxNr).html(aInnhold[2]+" karb&nbsp;&nbsp;-&nbsp;&nbsp;");
        $("#valueProt"+CheckboxNr).html(aInnhold[3]+" prot&nbsp;&nbsp;-&nbsp;&nbsp;");
        $("#valueFett"+CheckboxNr).html(aInnhold[4]+" fett");
        // 
        // slette mat fra tabellen hvis ikke checked lenger
        //delete g_chosenFood[CheckboxNr];
        g_chosenFood[CheckboxNr][0] = "";
        g_chosenFood[CheckboxNr][1] = 0;
        g_chosenFood[CheckboxNr][2] = 0;
        g_chosenFood[CheckboxNr][3] = 0;
        g_chosenFood[CheckboxNr][4] = 0;
        g_chosenFood[CheckboxNr][5] = "";
    }
    
    for (var i=0; i<g_chosenFood.length; i++)
    {
        g_dKcal  += g_chosenFood[i][1];
        g_dKarbo += g_chosenFood[i][2];
        g_dProt  += g_chosenFood[i][3];
        g_dFett  += g_chosenFood[i][4];
    }
    
    /*console.log(CheckboxNr);
    console.log(innhold);
    console.log(aInnhold);
    console.log(g_dKcal);
    console.log(g_dKarbo);
    console.log(g_dProt);
    console.log(g_dFett);*/
    
    activateLdBar(g_dKcal, g_dKarbo, g_dProt, g_dFett);
}

// viser eller skjuler slider under maten/ ingrediensen
function onCheckboxChanged(checked, iTeller){
    //console.log(checked);
    //console.log(iTeller);
    if(checked === true){
        $("#slide"+iTeller).show();
        $("#valueGram"+iTeller).show();
        $("#valueKcal"+iTeller).show();
        $("#valueKarb"+iTeller).show();
        $("#valueProt"+iTeller).show();
        $("#valueFett"+iTeller).show();
    }
    else {
        $("#slide"+iTeller).hide();
        $("#valueGram"+iTeller).hide();
        $("#valueKcal"+iTeller).hide();
        $("#valueKarb"+iTeller).hide();
        $("#valueProt"+iTeller).hide();
        $("#valueFett"+iTeller).hide();
    }
}

// viser en notifiactsjon
function bodyNotify(sTekst, sType) {
    $.notify(
        sTekst, 
        sType,
        { position:"middle center"}
    );
}

function onClickLogOut()
{
    // slette all session variabler
    window.sessionStorage.clear();
    // sette tilbae slik at man må logg in
    window.localStorage.setItem("loggedinn", "F");
    window.location.href = "index.php";
}

$(window).scroll(function() {
    if ($(this).scrollTop()>1000)
     {
        $('.lines').hide(1000);
     }
    else
     {
      $('.lines').show(1000);
     }
 });