<?php
require_once "../dep/class_util.php";
//require_once "../dep/class_dbpdo.php";
require_once "../dep/class_log.php";
require_once "../dep/class_DL_bilde.php";
require_once "../dep/class_DL_innhold.php";

$sAct = class_util::post("act", "");

switch ($sAct)
{
	case "lagre_bilde_innhold":
		action_lagre_bilde_innhold();
		break;
	
	case "lagre_bilde":
		action_lagre_bilde();
		break;
	
	default:
		action_default();
		break;
}
exit(0);

function action_lagre_bilde_innhold()
{
	$oObj = new class_DL_innhold();
	$oDataInnhold = new data_innhold();
	
	$iIndividId = intval(class_util::post("individid", 0));
	$oDataInnhold->iBildeId = intval(class_util::post("bildeid", 0));
	$oDataInnhold->sInnhold = class_util::post("innhold", "");
	
	$sLagre = class_util::post("lagre", "T");
	
	if ($sLagre == "T")
	{
		$oDataInnhold->dGram = doubleval(class_util::post("mengde", 0.0));
		$oDataInnhold->dKcal = doubleval(class_util::post("kcal", 0.0));
		$oDataInnhold->dKarb = doubleval(class_util::post("karb", 0.0));
		$oDataInnhold->dProt = doubleval(class_util::post("prot", 0.0));
		$oDataInnhold->dFett = doubleval(class_util::post("fett", 0.0));
		
		// sjekke om varen er lagret fra før
		$oRes = $oObj->get_innhold_exist_bilde($oDataInnhold);
		$aData = $oRes->aData;
		if (count($aData) > 0) //oppdater
			$oRes = $oObj->update($oDataInnhold);
		else // lagre ny
			$oRes = $oObj->create($oDataInnhold);
	}
	else
	{
		$oRes = $oObj->delete($oDataInnhold);
	}
	
	echo json_encode($oRes);
}

function action_lagre_bilde()
{
	$oObj = new class_DL_bilde();
	
	class_log::logg("DEBUG", __FILE__.' '.__LINE__);
	
	$iIndividId = intval(class_util::post("individid", 0));
	$BlobBilde = class_util::post("bilde", "");
	
	$oRes = $oObj->save_image($iIndividId, $BlobBilde);
	$iImageId = $oRes->aData;
	
	echo json_encode($iImageId);
}

