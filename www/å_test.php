<html>
    <head>
        <title>Login</title>
    </head>
	 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	 <script>
		 function login() {
			 var sBrukernavn = $("#brukernavn").val();
			 var sPassord = $("#passord").val();
			 console.log(sBrukernavn);
			 console.log(sPassord);
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
					console.log(result)
					var aData = result.aData[0];
					console.log(aData);
					var PassordDB = aData['Passord'];
					console.log("passordDB: " + PassordDB);
				}
			 });
			 
		 }
	 </script>
		 
    <body>
			Brukernavn: <input type="text" name="brukernavn" id="brukernavn" /><br />
			Passord: <input type="password" name="passord" id="passord" /><br />
			<button type="button" onclick="login();">Logg inn</button>
    </body>
</html>


<?php
/*require_once "../dep/class_DL_bruker.php";

$oObj = new class_DL_bruker();

$oBruker = $oObj->get();
$aBruker = $oBruker->aData;

for ($i=0; $i<count($aBruker); $i++)
{
	echo $aBruker[$i]["Fornavn"].' '.$aBruker[$i]["Etternavn"].'<br />';
}*/

?>
	 
