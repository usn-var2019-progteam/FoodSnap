
var iUserId = parseInt(window.sessionStorage.getItem("BrukerId"));
$( document ).ready(function() {
    //console.log(window.sessionStorage.getItem("BrukerId"));
    
    if (parseInt(window.sessionStorage.getItem("BrukerId")) > 0) {
        $("#profile").show();
        
        getUser();
    }
    else
        window.location.href = "index.php";
    
    function getUser() {
        $.ajax({
            url: "ajax_bruker.php",
            method: "post",
            dataType: 'json',
            data: {
                'act': 'getUser',
                'userid': iUserId
            },
            success: function( result ) {
                //console.log(result)
                var sFirstname  = result[0]['Fornavn'];
                var sMiddlename = result[0]['Mellomnavn'];
                var sLastname   = result[0]['Etternavn'];
                $("#first_name").val(sFirstname);
                $("#mellomnavn").val(sMiddlename);
                $("#etternavn").val(sLastname);
                $("#email").val(result[0]['Epost']);
                $("#mobil").val(result[0]['Mobil']);
                $("#navn").val(sFirstname+' '+sMiddlename+' '+sLastname);

            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr);			
                console.log(xhr.status);
                console.log(ajaxOptions);
                console.log(thrownError);
            }
        });
    }
    
    
});
    
function updateUser() {
    var sFirstname  = $("#first_name").val();
    var sMiddlename = $("#mellomnavn").val();
    var sLastname   = $("#etternavn").val();
    var sEmail      = $("#email").val();
    var sMobile     = $("#mobil").val();
    
    $.ajax({
        url: "ajax_bruker.php",
        method: "post",
        dataType: 'json',
        data: {
            'act': 'updateUser',
            'userid': iUserId,
            'firstname': sFirstname,
            'middlename': sMiddlename,
            'lastname': sLastname,
            'email': sEmail,
            'mobile': sMobile
        },
        success: function( result ) {
            //console.log(result);
            //getUser();
            bodyNotify("Brukerinfo endret", "success");
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr);			
            console.log(xhr.status);
            console.log(ajaxOptions);
            console.log(thrownError);
        }
    });
}

function changePassword() {
    var sNewPassword1  = $("#password1").val();
    var sNewPassword2 = $("#password2").val(); 
    
    if (sNewPassword1 == sNewPassword2) {
        var sOldPasssword = $("#passwordold").val();
        
        $.ajax({
            url: "ajax_bruker.php",
            method: "post",
            dataType: 'json',
            data: {
                'act': 'changePassword',
                'userid': iUserId,
                'passwordold': sOldPasssword,
                'passwordnew': sNewPassword1
            },
            success: function( result ) {
                //console.log(result);
                if (result)
                    bodyNotify("Passord endret", "success");
                else
                    bodyNotify("Gammelt passord stemmer ikke", "error");
                    
                //getUser();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr);			
                console.log(xhr.status);
                console.log(ajaxOptions);
                console.log(thrownError);
            }
        });
        
    }
    else { //olassord ikek like
        bodyNotify("Nytt passord samsvarer ikke", "error");
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

function back() {
    window.location.href = "main.php";
}