/*function action_staistic()
{
	$oObj = new class_DL_diary();
	
	$iIndividId = intval(class_util::post("individid", 0));
	$sDiaryDate = class_util::post("date", "");
	
	$oRes = $oObj->getMoodPointsDays($iIndividId, "2019-03-31", "2019-04-06");
	$aDiary[0] = $oRes->aData;
	
	$oRes = $oObj->getMoodPointsDays($iIndividId, "2019-03-07", "2019-04-06");
	$aDiary[1] = $oRes->aData;
	
	echo json_encode($aDiary);
}

function action_getDiarydayDate()
{
	$oObj = new class_DL_diary();
	
	$iIndividId = intval(class_util::post("individid", 0));
	$sDiaryDate = class_util::post("date", "");
	
	$oRes = $oObj->getDiaryDayDate($sDiaryDate, $iIndividId);
	$aDiary = $oRes->aData;
	
	echo json_encode($aDiary);
}

function action_getDiaryday()
{
	$oObj = new class_DL_diary();
	
	$iIndividId = intval(class_util::post("individid", 0));
	$iDiaryId = intval(class_util::post("diaryId", 0));
	
	$oRes = $oObj->getDiaryDay($iDiaryId);
	$aDiary = $oRes->aData;
	
	echo json_encode($aDiary);
}

function action_getDiary()
{
	$oObj = new class_DL_diary();
	
	$iIndividId = intval(class_util::post("individid", 0));
	$sDate = class_util::post("individid", "");
	
	$oRes = $oObj->getDiary9Days($iIndividId);
	$aDiary = $oRes->aData;
	
	echo json_encode($aDiary);
}


//Sjekker om man allerede har skrevet dagbok på en dato.
function action_checkDiaryDate()
{
	$oObj = new class_DL_diary();
	$oDiary = new data_diary();
	
	$oDiary->iIndividId = intval(class_util::post("individid", 0));
	$oDiary->sDate = class_util::post("date", "");

	$bExist = false;
	
	$oRes = $oObj->getDiaryDate($oDiary);
	$aDiary = $oRes->aData;
	if (count($aDiary) > 0)
		$bExist = true;
	
	echo json_encode($bExist);
}

function action_saveDiary()
{
	$oObj = new class_DL_diary();
	$oDiary = new data_diary();
	
	$oDiary->id = intval(class_util::post("diaryid", 0));
	$oDiary->iIndividId = intval(class_util::post("individid", 0));
	$oDiary->sDate = class_util::post("date", "");
	$oDiary->sText = class_util::post("text", "");
	$oDiary->iMoodpoints = class_util::post("moodpoint", "");

	$bUpdate = $oObj->create($oDiary);
	
	echo json_encode($bUpdate);
}

function action_updateIndivid()
{
	$oObj = new class_DL_individuals();
	$oIndivid = new data_individuals();
	
	$oIndivid->id = intval(class_util::post("individid", 0));
	$oIndivid->sUsername = class_util::post("username", "");
	$oIndivid->sFirstname = class_util::post("firstname", "");
	$oIndivid->sMiddlename = class_util::post("middlename", "");
	$oIndivid->sLastname = class_util::post("lastname", "");
	$oIndivid->sMobile = class_util::post("mobile", "");
	$oIndivid->sEmail = class_util::post("email", "");

	$bUpdate = $oObj->update($oIndivid);
	
	echo json_encode($bUpdate);
}

function action_getIndivid()
{
	$oObj = new class_DL_individuals();
	
	$iIndividid = intval(class_util::post("individid", 0));
	
	$oRes = $oObj->get($iIndividid);
	$aIndivid = $oRes->aData;
	
	$_SESSION['image'] = $aIndivid[0]['image'];
	
	echo json_encode($aIndivid);
}

function action_login()
{
	$oObj = new class_DL_individuals();
	$oIndivid = new data_individuals();
	
	$oIndivid->sUsername = class_util::post("username", "");
	
	$oRes = $oObj->get_individ_username($oIndivid->sUsername);
	$aIndivid = $oRes->aData;
	if (count($aIndivid) > 0) // bruker finnes
	{
		$sPassword = class_util::post("password", "");
		
		if (password_verify($sPassword, $aIndivid[0]['password']))
		{
			$aIndivid['exists'] = true;
		}
		else
		{
			$aIndivid['exists'] = false;
		}
	}
	else // bruker finnes ikke
	{
		$aIndivid['exists'] = false;
	}
	
	echo json_encode($aIndivid);
}

/*function action_register()
{
	$oObj = new class_DL_individuals();
	$oIndivid = new data_individuals();
	
	$oIndivid->sUsername = class_util::post("username", "");
	
	// sjekk eom bruker allerede er registrert
	$oRes = $oObj->get_individ_username($oIndivid->sUsername);
	$aIndivid = $oRes->aData;
	if (count($aIndivid) > 0) // bruker finnes
	{
		$oIndivid->bExists = true;
		$iIndividId = 0;
	}
	else
	{
		//NY bruker, samle opp informasjon og lagre i databasen
		$oIndivid->sFirstname = class_util::post("firstname", "");
		$oIndivid->sMiddlename = class_util::post("middlename", "");
		$oIndivid->sLastname = class_util::post("lastname", "");
		$oIndivid->sMobile = class_util::post("mobile", "");
		$oIndivid->sEmail = class_util::post("email", "");
		$sPassword = class_util::post("password", "");
		$oIndivid->sPassword = password_hash($sPassword, PASSWORD_DEFAULT);
		$oIndivid->sUsertype = "USER";
		$oIndivid->sUserterms = "T";
		$oIndivid->sImage = class_util::post("image", "");
		$oIndivid->sActive = "T";
		
		$iIndividId = $oObj->create($oIndivid);
	}
	echo json_encode($iIndividId);
}*/

function action_default()
{
	exit(0);
}