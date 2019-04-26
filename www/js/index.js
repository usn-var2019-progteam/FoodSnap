var aCookie =  document.cookie.split(";")
//console.log(aCookie[1]);
if (aCookie[1] === "EU_COOKIE_LAW_CONSENT=true") {
    // sjekke om det er lagret cookies
    //console.log(window.localStorage.getItem("loggedinn"));
    if (window.localStorage.getItem("loggedinn") === "T")
    {
        var sBrukerkode = window.localStorage.getItem("Brukerkode");
        //var iVisits = window.localStorage.getItem("visits");
        //window.localStorage.setItem("visits", ++iVisits);
        if (window.localStorage.getItem("huskmeg") == "T")
            loginHuskMeg(Brukerkode);

        //console.log(window.localStorage.getItem("huskmeg"));


        // direkte login fra cookie
        function loginHuskMeg(sBrukernavn) {
            //console.log("login");
              $.ajax({
                  url: "ajax_bruker.php",
                  method: "post",
                  dataType: 'json',
                  data: {
                      'act': 'loginDirekte',
                      'brukernavn': sBrukernavn
                      //'passord': sPassord
                  },
                  success: function( result ) {
                      //console.log(result)
                      var bAllowLogin = result['allowlogin'];

                      if (bAllowLogin) {
                          var aData = result[0];

                          var sEpost = aData["Epost"];
                          var sMobil = aData["Mobil"];
                          var sBrukernavn = "";
                          // finne brukernavn
                          if (sEpost.length > 0)
                                   sBrukernavn = sEpost;
                          else 
                                   sBrukernavn = sMobil;

                          window.sessionStorage.setItem("BrukerId", parseInt(aData["BrukerId"]));
                          window.sessionStorage.setItem("BrukerType", aData["BrukerType"]);
                          window.sessionStorage.setItem("Fornavn", aData["Fornavn"]);
                          window.sessionStorage.setItem("Mellomnavn", aData["Mellomnavn"]);
                          window.sessionStorage.setItem("Etternavn", aData["Etternavn"]);
                          window.sessionStorage.setItem("Epost", sEpost);
                          window.sessionStorage.setItem("Mobil",sMobil);
                          window.sessionStorage.setItem("Brukernavn", sBrukernavn);

                          window.location.href = "main.php";
                      }
                      else {
                          bodyNotify("Du har endret brukernavn, logg inn på nytt", "error");
                          $("body").show();
                          loginSkjema();
                      }
                  },
                  error: function (xhr, ajaxOptions, thrownError) {
                      console.log(xhr);			
                      console.log(xhr.status);
                      console.log(ajaxOptions);
                      console.log(thrownError);
                  }
              });
        }
    }
    else
        $("body").show();
    //console.log("cookie ikke lagret");
    //console.log(window.localStorage.getItem("BrukerId"));
}
else {
    deleteCookie();
    $("body").show();
}

function deleteCookie() {
    window.localStorage.removeItem('Brukerkode')
    window.localStorage.removeItem('loggedinn')
    window.localStorage.removeItem('huskmeg')
}


 // sender login infot il PHP og sjekker om personen er aktiv bruker og riktig brukernavn passord for loggin
 // ved ok login, session lagre variabler for inlloget person
 function loginFoodsnap() {
          //console.log("login");
                var sBrukernavn = $("#brukernavn").val();
                var sPassord = $("#password").val();

                if (sBrukernavn.length > 4 && sPassord.length > 2)
                {
                        var bHuskMeg = $("#huskMeg").is(":checked");
                        //console.log(bHuskMeg);
                        $.ajax({
                                url: "ajax_bruker.php",
                                method: "post",
                                dataType: 'json',
                                data: {
                                         'act': 'login',
                                         'brukernavn': sBrukernavn,
                                         'passord': sPassord
                                },
                                success: function( result ) {

                                         //console.log(result);
                                         var bAllowLogin = result['allowlogin'];

                                         if (bAllowLogin) {
                                                var aData = result[0];

                                                var sEpost = aData["Epost"];
                                                var sMobil = aData["Mobil"];
                                                var sBrukernavn = "";
                                                // finne brukernavn
                                                if (sEpost.length > 0)
                                                         sBrukernavn = sEpost;
                                                else 
                                                         sBrukernavn = sMobil;

                                                window.sessionStorage.setItem("BrukerId", parseInt(aData["BrukerId"]));
                                                window.sessionStorage.setItem("BrukerType", aData["BrukerType"]);
                                                window.sessionStorage.setItem("Fornavn", aData["Fornavn"]);
                                                window.sessionStorage.setItem("Mellomnavn", aData["Mellomnavn"]);
                                                window.sessionStorage.setItem("Etternavn", aData["Etternavn"]);
                                                window.sessionStorage.setItem("Epost", sEpost);
                                                window.sessionStorage.setItem("Mobil",sMobil);
                                                window.sessionStorage.setItem("Brukernavn", sBrukernavn);

                                         // hente ut eller evntuelt lagre cookies
                                        if (bHuskMeg)
                                        {
                                                //var iVisits = window.localStorage.getItem("visits");
                                                window.localStorage.setItem("Brukerkode", sBrukerkode);
                                                window.localStorage.setItem("loggedinn", "T");
                                                //window.localStorage.setItem("visits", ++iVisits);
                                                window.localStorage.setItem("huskmeg", "T");

                                        }

                                        window.location.href = "main.php";
                                        // skjule login link
                                }
                                else {
                                        bodyNotify("Feil brukernavn eller passord!", "error");
                                }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                                console.log("ERROR");
                                console.log(xhr);			
                                console.log(xhr.status);
                                console.log(ajaxOptions);
                                console.log(thrownError);

                        }
                });
        }
        else
                bodyNotifyClick("Brukernavn / Passord er ikke fylt ut", "error");

}

 // viser en notifiactsjon
