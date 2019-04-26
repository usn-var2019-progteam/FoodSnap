<?php
if ( !class_exists("class_util"))
{
    class class_util
    {
        public static function is_loggedin()
        {
            if ( ! isset($_SESSION['login']['username']))
                return (false);

            return (true);
        }
        
        public static function not_authenticated()
        {
            header("location: index.html");
            exit(1);
        }
        
        public static function http_post($sUrl, $aData=null, $headers=null)
        {
            $_SESSION['post'] = $aData; // Set the post data.

            header("location: ".$sUrl); // call the function.
            exit(0);
        }
    
        public static function post($sField, $sDefault="")
        {
            if (isset($_POST[$sField]))
                return ($_POST[$sField]);
            if (isset($_SESSION['post'][$sField]))
            {
                $xValue = $_SESSION['post'][$sField];
                $_SESSION['post'][$sField] = null;
                return ($xValue);
            }
            return ($sDefault);
        }
        
        public static function get($sField, $sDefault="")
        {
            if (isset($_GET[$sField]))
                return ($_GET[$sField]);
            return ($sDefault);
        }
        
        public static function util_convert_date_nor2sql($sDate)
        {
            $sSqlDate = "";
            $sSqlDate = substr($sDate,6,4).'-'.substr($sDate,3,2).'-'.substr($sDate,0,2);
            return($sSqlDate);
        }
        
        public static function util_convert_date_sql2nor($sDate)
        {
            $sSqlDate = "";
            $sSqlDate = substr($sDate,8,2).'.'.substr($sDate,5,2).'.'.substr($sDate,0,4);
            return($sSqlDate);
        }
        
			public static function get_date_x_days_forward($sDate, $iDays)
        {
            $iStrToTimeFromDate = strtotime(date($sDate));
				$iSecundsprDay = 86400;
            $iSecundsiDays = (int)$iDays*$iSecundsprDay;
				$iNewStrToTimeToDate = $iStrToTimeFromDate+$iSecundsiDays;
            
            $sNewDate = date('Y-m-d', $iNewStrToTimeToDate);
				
            //$sNewDate = date($sDate, strtotime("+".$iDays." days"));
            return($sNewDate);
        }
        
        public static function setWeekdayNorFromNumber($iDayNr)
        {
            $sDayOfWeekNor = "";

            switch($iDayNr)
            {
                case '1':
                   $sDayOfWeekNor = "Mandag";
                   break;

                case '2':
                   $sDayOfWeekNor = "Tirsdag";
                   break;

                case '3':
                   $sDayOfWeekNor = "Onsdag";
                   break;

                case '4':
                   $sDayOfWeekNor = "Torsdag";
                   break;

                case '5':
                   $sDayOfWeekNor = "Fredag";
                   break;

                case '6':
                   $sDayOfWeekNor = "L&oslash;rdag";
                   break;

                case '7':
                   $sDayOfWeekNor = "S&oslash;ndag";
                   break;

            }
            return($sDayOfWeekNor);
        }
		  
		  public static function replaceNorwegianLetters($sText)
		  {
			  $sText = str_replace('æ', 'a', $sText);
			  $sText = str_replace('ø', 'o', $sText);
			  $sText = str_replace('å', 'a', $sText);
			  $sText = str_replace('Æ', 'A', $sText);
			  $sText = str_replace('Ø', 'O', $sText);
			  $sText = str_replace('Å', 'A', $sText);
			  
			  return $sText;
		  }
		  
		  public static function removeSpesialCharachtersNotSpace($sText) 
		  {
			  //return preg_replace('/[^a-zA-Z0-9%\[\]\.\(\)%&-]/s', '', $sText);
			  return preg_replace('/[^A-Za-z0-9 \-]/', '', $sText);
		  }
    }
}