// Globale variabler
var g_iBrukerId = 0;
var g_iBildeId = 0;
var g_bImage = false;
var g_dKcal = 0;
var g_dFett = 0;
var g_dKarbo = 0;
var g_dProt = 0;
var g_iFoodShownCounter = 0; // brukes til å telle antall matvarere som vises
var g_chosenFood = [];
chosenfoodArray();

function chosenfoodArray() {
    g_chosenFood = [
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

}


// Vise bakgrunnsbile i Canvas
var canvas = document.querySelector('canvas'),
context = canvas.getContext('2d'),
base_image = new Image();
base_image.src = 'img/bakgrunn.PNG';
base_image.onload = function() {
    context.drawImage(base_image, 0, 0); // width 471px height 323px
};

// lagre sessionstorage for loggin
if (window.sessionStorage.getItem("BrukerId") > 0) {
    g_iBrukerId = window.sessionStorage.getItem("BrukerId");
    var iVisits = window.localStorage.getItem("visits");
    $(".bruker").html(window.sessionStorage.getItem("Brukernavn"));
    bodyNotify("Du er nå logget inn!", "success");
    
    // hvis admin så vise admin i menyen
    if (window.sessionStorage.getItem("BrukerType") === "Admin")
        $(".adminPage").show();
    
    // ta bort Registrer / loginn knappen
    $("#Login").hide();
    $("#myPage").show();
}
else
    $("#myPageSmall").hide();
    
// Resette innhold som vises på siden
function ldBarReset() {
    g_dKcal = 0;
    g_dFett = 0;
    g_dKarbo = 0;
    g_dProt = 0;
    activateLdBar(g_dKcal, g_dKarbo, g_dProt, g_dFett);
}

// aktivere ta bilde med kamera fra knaoo
$("#lastOppBilde").click(function () {
    /*var sCapture = "F";
    if (document.getElementById("mypic").hasAttribute("capture"))
        sCapture = "T";
    
    console.log(sCapture);
    
    if (sCapture === "T") {*/
        $("#mypic").removeAttr("capture", "environment"); // camera blir front camera
    /*}
    else
    {
        $("#mypic").attr("capture", "environment");
    }*/
    $("#mypic").trigger('click');
});

// endre til å ta bilde i stede for å laste opp hvis man er på mobil enhet
function activateCamera() {
    var sCapture = "F";
    if (document.getElementById("mypic").hasAttribute("capture"))
        sCapture = "T";
    //console.log(sCapture);
        
    if (sCapture === "T") {
    }
    else
    {
        $("#mypic").attr("capture", "environment");
    }
    $("#mypic").trigger('click');
}

// trigger last opp bilde for valg av bilde fra knapp
$("#taBilde").click(function () {
    $("#mypic").attr("capture", "environment");
    $("#mypic").trigger('click');
});

// forhåndsvisning av bilde
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
    
    //console.log(reader);
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

// Analysere innhold i maten
function analyzeImage() {
    // Nullstille innholds arrya av hva som er valgt
    chosenfoodArray();
    
    $(".loading").show(); // starter spinner for vent på info fra bilde
    
    var file    = document.querySelector('input[type=file]').files[0]; //sames as here
    var reader  = new FileReader();
    var sImage = "";

    // resette verdiene i innhold
    ldBarReset();
    
    reader.onloadend = function () 
    {

        //console.log(reader.width);
        //var iCountImages = 0;
        const app = new Clarifai.App({apiKey: 'c420a1047f0f49dab1686251b5d3b3fd'});
        //console.log(reader);
        sImage = reader.result;
        var sImageAnalyze = sImage.substring(23);

        // Lagre bilde i databasen
        var aData = {
            act: 'lagre_bilde',
            individid: g_iBrukerId,
            image: sImage
        };
        $.ajax({
            type: 'POST',
            url: 'ajax_bilde.php',
            data: aData,
            error: function() 
            {
                $.alert({
                    title: 'FEIL',
                    content: 'Feil i henting av data',
                    confirmButtonClass: 'btn-info',                
                    confirmButton: 'OK',
                    confirm: function () {
                    }
                });
            },
            success: function(aJsonRet) 
            {
                g_iBildeId = parseInt(aJsonRet.replace('"', ""));
            }
        });

        app.models.predict(Clarifai.FOOD_MODEL, {base64: sImageAnalyze}).then(
        function(response) {

            var aImageData = response.outputs[0].data.concepts;
            var sHtml  = '<span id="headerAnalyse">Velg innhold:</span>';

            sHtml +='<div class="funkyradio">';
            var aFoodGraph = [];
            var iTeller = 0;

            //console.log(aImageData);

            for (var i=0; i<aImageData.length; i++)
            {
                var sFoodname = aImageData[i].name;
                //var dProbibility = aImageData[i].value*100;

                //if (parseFloat(dProbibility) >= 80.00)
                //console.log(sFoodname);
                //console.log(checkIfPrint(sFoodname));
                //if (checkIfPrint(sFoodname))
                //{
                    aFoodGraph[g_iFoodShownCounter] = sFoodname;
                    //aProcentGraph[g_iFoodShownCounter] = dProbibility;

                    // Oversette matrett / Ingrediens fra Engelsk til Norsk
                    var sMat = translate(sFoodname);
                    // hente ut innhold i maten
                    var aInnhold = sjekkInnhold(sMat);
                    
                    var bSliderDisabled = "";
                    if (aInnhold == "IKKE") {
                        aInnhold = ['', 0, 0, 0, 0, ''];
                        bSliderDisabled = "disabled";
                    }
                    sHtml += '<div class="funkyradio-danger">';
                    sHtml += '<input type="checkbox" name="checkbox" id="checkbox'+(++iTeller)+'" onchange="onCheckboxChanged(this.checked, '+iTeller+', \''+sMat+'\')" onclick="innhold('+iTeller+', \''+sMat+'\');" />';
                    sHtml += '<label for="checkbox'+iTeller+'">'+sMat+'</label>';
                    console.log(sFoodname);
                    if (sFoodname == "beer")
                        sHtml += '<span class="valueGram" id="valueGram'+iTeller+'">1 dl &nbsp;&nbsp;-&nbsp;&nbsp;</span>';
                    else
                        sHtml += '<span class="valueGram" id="valueGram'+iTeller+'">100 g&nbsp;&nbsp;-&nbsp;&nbsp;</span>';
                    sHtml += '<span class="valueGram red" id="valueKcal'+iTeller+'">'+aInnhold[1]+' Kc&nbsp;&nbsp;-&nbsp;&nbsp;</span>';
                    sHtml += '<span class="valueGram blue" id="valueKarb'+iTeller+'">'+aInnhold[2]+' k&nbsp;&nbsp;-&nbsp;&nbsp;</span>';
                    sHtml += '<span class="valueGram green" id="valueProt'+iTeller+'">'+aInnhold[3]+' p&nbsp;&nbsp;-&nbsp;&nbsp;</span>';
                    sHtml += '<span class="valueGram orange" id="valueFett'+iTeller+'">'+aInnhold[4]+' f</span>';
                    if (sFoodname == "beer")
                        sHtml += '<input type="range" min="1" max="10" value="1" class="slider" id="slide'+iTeller+'" oninput="onChangeSlider('+iTeller+', \''+sMat+'\');" onchange="saveInnhold(\'T\','+iTeller+', \''+sMat+'\');" ' + bSliderDisabled + ' />';
                    else
                        sHtml += '<input type="range" min="1" max="500" value="100" class="slider" id="slide'+iTeller+'" oninput="onChangeSlider('+iTeller+', \''+sMat+'\');" onchange="saveInnhold(\'T\','+iTeller+', \''+sMat+'\');" ' + bSliderDisabled + ' />';
                    sHtml += '</div>';

                    g_iFoodShownCounter++;
                //}
            }
            sHtml += '<div id="extraFood">';
            sHtml += '</div>';
            sHtml += '</div>';
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

            $("#imageInfo").show();
            $("#blankImageInfo").show();
            $("#imageInfo").html(sHtml);
            $(".loading").hide();
            
            g_bImage = true;
            $(".line").show();
            
            window.location.href = "#visAnalyse";

            /*$(".ui-autocomplete").show();
            $(function () {

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
            });*/
        },
        function(err) 
        {
            $(".loading").hide();
            //console.log(err);
            var error = err.status;
            //console.log(error);
            if (error == "400")
                bodyNotify("Bilde må innholde mat!", "error");
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
         sHtml += '<input type="checkbox" name="checkbox" id="checkbox'+(++iTeller)+'" onchange="onCheckboxChanged(this.checked, '+iTeller+', \''+sMat+'\')" onclick="innhold('+iTeller+', \''+sMat+'\');" checked />';
         sHtml += '<label for="checkbox'+iTeller+'">'+sMat+'</label>';
         sHtml += '<span class="valueGram" id="valueGram'+iTeller+'">100 g&nbsp;&nbsp;-&nbsp;&nbsp;</span>';
         sHtml += '<span class="valueGram red" id="valueKcal'+iTeller+'">'+aInnhold[1]+' Kc&nbsp;&nbsp;-&nbsp;&nbsp;</span>';
         sHtml += '<span class="valueGram blue" id="valueKarb'+iTeller+'">'+aInnhold[2]+' k&nbsp;&nbsp;-&nbsp;&nbsp;</span>';
         sHtml += '<span class="valueGram green" id="valueProt'+iTeller+'">'+aInnhold[3]+' p&nbsp;&nbsp;-&nbsp;&nbsp;</span>';
         sHtml += '<span class="valueGram orange" id="valueFett'+iTeller+'">'+aInnhold[4]+' f</span>';
         sHtml += '<input type="range" min="1" max="500" value="100" class="slider" id="slide'+iTeller+'" oninput="onChangeSlider('+iTeller+', \''+sMat+'\');" onchange="saveInnhold(\'T\','+iTeller+', \''+sMat+'\');" />';
         sHtml += '</div>';
         sHtml +='</div>';
         
    $("#extraFood").append(sHtml);
    $("#valueGram").css("font-size", "12px");
    $("#valueGram").css("font-weight", "bold");
    onCheckboxChanged(true, iTeller, sMat);
    
    innhold(iTeller, sMat) // legger til innhooldet sammen med alt som er valg
    g_iFoodShownCounter++;
}

//Viser endret innhodl ved bruka v slider
function onChangeSlider(iTeller, sMat)
{
    var aInnhold = sjekkInnhold(sMat);
    if (sMat === "øl") 
    {
        var sliderValue = $("#slide"+iTeller).val();
        $("#valueGram"+iTeller).html(sliderValue+" dl&nbsp;&nbsp;-&nbsp;&nbsp;");

        g_chosenFood[iTeller][1] = (sliderValue*aInnhold[1]);
        $("#valueKcal"+iTeller).html(g_chosenFood[iTeller][1].toFixed(1)+" Kc&nbsp;&nbsp;-&nbsp;&nbsp;");

        g_chosenFood[iTeller][2] = (sliderValue*aInnhold[2]);
        $("#valueKarb"+iTeller).html(g_chosenFood[iTeller][2].toFixed(1)+" k&nbsp;&nbsp;-&nbsp;&nbsp;");

        g_chosenFood[iTeller][3] = (sliderValue*aInnhold[3]);
        $("#valueProt"+iTeller).html(g_chosenFood[iTeller][3].toFixed(1)+" p&nbsp;&nbsp;-&nbsp;&nbsp;");

        g_chosenFood[iTeller][4] = (sliderValue*aInnhold[4]);
        $("#valueFett"+iTeller).html(g_chosenFood[iTeller][4].toFixed(1)+" f");
    }
    else 
    {
        var sliderValue = $("#slide"+iTeller).val();
        $("#valueGram"+iTeller).html(sliderValue+" g&nbsp;&nbsp;-&nbsp;&nbsp;");
        
        g_chosenFood[iTeller][1] = (sliderValue*aInnhold[1])/100;
        $("#valueKcal"+iTeller).html(g_chosenFood[iTeller][1].toFixed(1)+" Kc&nbsp;&nbsp;-&nbsp;&nbsp;");

        g_chosenFood[iTeller][2] = (sliderValue*aInnhold[2])/100;
        $("#valueKarb"+iTeller).html(g_chosenFood[iTeller][2].toFixed(1)+" k&nbsp;&nbsp;-&nbsp;&nbsp;");

        g_chosenFood[iTeller][3] = (sliderValue*aInnhold[3])/100;
        $("#valueProt"+iTeller).html(g_chosenFood[iTeller][3].toFixed(1)+" p&nbsp;&nbsp;-&nbsp;&nbsp;");

        g_chosenFood[iTeller][4] = (sliderValue*aInnhold[4])/100;
        $("#valueFett"+iTeller).html(g_chosenFood[iTeller][4].toFixed(1)+" f");
    }
    
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

    activateLdBar(dKcalTotal, dKarbTotal, dProtTotal, dFettTotal);
}

function saveInnhold(sSave, iTeller, sMat) {
    
    //console.log(sSave);
    //console.log("innhold");
    var aInnhold = sjekkInnhold(sMat);

    var sliderValue = $("#slide"+iTeller).val();
    
    // Lagre bilde innhold
    var aData = {
        act: 'lagre_bilde_innhold',
        individid: g_iBrukerId,
        bildeid: g_iBildeId,
        lagre: sSave,
        innhold: sMat,
        mengde: sliderValue,
        kcal: aInnhold[1],
        karb: aInnhold[2],
        prot: aInnhold[3],
        fett: aInnhold[4]
    };
    $.ajax({
        type: 'POST',
        url: 'ajax_bilde.php',
        data: aData,
        error: function() 
        {
            $.alert({
                title: 'FEIL',
                content: 'Feil i henting av data',
                confirmButtonClass: 'btn-info',                
                confirmButton: 'OK',
                confirm: function () {
                }
            });
        },
        success: function(aJsonRet) 
        {
            //console.log(aJsonRet);
            //g_iBildeId = parseInt(aJsonRet.replace('"', ""));
            //console.log(g_iBildeId);
        }
    });
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
    b.set(parseInt(g_dKcal));

    b1 = document.querySelector("#carb");
    b = new ldBar(b1);
    b.set(parseInt(g_dKarbo));
    
    b1 = document.querySelector("#prot");
    b = new ldBar(b1);
    b.set(parseInt(g_dProt));
    
    b1 = document.querySelector("#fat");
    b = new ldBar(b1);
    b.set(parseInt(g_dFett));
    
    b1 = document.querySelector("#kcall");
    var b = new ldBar(b1);
    b.set(parseInt(g_dKcal));

    b1 = document.querySelector("#carbl");
    b = new ldBar(b1);
    b.set(parseInt(g_dKarbo));
    
    b1 = document.querySelector("#protl");
    b = new ldBar(b1);
    b.set(parseInt(g_dProt));
    
    b1 = document.querySelector("#fatl");
    b = new ldBar(b1);
    b.set(parseInt(g_dFett));
}

function innhold(CheckboxNr, innhold) {

    var aInnhold = sjekkInnhold(innhold);
    
    if (aInnhold === "IKKE") {
        g_chosenFood[CheckboxNr][0] = "";
        g_chosenFood[CheckboxNr][1] = 0;
        g_chosenFood[CheckboxNr][2] = 0;
        g_chosenFood[CheckboxNr][3] = 0;
        g_chosenFood[CheckboxNr][4] = 0;
        g_chosenFood[CheckboxNr][5] = "";
    }
    else {
        // kopiere valgt mat inn i chosenFood tabellen på den plassen den har i rekkefølgen på visning av maten
        g_chosenFood[CheckboxNr][0] = aInnhold[0];
        g_chosenFood[CheckboxNr][1] = aInnhold[1];
        g_chosenFood[CheckboxNr][2] = aInnhold[2];
        g_chosenFood[CheckboxNr][3] = aInnhold[3];
        g_chosenFood[CheckboxNr][4] = aInnhold[4];
        g_chosenFood[CheckboxNr][5] = aInnhold[5];
    }
    
    //resetter ldbar til 0;
    ldBarReset();
    
    //hvis checkboksene er checked skal maten legges sammen med annet som er valgt, hvis ikke skal det trekkes fra
    if ($("#checkbox"+CheckboxNr).is(":checked")) {
        
    }
    else {
        //resette tellerne på rettesn som taes bort
        $("#slide"+CheckboxNr).val(100);
        
        $("#valueGram"+CheckboxNr).html("100 g&nbsp;&nbsp;-&nbsp;&nbsp;");
        $("#valueKcal"+CheckboxNr).html(aInnhold[1]+" Kc&nbsp;&nbsp;-&nbsp;&nbsp;");
        $("#valueKarb"+CheckboxNr).html(aInnhold[2]+" k&nbsp;&nbsp;-&nbsp;&nbsp;");
        $("#valueProt"+CheckboxNr).html(aInnhold[3]+" p&nbsp;&nbsp;-&nbsp;&nbsp;");
        $("#valueFett"+CheckboxNr).html(aInnhold[4]+" f");
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
    
    //console.log(g_chosenFood);
    
    for (var i=0; i<g_chosenFood.length; i++)
    {
        g_dKcal  += g_chosenFood[i][1];
        g_dKarbo += g_chosenFood[i][2];
        g_dProt  += g_chosenFood[i][3];
        g_dFett  += g_chosenFood[i][4];
    }
    
    activateLdBar(g_dKcal, g_dKarbo, g_dProt, g_dFett);
}

// viser eller skjuler slider under maten/ ingrediensen
function onCheckboxChanged(checked, iTeller, sMat){

    if(checked === true){
        $("#slide"+iTeller).show();
        $("#valueGram"+iTeller).show();
        $("#valueKcal"+iTeller).show();
        $("#valueKarb"+iTeller).show();
        $("#valueProt"+iTeller).show();
        $("#valueFett"+iTeller).show();
        saveInnhold("T", iTeller, sMat);
    }
    else {
        $("#slide"+iTeller).hide();
        $("#valueGram"+iTeller).hide();
        $("#valueKcal"+iTeller).hide();
        $("#valueKarb"+iTeller).hide();
        $("#valueProt"+iTeller).hide();
        $("#valueFett"+iTeller).hide();
        saveInnhold("F", iTeller, sMat);
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

//console.log($(window).height());

$(window).scroll(function() {
    //if ($(this).scrollTop()>1000)
    if ($(this).scrollTop()>1250)
     {
        $('.lines').hide(1000);
     }
    else
     {
        if (g_bImage)
           $('.lines').show(1000);
     }
 });