function bodyNotify(sTekst, sType) {
    $.notify(
        sTekst, 
        sType,
        { position:"middle center"}
    );
}

function bodyNotifyClick(sTekst, sType) {
    $.notify(
        sTekst, 
        sType,
        { 
            // whether to hide the notification on click
           clickToHide: true,
           // whether to auto-hide the notification
           autoHide: false,
           // if autoHide, hide after milliseconds
           autoHideDelay: 10000,
           // show the arrow pointing at the element
           arrowShow: true,
           // arrow size in pixels
           arrowSize: 5,
           // position defines the notification position though uses the defaults below
           position: '...',
           // default positions
           elementPosition: 'bottom left',
           globalPosition: 'top right',
           // default style
           style: 'bootstrap',
           // default class (string or [string])
           className: 'error',
           // show animation
           showAnimation: 'slideDown',
           // show animation duration
           showDuration: 400,
           // hide animation
           hideAnimation: 'slideUp',
           // hide animation duration
           hideDuration: 200,
           // padding between element and notification
           gap: 2
       }
    );
}

function createUser(sBrukernavn, iTypeRegistrering) {
    var sPassord = "1234";

    $.ajax({
        url: "ajax_bruker.php",
        method: "post",
        dataType: 'json',
        data: {
                 'act': 'registrer',
                 'brukernavn': sBrukernavn,
                 'passord': sPassord,
                 'typeregistrering': iTypeRegistrering
        },
        success: function( result ) {
            if (result.bExists === false) { // Ny bruker OK
                loginSkjema();
            }
            else { // bruker finnes fra før
                if (parseInt(iTypeRegistrering) === 0)
                    bodyNotify("E-post allerede registrert", "error");
                else
                    bodyNotify("Mobilnr allerede registrert", "error");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr);			
            console.log(xhr.status);
            console.log(ajaxOptions);
            console.log(thrownError);
        }
    });
    
    $("#passordModal").show();
}

 function generatePassword() {

 }

function closeModal(sModal) {
    $("#"+sModal).toggle();
}

 function register() {
          var sBrukernavn = $("#brukernavn").val();

          //sjekke om Vilkår er huket av 
          if ($("#checkvilkar").is(":checked")) {

            //sjekk om det er en gyldig epost
            if(validateEmail(sBrukernavn)) { // sjekke om gyldig e-pst
                     createUser(sBrukernavn, 0); // 0 0 e-psot reigstrering 1 = mobilnummer
            }
            else { // eller guldig mobilnr, må begynne med 4 eller 9 og inneholde 8 siffer eller +47
                sBrukernavn = sBrukernavn.replace(/\s/g,''); // fjerne mellomrom for å kunne sjekke lenden p ånummeret
                var sMobilnummer = "";

                if (sBrukernavn.length === 12)
                {
                    sMobilnummer = sBrukernavn.substr(4);
                    var sLandKode = sBrukernavn.substr(0,4); 

                    if (sLandKode !== "0047")
                    {
                        bodyNotify("Kun Norske mobilnummer", "error");
                    }
                 }
                 else if (sBrukernavn.length === 11)
                 {
                    sMobilnummer = sBrukernavn.substr(3);
                    var sLandKode = sBrukernavn.substr(0,3); 

                    if (sLandKode !== "+47")
                    {
                        bodyNotify("Kun Norske mobilnummer", "error");
                    }
                 }
                 else if (sBrukernavn.length === 8)
                          sMobilnummer = sBrukernavn; // 8 siffret
                 else // er ikke 8 eller 11 siffer
                          bodyNotify("8 siffer i nr", "error");

                 // sjekke om det er et mobilnummer, må begynne med 4 eller 9
                 if(parseInt(sMobilnummer.substr(0,1)) === 4 || parseInt(sMobilnummer.substr(0,1)) === 9) {
                    // opprette bruker
                    createUser(sMobilnummer, 1); // 0 0 e-psot reigstrering 1 = mobilnummer
                 }
                 else // er ikke et mobilnummer og gi beskjed
                    bodyNotify("Ikke gyldig mobilnummer!", "error");
            }
          }
        else // vilkår er ikke huket av
        {
            bodyNotify("Vilkår må godkjennes!", "error");
        }
 }


 function validateEmail(email) {
          var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(String(email).toLowerCase());
 }

 function registerSkjema(){
    $("#tittel").html("Registrer deg");
    $("#vilkar").show(""); 
    $("#husk").hide(); 
    $("#text").html("Allerede medlem?");
    $("#reg").hide();
    $("#passord").hide();
    $("#inn").show("");
    $("#knapp").show("");
    $("#login").hide();

  }

  function loginSkjema(){
    $("#tittel").html("Logg inn");
    $("#vilkar").hide();  
    $("#text").html("Ingen konto?");
    $("#reg").show();
    $("#husk").show(); 
    $("#passord").show();
    $("#inn").hide();
    $("#knapp").hide();
    $("#login").show();
    $("#mail").show();
  }