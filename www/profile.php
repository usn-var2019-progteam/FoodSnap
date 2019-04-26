<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Profil</title>
        <link rel="icon" href="img/favicon.PNG" sizes="16x16" type="image/png">
        
			<link rel="stylesheet" type="text/css" href="css/profile.css">
        
        <link rel="stylesheet" type="text/css" href="bootstrap-4.3.1-dist/css/bootstrap.min.css">
        <script type="text/javascript" src="bootstrap-4.3.1-dist/js/bootstrap.min.js"></script>
        
        <!--script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script-->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		  <script type="text/javascript" src="js/notify.js"></script>
       
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" id="bootstrap-css">
        <link rel="stylesheet" type="text/css" href="css/styleaktivitet.css"/>
    </head>
    <body>
        <div class="container snippet" id="profile">
            <div class="row">
                <div class="header">
                    <div class="col-sm-10"><h1>Endre brukerprofil</h1></div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-3"><!--left col-->
                    <div class="text-center">
                        <div class="status-circle"><h1>12345</h1></div>
                        <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" class="avatar img-thumbnail" alt="avatar">
                        <h6 id="navn"></h6>
                        <h6>Opplast nytt profilbilde</h6>
                        <!--input type="file" class="text-center file-upload" disabled-->
                </div>
                <hr>
                <br>
                <ul class="list-group">
                    <li class="list-group-item text-muted">Mine Aktiviteter<i class="fa fa-dashboard fa-1x"></i></li>
                    <li class="list-group-item text-right"><span class="pull-left"><strong>Bilder opplastet</strong></span> 13</li>
                    <!--<li class="list-group-item text-right"><span class="pull-left"><strong>Posts</strong></span> 37</li>
                    <li class="list-group-item text-right"><span class="pull-left"><strong>Followers</strong></span> 78</li> -->
                </ul> 
            </div><!--/col-3-->
            <div class="col-sm-9">
                <div class="tab-content">
                    <div class="tab-pane active" id="home">
                        <hr>
                        <form class="form" method="post" id="registrationForm">
                            <div class="col-xs-12 form-group">
                                <label for="first_name">Fornavn</label>
                                <input type="text" class="form-control" name="navn" id="first_name" placeholder="Fornavn" title="Fornavn.">
                            </div>
                            <div class="col-xs-12 form-group">
                                <label for="mellomnavn">Mellomnavn</label>
                                <input type="text" class="form-control" name="mellomnavn" id="mellomnavn" placeholder="Mellomnavn" title="Mellomnavn.">
                            </div>
                            <div class="col-xs-12 form-group">
                                <label for="etternavn">Etternavn</label>
                                <input type="text" class="form-control" name="etternavn" id="etternavn" placeholder="Etternavn" title="Etternavn.">
                            </div>
                            <div class="col-xs-12 form-group">
                                <label for="email">Email</label>
                                <input type="email" class="form-control" name="email" id="email" placeholder="E-post" title="E-post">
                            </div>
                          
                            <div class="col-xs-12 form-group">
                               <label for="mobil">Mobil</label>
                                <input type="text" class="form-control" name="mobil" id="mobil" placeholder="Mobilnummer" title="Mmobilnummer.">
                            </div>
                            <div class="col-xs-12 form-group">
                                <br>
                                <button type="button" class="btn btn-lg btn-success pull-right" onclick="updateUser();"><i class="glyphicon glyphicon-ok-sign"></i> Lagre</button>
                                <button type="button" class="btn btn-lg btn-default" onclick="back();"><i class="glyphicon glyphicon"></i>Tilbake</button>
                            </div>
                            <br>
									  <div class="col-xs-6 form-group">
                                <label for="passwordold">Gammelt passord</label>
                                <input type="password" class="form-control" name="password" id="passwordold" placeholder="Gammelt passord" title="Gammelt passord">
                            </div>
                            <div class="col-xs-6 form-group">
                                <label for="password1">Nytt passord</label>
                                <input type="password" class="form-control" name="password" id="password1" placeholder="Endre passord" title="legg til nytt passord.">
                            </div>
									<div class="col-xs-6 form-group">
										<label for="password2">Nytt passord repeter</label>
										<input type="password" class="form-control" name="password2" id="password2" placeholder="Nytt passord" title="legg til nytt passord.">
									</div>
									<div class="col-xs-12">
										<br>
										<button type="button" class="btn btn-lg btn-success pull-right" onclick="changePassword();"><i class="glyphicon glyphicon-ok-sign"></i> Lagre</button>
										<button type="button" class="btn btn-lg btn-danger"  disabled><i class="glyphicon glyphicon" style="color:white"></i>Slett bruker</button>	
										<!--<button class="btn btn-lg" type="reset"><i class="glyphicon glyphicon-repeat"></i> Reset</button>-->
									</div>
                        </form>
                    </div> 
                    <hr>
                </div>        
            </div><!--/tab-pane-->
        </div><!--/tab-content-->
		  </div>
        <script src="js/profile.js"></script>
    </body>
    
</html>
                                                      