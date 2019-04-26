<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	 <link rel="icon" href="img/favicon.PNG" sizes="16x16" type="image/png">
	 
    <title>Login - Foodsnap</title>
	 
	 <link rel="stylesheet" type="text/css" href="bootstrap-4.3.1-dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
	 <link rel="stylesheet" type="text/css" href="css/jquery-eu-cookie-law-popup.css">
    <link rel="stylesheet" type="text/css" href="css/login-style.css">
	 
	 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	 <script type="text/javascript" src="bootstrap-4.3.1-dist/js/bootstrap.min.js"></script>
	 <script type="text/javascript"  src="js/jquery-eu-cookie-law-popup.js"></script>
	 <script type="text/javascript" src="js/notify.js"></script>
	  
</head>

<body class="eupopup eupopup-bottom">
    <section class="bg">
        <div class="login-form">
            <form name="form" method="post">
                <h2 class="text-center" id="tittel">Logg inn</h2>      
                <div class="text-center social-btn">
                    <a href="#" class="btn btn-primary btn-block"><i class="fa fa-facebook"></i> Fortsett med <b>Facebook</b></a>
                    <a href="#" class="btn btn-danger btn-block"><i class="fa fa-google"></i> Fortsett med <b>Google</b></a>
                </div>

                <div class="or-seperator"><i>eller</i></div>

                <div class="form-group">
                    <label for="brukernavn">E-postadresse/mobil</label>
                    <input type="email" class="form-control" id="brukernavn" placeholder="E-postadresse/mobil">
                </div>

                <div class="form-group" id="passord" >
                    <label for="password">Passord</label>
                    <input type="password" class="form-control" id="password" placeholder="Passord">
                </div>

                <div class="clearfix" id="vilkar" style="display:none;">
                    <label class="pull-left checkbox-inline"><input type="checkbox" id="checkvilkar">&nbsp;Jeg samtykker til vilkårene</label> 
                    <br>
                    <!--a href="#" class="hint-text small" style="padding-left: 23px;">Personvern og vilkår</a-->
						  <a data-target="#modalVilkar" data-toggle="modal" class="MainNavText hint-text small" id="MainNavHelp" href="#modalVilkar" style="padding-left: 23px;">
                        Personvern og vilkår
                    </a>
                </div>

                <div class="clearfix" id="husk">
                    <label class="pull-left checkbox-inline"><input type="checkbox" id="huskMeg">&nbsp;Husk meg</label> 
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
                
            	<div class="hint-text small" >
            		<div id="text">Ingen konto?</div> 
            		<div>
            			<a href="#" class="text-success" id= "reg" onClick="registerSkjema();">Register deg her!</a>
	                	<a href="index.php" class="text-success" id= "inn" style="display:none;">Logg inn her!</a>
	                </div>
		            <div> 
		            	<a href="main.php" class="text-success" id= "hopp">Hopp over</a>
		            </div>
            	</div>
            </form>
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
	
	 <div class="modal" id="passordModal">
	  <div class="modal-dialog">
		 <div class="modal-content">

			<!-- Modal Header -->
			<div class="modal-header">
			  <h4 class="modal-title">E-post / SMS</h4>
			  <button type="button" class="close" data-dismiss="modal">&times;</button>
			</div>

			<!-- Modal body -->
			<div class="modal-body">
			  Ditt passord er 1234<br />
			  Du kan nå logge inn
			</div>

			<!-- Modal footer -->
			<div class="modal-footer">
			  <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="closeModal('passordModal');">Lukk</button>
			</div>
		 </div>
	  </div>
	</div>
	 
	<script type="text/javascript" src="js/index.js"></script>
</body>
</html>                            