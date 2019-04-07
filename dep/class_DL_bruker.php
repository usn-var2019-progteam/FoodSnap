<?php
// class_DL_bruker.php
// 
// This class contains all the interaction with the database.
// 
if ( !class_exists("class_DL_bruker"))
{
    require_once "../dep/class_error.php";
    require_once "../dep/class_dbpdo.php";
    require_once "../dep/class_DL.php";
    require_once "../dep/data_ret.php";
    
    class data_bruker
    {
        var $iBrukerId;
        var $sFornavn;
		  var $sMellomnavn;
		  var $sEtternavn;
		  var $sEpost;
		  var $sMobil;
		  var $sPassord;
		  var $sBrukerType;
		  var $bBrukerbetingelser;
		  var $sOpprettetDato;
		  var $bAktiv;
		  var $bExists;
        
        const BRUKERTYPE_ADMIN = "ADMIN";
        const BRUKERTYPE_BRUKER = "BRUKER";
        
        function __construct()
        {
            $this->iBrukerId = 0;
            $this->sFornavn = "";
				$this->sMellomnavn = "";
				$this->sEtternavn = "";
				$this->sEpost = "";
				$this->sMobil = null;
				$this->sPassord = "";
				$this->sBrukerType = "";
				$this->bBrukerbetingelser = false;
				$this->sOpprettetDato = "";
				$this->bAktiv = false;
				$this->bExists = false;
				
        }
    }

    class class_DL_bruker extends class_DL
    {
        function __construct($bDebug=false, $sLogFile=class_DL::DEFAULT_LOGFILE) {
            parent::__construct($bDebug, $sLogFile);
        }
        
        function __destruct() {
            parent::__destruct();
        }
        
        public static function create_trans(class_dbpdo $DB, data_bruker $oData)
        {
			  $sSql = "INSERT INTO Bruker (Fornavn,Mellomnavn,Etternavn,Epost,Mobil,Passord,BrukerType,Brukerbetingelser,OpprettetDato,Aktiv)".
						 " VALUES (:Fornavn,:Mellomnavn,:Etternavn,:Epost,:Mobil,:Passord,:BrukerType,:Brukerbetingelser,:OpprettetDato,:Aktiv)";
			  $iBrukerId = $DB->query_execute($sSql, [
					':Fornavn'=>$oData->sFornavn,
					':Mellomnavn'=>$oData->sMellomnavn,
					':Etternavn'=>$oData->sEtternavn,
					':Epost'=>$oData->sEpost,
				   ':Mobil'=>$oData->sMobil,
					':Passord'=>$oData->sPassord,
				   ':BrukerType'=>$oData->sBrukerType,
					':Brukerbetingelser'=>$oData->bBrukerbetingelser,
				   ':OpprettetDato'=>$oData->sOpprettetDato,
					':Aktiv'=>$oData->bAktiv
            ]);
            return $iBrukerId;
        }
        
        public static function update_trans(class_dbpdo $DB, data_bruker $oData)
        {
				/*$sSql = "UPDATE Bruker SET Fornavn=:Fornavn,Mellomnavn=:Mellomnavn,Etternavn=:Etternavn,Epost=:Epost,:Mobil,:Passord,:BrukerType,:Brukerbetingelser,:OpprettetDato,:Aktiv"
				
			  
            $sSql ="UPDATE address SET address=:address,postnr=:postnr,city=:city WHERE individid=:individid";
            $DB->query_execute($sSql, [ 
                ':address'=>$oData->sAddress,
                ':postnr'=>$oData->sPostNr,
                ':city'=>$oData->sCity,
                ':individid'=>$oData->iIndividId 
            ]);
            return(true);*/
        }
        
        public static function delete_trans(class_dbpdo $DB, $iBrukerId)
        {
            /*$sSql = "DELETE FROM calllog WHERE id=:id";
            $DB->query_execute($sSql, [
                ':id'=>$oData->iId
            ]);
            return (true);*/
        }
        
        public static function get_trans(class_dbpdo $DB)
        {
			  $sSql = "SELECT BrukerId,Fornavn,Mellomnavn,Etternavn,Epost,Mobil,Passord,BrukerType,Brukerbetingelser,OpprettetDato,Aktiv FROM Bruker";
			  $aRows = $DB->query_select($sSql);
           return ($aRows);
           
        }
		  
		  public function get_bruker_epost_mobil(data_bruker $oBruker)
		  {
			  try
            {
					class_log::logg("DEBUG", __FILE__.' '.__LINE__);
					//$this->DB->beginTransaction();
                $aBruker = self::get_bruker_epost_mobil_trans($this->DB, $oBruker);
					class_log::logg("DEBUG", __FILE__.' '.__LINE__);
					//$this->DB->commit();
            }
            catch (PDOException $ex)
            {
                //$this->DB->rollBack();
                $this->oLog->dbexception_log($ex);
                return (new data_ret(__FILE__, __LINE__, class_error::ERROR_DATABASE, false, array('message'=>$ex->getMessage())));
            }
            return (new data_ret(__FILE__, __LINE__, class_error::ERROR_OK, true, $aBruker ));
		  }
		  
		  public static function get_bruker_epost_mobil_trans(class_dbpdo $DB, data_bruker $oBruker) 
		  {
			  $sSql = "SELECT BrukerId,Fornavn,Mellomnavn,Etternavn,Epost,Mobil,Passord,BrukerType,Brukerbetingelser,OpprettetDato,Aktiv FROM Bruker WHERE Epost=:Epost OR Mobil=:Mobil";
			  $aRows = $DB->query_select($sSql, [ ':Epost' => $oBruker->sEpost, ':Mobil' => $oBruker->sMobil ]);
           return ($aRows);
		  }
    }
}

