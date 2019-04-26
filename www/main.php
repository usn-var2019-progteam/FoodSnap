<!DOCTYPE html>
<html lang="no">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>FoodSnap</title>
		<link rel="icon" href="img/favicon.PNG" sizes="16x16" type="image/png">

		<link rel="stylesheet" type="text/css" href="bootstrap-4.3.1-dist/css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="pretty-checkbox-master/dist/pretty-checkbox.css">
		<link rel='stylesheet' type='text/css' href='https://fonts.googleapis.com/css?family=Open+Sans'>
		<link rel="stylesheet" type="text/css" href="css/loading-bar.css">
		<link rel="stylesheet" type="text/css" href="css/jquery-eu-cookie-law-popup.css">

		<link rel="stylesheet" href="css/style.css">

		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<!--script type="text/javascript"  src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU=" crossorigin="anonymous"></script-->
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
		<script type="text/javascript" src="bootstrap-4.3.1-dist/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="https://use.fontawesome.com/releases/v5.0.8/js/all.js"></script>
		<script type="text/javascript" src="https://sdk.clarifai.com/js/clarifai-latest.js"></script>
		<script type="text/javascript" src="js/notify.js"></script>
		<script type="text/javascript"  src="js/jquery-eu-cookie-law-popup.js"></script>

		<!--script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"></script-->

		<script type="text/javascript" src="js/loading-bar.js"></script>
		<!--script type="text/javascript" src="intro.js-2.9.3/intro.js"></script>
		<link rel="stylesheet" href="intro.js-2.9.3/introjs.css"-->
	</head>
	<body class="eupopup eupopup-bottom">
		<!-- Navigation -->
		<nav class="navbar navbar-expand-md navbar-dark bg-red sticky-top">
			<div class="container-fluid">
				 <a class="navbar-brand" href="main.php">FoodSnap</a>
				 <button class="navbar-toggler" type="button" data-toggle="collapse"
							data-target="#navbarResponsive">
							<span class="navbar-toggler-icon"></span>
				 </button>

				 <div class="collapse navbar-collapse" id="navbarResponsive">
					<ul class="navbar-nav ml-auto">
						<li class="nav-item text-center" id="Login">
							<a class="nav-link" href="index.php"><span class="fas fa-user"></span>&nbsp;Registrer / Logg inn</a>
						</li>
						<li class="nav-item dropdown text-center " id="myPage">
							<a class="nav-link dropdown-toggle hideSmall" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								  Min side
							</a>
							<div class="dropdown-menu hideSmall " aria-labelledby="navbarDropdown">
								<a class="dropdown-item" href="minaktivitet.html">Min Aktivitet</a>
								<a class="dropdown-item" href="profile.php">Innstillinger</a>
								<a class="dropdown-item adminPage" href="admin.html" target="_blank">Admin</a>
								<div class="dropdown-divider"></div>
								<a class="dropdown-item" href="#" onclick="onClickLogOut();">Logg ut</a>
								<a class="dropdown-item bruker" href="minaktivitet.html"></a>
							</div>
						</li>
						
						<li class="nav-item dropdown text-center hidden whitetext" id="myPageSmall">
							<a class="dropdown-item whitetext" href="minaktivitet.html">Min Aktivitet</a>
							<a class="dropdown-item whitetext" href="profile.php">Innstillinger</a>
							<a class="dropdown-item adminPage whitetext" href="admin.html" target="_blank">Admin</a>
							<div class="dropdown-divider"></div>
							<a class="dropdown-item whitetext" href="#" onclick="onClickLogOut();">Logg ut</a>
							<a class="dropdown-item bruker whitetext" href="minaktivitet.html"></a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		<div class="container-fluid padding">
			<!--Ta bilde funksjon-->
			<div class="row text-center">
				<div class="col-12">
					<form name="analyseImage" id="analyseImage" method="post" enctype="multipart/form-data">
						<!--canvas class="img-fluid" id="hjem" onclick="activateCamera();" style="height:400px; width:auto;"></canvas-->
						<canvas class="img-fluid" id="hjem" onclick="activateCamera();" width="471" height="323"></canvas>
						<div>
							  <div class="intro-text" id="visAnalyse">
								  <button data-intro="Trykk her for å ta bilde" class="intro-lead-in btn btn-default" type="button" id="taBilde">
										<i class="fas fa-camera"></i>&nbsp;Ta bilde
								  </button>
								  <button data-intro="Trykk her for å laste opp bilde lokalt fra din enhet" class="intro-heading btn btn-default" type="button" id="lastOppBilde">
										<i class="fas fa-folder-open"></i>&nbsp;Last opp bilde
									</button>
									<!--her er introduksjonen <a href="javascript:void(0)" onclick="introJs().start();" class="page-scroll btn btn-xl">Start Introjs</a>--> 
							  </div>
						</div>
						<!-- id=mypic MÅ SJEKKES FOR FEIL! default "velg bilde" knapp kommer opp. Satt på display:none som midlertidig fix.-->
						<input type="file" id="mypic" name="image" accept="image/*" onchange="getFile();" style="display:none;">
					</form>
				</div>
			</div>
			<div class="container-fluid padding">
				<div class="row text-center">
					<div class="col-12" id="blankImageInfo">&nbsp;</div>
					<div class="col-12" id="imageInfo"></div>
				</div>
			</div>
			<div class="container-fluid padding">
			  <div class="row text-center">
				  <div class="col-12">
					  <hr class="my-4">
					  <h1>Næringsinnhold</h1>
					  <!--div class="btn-group btn-group-lg" id="fanContent"-->
						<div class="btn-group btn-group-lg">
							<div data-preset="circle" class="ldBar label-center" id="kcal" data-min="0" data-max="3000" data-value="0"> Kcal</div>
					  </div><br><br>
					  <!--div class="btn-group btn-group-lg" id="fanContent"-->
					  <div class="btn-group btn-group-lg">
						  <div data-preset="fan1" class="ldBar label-center" id="carb" data-min="0" data-max="200" data-value="0"></div>
						  <div data-preset="fan2" class="ldBar label-center" id="prot" data-min="0" data-max="200" data-value="0"></div>
						  <div data-preset="fan3" class="ldBar label-center" id="fat" data-min="0" data-max="200" data-value="0"></div>
					  </div>
					  <div>
						  g Karb&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						  g Prot&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						  g Fett
					  </div>
				  </div>
				</div>
			</div>
		</div>
		<div class="container-fluid sticky">
			<div class="text-center">
				<div class="lines">
					<!--div class="btn-group btn-group-lg" id="fanContent"-->
					<div class="btn-group btn-group-lg">
						<div data-preset="line4" class="ldBar label-center" id="kcall" data-min="0" data-max="1500" data-value="0"></div>
						<div data-preset="line1" class="ldBar label-center" id="carbl" data-min="0" data-max="200" data-value="0"></div>
						<div data-preset="line2" class="ldBar label-center" id="protl" data-min="0" data-max="200" data-value="0"></div>
						<div data-preset="line3" class="ldBar label-center" id="fatl" data-min="0" data-max="200" data-value="0"></div>
					</div>
				</div>
			</div>
		</div>
		<hr>
		<!--- Footer -->
		<footer>
			<div class="container-fluid padding" id="finn">
				<div class="row text-center">
					<div class="col-12">
						<h5>&copy; FoodSnap 2019</h5>
						<hr class="my-4">
					</div>
				</div>
			</div>
		</footer>

		<script type="text/javascript" src="js/mattabell.js"></script>
		<script type="text/javascript" src="js/translate.js"></script>
		<script type="text/javascript" src="js/script.js"></script>

		<div class="loading">Loading&#8230;</div>
	</body>
</html>