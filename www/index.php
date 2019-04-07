<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	 <link rel="icon" href="img/favicon.PNG" sizes="16x16" type="image/png">
	 
    <title>Login - Foodsnap</title>
	 
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
	 <link rel="stylesheet" type="text/css" href="css/jquery-eu-cookie-law-popup.css">
    <link rel="stylesheet" type="text/css" href="css/login-style.css">
	 
    <!--script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script-->
	 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script> 
	 <script type="text/javascript"  src="js/jquery-eu-cookie-law-popup.js"></script>
	 <script type="text/javascript" src="js/notify.js"></script>
</head>

<body class="eupopup eupopup-bottom">
    <section class="bg">
        <div class="login-form">
            <form name= "form" action"" method="post">
                <h2 class="text-center" id="tittel">Logg inn</h2>      
                <div class="text-center social-btn">
                    <a href="#" class="btn btn-primary btn-block"><i class="fa fa-facebook"></i> Fortsett med <b>Facebook</b></a>
                    <a href="#" class="btn btn-danger btn-block"><i class="fa fa-google"></i> Fortsett med <b>Google</b></a>
                </div>

                <div class="or-seperator"><i>eller</i></div>

                <div class="form-group">
                    <label for="exampleInputEmail1">E-postadresse/mobil</label>
                    <input type="email" class="form-control" id="brukernavn" aria-describedby="emailHelp" placeholder="E-postadresse/mobil">
                </div>

                <div class="form-group" id="passord" >
                    <label for="exampleInputPassword1">Passord</label>
                    <input type="password" class="form-control" id="password" placeholder="Passord">
                </div>

                <div class="clearfix" id="vilkar" style="display:none;">
                    <label class="pull-left checkbox-inline"><input type="checkbox" id="checkvilkar">Jeg samtykker til vilkårene</label> 
                    <br>
                    <!--a href="#" class="hint-text small" style="padding-left: 23px;">Personvern og vilkår</a-->
						  <a data-target="#modalVilkar" data-toggle="modal" class="MainNavText hint-text small" id="MainNavHelp" href="#modalVilkar" style="padding-left: 23px;">
                        Personvern og vilkår
                    </a>
                </div>

                <div class="clearfix" id="husk">
                    <label class="pull-left checkbox-inline"><input type="checkbox" id="huskMeg">Husk meg</label> 
                     <br>
                    <br>
                </div>

                <div class="form-group">
                    <button type="button" class="btn btn-success btn-block login-btn" id="login" onclick="loginFoodsnap();">
                        Logg inn 
                    </button>
                </div>

                <div class="form-group">
                    <button type="button" class="btn btn-success btn-block login-btn" id="knapp" style="display:none;" onclick="register();"><!--a href="reg-log.php" style="color:#ffff"-->
                            Registrer
                        <!--/a-->
                    </button>
                </div>

               <div class="hint-text" id="mail" style="display:none;"> 
                Du vil nå motta en e-post/sms med en engangskode. Koden sendes til e-postadressen/mobilnummer som er registrert. 
               </div> 
            </form>
            <div class="hint-text small" id="text">Ingen konto?</div>
            <div class="hint-text small" > 
                <a href="#" class="text-success" id= "reg" onClick="registerSkjema();">Register deg her!</a>
                <a href="index.php" class="text-success" id= "inn" style="display:none;">Logg inn her!</a>
                <a href="main.php" class="text-success" id= "hopp">Hopp over</a>
            </div>
        </div>

    </section>
	 <!-- The Modal -->
	<div class="modal" id="modalVilkar">
	  <div class="modal-dialog">
		 <div class="modal-content">

			<!-- Modal Header -->
			<div class="modal-header">
			  <h4 class="modal-title">Personvern og vilkår</h4>
			  <button type="button" class="close" data-dismiss="modal">&times;</button>
			</div>

			<!-- Modal body -->
			<div class="modal-body">
			  Vi tar våre kunders personvern på alvor, og sørger for at vi til enhver tid følger gjeldende lov 
			  for behandling av personopplysninger. På disse sidene får du informasjon om våre vilkår samt hvordan vi 
			  håndterer bruk av informasjonskapsler, også kalt cookies.
			</div>

			<!-- Modal footer -->
			<div class="modal-footer">
			  <button type="button" class="btn btn-danger" data-dismiss="modal">Lukk</button>
			</div>
		 </div>
	  </div>
	</div>
    <script type="text/javascript"> 
		
				// sjekke om det er lagret cookies
				console.log(window.localStorage.getItem("loggedinn"));
			  if (window.localStorage.getItem("loggedinn") === "T")
			  {
				  var sBrukernavn = window.localStorage.getItem("Brukernavn");
				  var iVisits = window.localStorage.getItem("visits");
				  window.localStorage.setItem("visits", ++iVisits);
				  if (window.localStorage.getItem("huskmeg") == "T")
					  loginHuskMeg(sBrukernavn);

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
									var iVisits = window.localStorage.getItem("visits");
									window.localStorage.setItem("Brukernavn", sBrukernavn);
									window.localStorage.setItem("loggedinn", "T");
									window.localStorage.setItem("visits", ++iVisits);
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
							if (parseInt(iTypeRegistrering) === 0)
								 bodyNotify("E-post: ditt passord til Foodsnap er "+sPassord, "info");
							else
								bodyNotify("SMS: ditt passord til Foodsnap er "+sPassord, "info");

							loginSkjema();
						}
						else { // bruker finnes fra før
							if (parseInt(iTypeRegistrering) === 0)
								bodyNotify("E-post er registrert tidligere, trykk på nytt passord", "error");
							else
								bodyNotify("Mobilnummer er registrert tidligere, trykk på nytt passord", "error");
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

			 function generatePassword() {

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
									bodyNotify("Vi godtar kun Norske mobilnummer, registrer deg med e-post", "error");
								}
							 }
							 else if (sBrukernavn.length === 11)
							 {
								  sMobilnummer = sBrukernavn.substr(3);
								  var sLandKode = sBrukernavn.substr(0,3); 

								  if (sLandKode !== "+47")
								  {
										bodyNotify("Vi godtar kun Norske mobilnummer, registrer deg med e-post", "error");
								  }
							 }
							 else if (sBrukernavn.length === 8)
								  sMobilnummer = sBrukernavn; // 8 siffret
							 else // er ikke 8 eller 11 siffer
								  bodyNotify("Feil antall siffer i mobilnummer, bruk 8 siffer", "error");

							 // sjekke om det er et mobilnummer, må begynne med 4 eller 9
							 if(parseInt(sMobilnummer.substr(0,1)) === 4 || parseInt(sMobilnummer.substr(0,1)) === 9) {
								  // opprette bruker
								  createUser(sMobilnummer, 1); // 0 0 e-psot reigstrering 1 = mobilnummer
							 }
							 else // er ikke et mobilnummer og gi beskjed
								  bodyNotify("Nummeret er ikke en gyldig e-post eller mobilnummer", "error");
						}
				  }
				  else // vilkår er ikke huket av
				  {
						bodyNotify("Vilkår må godkjennes for å opprette konto", "error");
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
			  
    </script>
</body>
</html>                            