var g_aLines = [];
var g_dCalorier = 0;
var g_dFett = 0;
var g_dKarbo = 0;
var g_dProt = 0;

function ldBarReset() {
    g_dFett = 0;
    g_dKarbo = 0;
    g_dProt = 0;
    activateLdBar(g_dKarbo, g_dProt, g_dFett)
}



//$("#hjem").css("background-image", "url(img/bakgrunn.PNG)");

//laste inn matvaretabellen og sjekke data
$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "matvaretabellen2018.csv",
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
    
        /*$.ajax({
            url: "https://api-beta.bite.ai/vision",
            //url: 'http://example.com/',
            type: 'get',
            crossDomain: true,
            dataType: 'jsonp',
            data: {
                //'image': sImage,
                //'image': 'data:image/jpeg;base64,'.sImage,
                //'base64': "data:image/jpeg;base64,http://www.crmforever.no/wrap.jpeg"
                'base64': "http://www.crmforever.no/wrap.jpeg"
            },
            json: 'callback',
            //jsonpCallback: 'heiogha',
            headers: {
                'Authorization': 'Bearer 7bb48761395f1250fecad5f87f849bf427d92afc',
                'content type': 'multipart/form-data'
                
            },
            //contentType: 'application/json; charset=utf-8',
            //'base64': 'data:image/jpeg;base64,'.sImage
            success: function (result) {
                console.log("OK");
                console.log(result);
               // CallBack(result);
            },
            error: function (xhr, status, error) {
                console.log("ERROR");
                console.log(xhr);   
                console.log(status);
                console.log(error);
            }
        });
        
        /*function heiogha(json) {
            console.log(json);
        }*/
    
        /*$.ajax({
            url: "https://api-beta.bite.ai/vision",
            method: "get",
            timeout: 20000, // sets timeout to 20 seconds
            cache: false,
            datatype: "jsonp",
            //data: RequestData,
            headers: {"Authorization": "Bearer 7bb48761395f1250fecad5f87f849bf427d92afc",
                      "base64": "data:image/jpeg;base64,".sImage
            },
            success: function(jsonRet) {
                var res = JSON.parse(jsonRet);
                console.log(jsonRet);
                if (parseInt(res.status) === 0)
                {
                }
                else
                {
                    // Gi et svar på at det gikk galt
                }
            },
            error: function (xhr, ajaxOptions, throwError) {
                console.log(xhr);
                //console.log(ajaxOptions);
                //console.log(throwError);
            }
       });*/
    
    
        /*$.ajax({
            url: "https://api-beta.bite.ai/vision",
            headers: {"Authorization": "Bearer 7bb48761395f1250fecad5f87f849bf427d92afc"
                      //"base64": "data:image/jpeg;base64,".sImage
            },
            success: function(jsonRet) {
                //var res = JSON.parse(jsonRet);
                console.log(jsonRet);
                
            },
            error: function (xhr, ajaxOptions, throwError) {
                console.log(xhr);
                //console.log(ajaxOptions);
                //console.log(throwError);
            }

        });*/
    
    
        //console.log(sImage);
        app.models.predict(Clarifai.FOOD_MODEL, {base64: sImage}).then(
        function(response) {
            var aImageData = response.outputs[0].data.concepts;
            //console.log(response.outputs[0].data.concepts);
            var sHtml  = "Huk av for ingredienser/matrett";
                sHtml += "<table>";
            var aFoodGraph = [];
            var aProcentGraph = [];
            var iGraphCounter = 0;

            for (var i=0; i<aImageData.length; i++)
            {
                var sFoodname = aImageData[i].name;
                var dProbibility = aImageData[i].value*100;
                var dProbibility = dProbibility.toFixed(2);

                if (parseFloat(dProbibility) >= 80.00)
                {
                    aFoodGraph[iGraphCounter] = sFoodname;
                    aProcentGraph[iGraphCounter] = dProbibility;
                    var sMat = transalte(sFoodname);

                    sHtml += "<tr>";
                    sHtml += "<td style='text-align:left; padding-right:60px;'>";
                        //sHtml += sFoodname +" - " + transalte(sFoodname);
                        sHtml += "&nbsp;" + sMat;
                    sHtml += "</td>";
                    /*sHtml += "<td>";
                        sHtml += " " + dProbibility;
                    sHtml += "</td>";*/
                    sHtml += "<td>";    
                        sHtml += "<input type='checkbox' id=\""+sMat+"\" onclick='innhold(\""+sMat+"\");'/><br />";
                    sHtml += "</td>";
                    sHtml += "</tr>";
                    
                    iGraphCounter++;
                }
            }
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
    }

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
    for (var i=0; i<g_aLines.length; i++) {
        if (g_aLines[i][1].includes(innhold)) {
            var aLine = g_aLines[i];;
            return aLine;
        }
    }
    return "IKKE";
}

function activateLdBar(g_dKarbo, g_dProt, g_dFett) {
    var b1 = document.querySelector("#carb");
    var b = new ldBar(b1);
    b.set(g_dKarbo);
    
    var b1 = document.querySelector("#prot");
    var b = new ldBar(b1);
    b.set(g_dProt);
    
    var b1 = document.querySelector("#fat");
    var b = new ldBar(b1);
    b.set(g_dFett);
}

function innhold(innhold) {
    
    var aInnhold = sjekkInnhold(innhold);
    console.log(aInnhold);
    
    if ($("#"+innhold).is(":checked")) {
        g_dCalorier += parseFloat(aInnhold[4]);
        g_dKarbo += parseFloat(aInnhold[6]);
        g_dProt += parseFloat(aInnhold[7]);
        g_dFett += parseFloat(aInnhold[5]);
    }
    else {
        g_dCalorier -= parseFloat(aInnhold[4]);
        g_dKarbo -= parseFloat(aInnhold[6]);
        g_dProt -= parseFloat(aInnhold[7]);
        g_dFett -= parseFloat(aInnhold[5]);
    }

    activateLdBar(g_dKarbo, g_dProt, g_dFett);
    $("#cal").html("Kalorier " + g_dCalorier + " kcal");
}



