<?php
// class_DL_address.php
// 
// This class contains all the interaction with the database.
// 
if ( !class_exists("class_DL_address"))
{
    require_once "../dep/class_error.php";
    require_once "../dep/class_dbpdo.php";
    require_once "../dep/class_DL.php";
    require_once "../dep/data_ret.php";
    
    class data_address
    {
        /*var $iId;
        var $iIndividId;
        var $sAddressType;
        var $sAddress;
        var $sPostNr;
        var $sCity;
        var $sActive;
        
        const ADDRESSTYPE_VISIT = "VISIT";
        const ADDRESSTYPE_POST = "POST";
        const ADDRESSTYPE_OLD = "OLD";*/
        
        function __construct()
        {
            /*$this->iId = 0;
            $this->iIndividId = 0;
            $this->sAddressType = "";
            $this->sAddress = "";
            $this->sPostNr = "";
            $this->sCity = "";
            $this->sActive = "";*/
        }
    }

    class class_DL_address extends class_DL
    {
        function __construct($bDebug=false, $sLogFile=class_DL::DEFAULT_LOGFILE) {
            parent::__construct($bDebug, $sLogFile);
        }
        
        function __destruct() {
            parent::__destruct();
        }
        
        public static function create_trans(class_dbpdo $DB, data_address $oData)
        {
            /*$sSql ="INSERT INTO address (individid,address,postnr,city,active) VALUES (:individid,:address,:postnr,:city,:active)";
            $iAddressId = $DB->query_execute($sSql, [
                ':individid'=>$oData->iIndividId,
                ':address'=>$oData->sAddress,
                ':postnr'=>$oData->sPostNr,
                ':city'=>$oData->sCity,
                ':active'=>$oData->sActive
            ]);
            return($iAddressId);*/
        }
        
        public static function update_trans(class_dbpdo $DB, data_address $oData)
        {
            /*$sSql ="UPDATE address SET address=:address,postnr=:postnr,city=:city WHERE individid=:individid";
            $DB->query_execute($sSql, [ 
                ':address'=>$oData->sAddress,
                ':postnr'=>$oData->sPostNr,
                ':city'=>$oData->sCity,
                ':individid'=>$oData->iIndividId 
            ]);
            return(true);*/
        }
        
        public static function delete_trans(class_dbpdo $DB, $iAddressId)
        {
            /*$sSql = "DELETE FROM calllog WHERE id=:id";
            $DB->query_execute($sSql, [
                ':id'=>$oData->iId
            ]);
            return (true);*/
        }
        
        public static function get_trans(class_dbpdo $DB, $iAddressId)
        {
            /*$sSql = "SELECT id,callpers_id,created FROM calllog WHERE id=:id";
            $aRows = $DB->query_select($sSql, [
                ':id'=>$oData->iId
            ]);
            return ($aRows);*/
        }
    }
}

