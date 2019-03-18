var g_aLines = [];
var g_dKcal = 0;
var g_dCalorier = 0;
var g_dFett = 0;
var g_dKarbo = 0;
var g_dProt = 0;

function ldBarReset() {
    g_dKcal = 0;
    g_dFett = 0;
    g_dKarbo = 0;
    g_dProt = 0;
    activateLdBar(g_dKcal, g_dKarbo, g_dProt, g_dFett);
}



//$("#hjem").css("background-image", "url(img/bakgrunn.PNG)");

//laste inn matvaretabellen og sjekke data
/*$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "matvaretab.csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });
});

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    

    for (var i=0; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(';');
        
        var tarr = [];
        for (var j=0; j<allTextLines.length; j++) {
            tarr.push(data[j]);
        }
        g_aLines.push(tarr);
    }
    //console.log(g_aLines);
}
*/ 
var g_aLines = [
    ['Eple', 100, 40, 30, 90],
    ['Banan', 100, 40, 30, 10],
    ['krem', 100, 40, 30, 10]
];

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
    var file    = document.querySelector('input[type=file]').files[0]; //sames as here
    var reader  = new FileReader();
    var sImage = "";

    reader.onloadend = function () 
    {
        const app = new Clarifai.App({apiKey: 'c420a1047f0f49dab1686251b5d3b3fd'});
        //console.log(reader);
        sImage = reader.result;
        sImage = sImage.substring(23);
    
        //console.log(sImage);
    
    
    
        
        app.models.predict(Clarifai.FOOD_MODEL, {base64: sImage}).then(
        function(response) {
            var aImageData = response.outputs[0].data.concepts;
            //console.log(response.outputs[0].data.concepts);
            var sHtml  = "Huk av for ingredienser/matrett";
            sHtml +='<div class="funkyradio">';
                //sHtml += "<table>";
            var aFoodGraph = [];
            var aProcentGraph = [];
            var iGraphCounter = 0;
            var iTeller = 0;

            for (var i=0; i<aImageData.length; i++)
            {
                var sFoodname = aImageData[i].name;
                var dProbibility = aImageData[i].value*100;
                //var dProbibility = dProbibility.toFixed(2);

                if (parseFloat(dProbibility) >= 80.00)
                {
                    aFoodGraph[iGraphCounter] = sFoodname;
                    aProcentGraph[iGraphCounter] = dProbibility;
                    var sMat = transalte(sFoodname);
                    
                    

                        
                        sHtml +='<div class="funkyradio-danger">';
                        sHtml +='<input type="checkbox" name="checkbox" id="checkbox'+(++iTeller)+'" onclick="innhold('+iTeller+', \''+sMat+'\')" />';
                        sHtml +='<label for="checkbox'+(iTeller)+'">'+sMat+'</label>';
                        sHtml +='<input type="range" class="form-control-range" id="slide'+iTeller+'" style="display: none">';
                        sHtml +='</div>';
        
                    
                    
                    iGraphCounter++;
                }
            }
            sHtml +='</div>';
            sHtml += "</table>";
            //console.log(sHtml);
            $("#imageInfo").show();
            $("#imageInfo").html(sHtml);
        },
        function(err) 
        {
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

function sjekkInnhold(innhold) {
    //console.log(g_aLines);
    for (var i=0; i<g_aLines.length; i++) {
        if (g_aLines[i][0].includes(innhold)) {
            var aLine = g_aLines[i];
            return aLine;
        }
    }
    return "IKKE";
}

function activateLdBar(g_dKcal, g_dKarbo, g_dProt, g_dFett) {
    //console.log(g_dProt);
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
}

function innhold(CheckboxNr, innhold) {
    createSlider(CheckboxNr);
    //console.log("hei");
    //console.log(innhold);
    var aInnhold = sjekkInnhold(innhold);
    
    
    if ($("#checkbox"+CheckboxNr).is(":checked")) {
        g_dKcal += parseFloat(aInnhold[1]);
        g_dKarbo += parseFloat(aInnhold[3]);
        g_dProt += parseFloat(aInnhold[2]);
        g_dFett += parseFloat(aInnhold[4]);
    }
    else {
        g_dKcal -= parseFloat(aInnhold[1]);
        g_dKarbo -= parseFloat(aInnhold[3]);
        g_dProt -= parseFloat(aInnhold[2]);
        g_dFett -= parseFloat(aInnhold[4]);
    }

    activateLdBar(g_dKcal, g_dKarbo, g_dProt, g_dFett);
    //$("#cal").html("Kalorier " + g_dCalorier + " kcal");
}

// Viser slider for å velge størrelse på ingrediensen 
function createSlider(CheckboxNr) {
    //console.log("checked: " + $("#checkbox"+CheckboxNr).is(":checked"));
    //console.log(CheckboxNr);
        /*if ($("checkbox"+CheckboxNr).is(":checked")) {
            $("#slide"+CheckboxNr).show();
        } else {
            $("#slide"+CheckboxNr).hide();
        }*/

        $("#slide"+CheckboxNr).show();
}


