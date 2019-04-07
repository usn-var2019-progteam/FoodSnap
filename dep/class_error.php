<?php

/**
 * This is the class_error, and it has all the error messages.
 *
 * @author jig
 */
if ( !class_exists("class_error"))
{
    class class_error
    {
        const ERROR_OK                  = 0;
        /*const ERROR_AUTH_FAILED         = 1;
        const ERROR_DUPLICATE           = 2;
        const ERROR_HASH                = 3;
        const ERROR_INDIVIDID_MISSING   = 4;
        const ERROR_DATABASE            = 5;
        const ERROR_ID_MISSING          = 6;
        const ERROR_DATA_DEPENDENCY     = 7; // Data is dependent on other data.
        const ERROR_PARAMETER_ERROR     = 8; // Parameter error.
        const ERROR_DATA_NOT_FOUND      = 9;
        const ERROR_PHONENUMBER         = 10;
        const ERROR_MAILADDRESS         = 11;
        const ERROR_PHONENUMBER_RANGE   = 12;
        const ERROR_VALIDATION          = 13;*/
        
        const ERROR_GENERAL_ERROR       = 99;
        
        static $aErrors = [
            [ self::ERROR_OK,                   "Ok" ],
            /*[ self::ERROR_AUTH_FAILED,          "Feil brukernavn eller passord." ],
            [ self::ERROR_DUPLICATE,            "Dupliserte data." ],
            [ self::ERROR_INDIVIDID_MISSING,    "IndividId mangler." ],
            [ self::ERROR_DATABASE,             "Database feil." ],
            [ self::ERROR_HASH,                 "Hash generering feilet." ],
            [ self::ERROR_ID_MISSING,           "Id mangler" ],
            [ self::ERROR_PARAMETER_ERROR,      "Parameterfeil, parameter mangler." ],
            [ self::ERROR_DATA_DEPENDENCY,      "Data er avhengig av andre data." ],
            [ self::ERROR_PARAMETER_ERROR,      "Parameter error." ],
            [ self::ERROR_DATA_NOT_FOUND,       "Data not found." ],
            [ self::ERROR_PHONENUMBER,          "Feil i telefonnummer." ],
            [ self::ERROR_MAILADDRESS,          "Feil i mobilnummer." ],
            [ self::ERROR_PHONENUMBER_RANGE,    "Telefonnummeret er ikke et mobilnummer." ],
            [ self::ERROR_VALIDATION,           "Validering feilet." ],*/
            [ self::ERROR_GENERAL_ERROR,        "Generell feil." ],
            [ -1,                               "Ukjent feil." ]
        ];
            
        static function message($iErrCode)
        {
            $sRet = "";
            
            foreach (self::$aErrors as $aError)
            {
                if ((int)$iErrCode == (int)$aError[0])
                {
                    $sRet = $aError[1];
                    break; // Found value, get out of the loop.
                }
                else if ((int)$aError[0] == -1)
                    $sRet = $aError[1]; // Default message.
                    
            }
            return ($sRet);
        }
    }
}