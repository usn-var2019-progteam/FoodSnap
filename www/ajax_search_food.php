<?php
//session_start();

require_once "../dep/data_ret.php";
require_once "../dep/class_error.php";
//require_once "../dep/class_dbpdo.php";
require_once "../dep/class_util.php";


//$sSearch = class_util::post("term", "");
$sSearch = class_util::get("term");

$aHtmlRet = [];

$aLines = array(
	array('eple', 47, 10, 0.3, 0.2, 'Eple Norsk uspesifisert Rå'),
	array('tomat', 18, 2.5, 1, 0.2, 'Tomat Norsk Rå'),
	array('salat', 10, 1, 1, 0.2, 'Bladsalat Norsk Rå'),
	array('brød', 245, 46.8, 9.2, 1.3, 'Brød, 1/3 sammalt mel, skummet melk, hjemmebakt'),
	array('ost', 351, 0, 27, 27, 'Norvegia, gulost'),
	array('hamburgerbrød', 303, 49.5, 6.6, 8.3, 'Hamburgerbrød, fint, kjøpt'),
	array('ketchup', 95, 21, 1.7, 0, 'Idun Tomatketchup'),
	array('kjøtt', 141, 0, 22.4, 5.7, 'Storfe, entrecôte, synlig fett skåret vekk, rå'),
	array('majones', 728, 2, 0.9, 79.6, 'Majones, ekte'),
	array('pommes frites', 330, 39.8, 3, 16.8, 'Pommes frites, gatekjøkken'),
	array('cheddar', 416, 0.1, 25.4, 34.9, 'Cheddar, gulost')
);

$aResults = [];
$iCountResult = 0;

for ($i=0; $i<count($aLines); $i++)
{
	$aTempArr = $aLines[$i];
	//if (strpos($aTempArr[0], $sSearch))
	if (preg_match("/{$sSearch}/i", $aTempArr[0]))
	{
		$aResults[$iCountResult++] = $aLines[$i][0];
	}
}

if ($aRows !== false)
{
	foreach ($aResults as $aResult)
	{
		$aHtmlRet[] = [
			'id' => $aResult,
			'value'=>$aResult,
			'label'=>$aResult,
		];
	}
}
echo json_encode($aHtmlRet);

