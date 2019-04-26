<?php
// class_DL_bilde.php
// 
// This class contains all the interaction with the database.
// 
if ( !class_exists("class_DL_bilde"))
{
    require_once "../dep/class_error.php";
    require_once "../dep/class_dbpdo.php";
    require_once "../dep/class_DL.php";
    require_once "../dep/data_ret.php";
    
    class data_bilde
    {
        var $iBildeId;
        var $sBilde;
        var $iBrukerId;
        var $sOpprettetDato;
        
        function __construct()
        {
            $this->iBildeId = 0;
            $this->sBilde = "";
            $this->sBrukerId = "";
            $this->sOpprettetDato = "";
        }
    }

    class class_DL_bilde extends class_DL
    {
        function __construct($bDebug=false, $sLogFile=class_DL::DEFAULT_LOGFILE) {
            parent::__construct($bDebug, $sLogFile);
        }
        
        function __destruct() {
            parent::__destruct();
        }
        
        public static function create_trans(class_dbpdo $DB, data_bilde $oData)
        {
            $sSql = "INSERT INTO bilde (BildeId,Bilde,BrukerId,OpprettetDato)".
                " VALUES (:BildeId,:Bilde,:BrukerId,:OpprettetDato)";
                $iBildeId = $DB->query_execute($sSql, [
                    ':BildeId'=>$oData->$iBildeId,
                    ':Bilde'=>$oData->sBildenavn,
                    ':BrukerId'=>$oData->sBrukerId,
                    ':OpprettetDato'=>$oData->sOpprettetDato,
                ]);
            return($iBildeId);
        }
        
        public static function update_trans(class_dbpdo $DB, data_bilde $oData)
        {
            $sSql ="UPDATE bilde SET Bilde=:Bilde WHERE iBildeId=:iBildeId"; 
                $DB->query_execute($sSql, [ 
                    ':Bilde'=>$oData->sBilde,
                ]);
                return(true);

            /*$sSql ="UPDATE address SET address=:address,postnr=:postnr,city=:city WHERE individid=:individid";
            $DB->query_execute($sSql, [ 
                ':address'=>$oData->sAddress,
                ':postnr'=>$oData->sPostNr,
                ':city'=>$oData->sCity,
                ':individid'=>$oData->iIndividId 
            ]);
            return(true);*/
        }

        public static function delete_trans(class_dbpdo $DB, $iBildeId)
        {

            $sSql = "DELETE FROM Bilde WHERE iBildeId=:iBildeId";
            $DB->query_execute($sSql, [
                ':iBildeId'=>$oData->iBildeId
            ]);
            return (true);

            /*$sSql = "DELETE FROM calllog WHERE id=:id";
            $DB->query_execute($sSql, [
                ':id'=>$oData->iId
            ]);
            return (true);*/
        }

        public static function get_trans(class_dbpdo $DB)
        {
            $sSql = "SELECT BildeId,BrukerId,OpprettetDato FROM Bilde WHERE iBildeId=:iBildeId";
             $aRows = $DB->query_select($sSql);
             return ($aRows);

            /*$sSql = "SELECT id,callpers_id,created FROM calllog WHERE id=:id";
            $aRows = $DB->query_select($sSql, [
                ':id'=>$oData->iId
            ]);
            return ($aRows);*/
        }
		  
		  public function save_image($iIndividid, $sImage)
		  {
			  
				try
            {
                //$this->DB->beginTransaction();
                $iBildeId = self::save_image_trans($this->DB, $iIndividid, $sImage);
                
                //$this->DB->commit();
            }
            catch (PDOException $ex)
            {
                //$this->DB->rollBack();
                $this->oLog->dbexception_log($ex);
                return (new data_ret(__FILE__, __LINE__, class_error::ERROR_DATABASE, false, array('message'=>$ex->getMessage())));
            }
            return (new data_ret(__FILE__, __LINE__, class_error::ERROR_OK, true, $iBildeId ));
		  }
		  
		  public static function save_image_trans($DB, $iIndividid, $sImage)
		  {
			  $sSql = "INSERT INTO Bilde (BrukerId,OpprettetDato,Bilde) VALUES (:BrukerId,:OpprettetDato,:Bilde)";
			  $iImageId = $DB->query_execute($sSql, [ ':BrukerId' => $iIndividid, ':OpprettetDato' => date("Y-m-d H:i:s"), ':Bilde' => $sImage ]);
			  return $iImageId; 
		  }

        /*public function get_bilde_brukerId()
          {
              try
            {
                //$this->DB->beginTransaction();
                $aBilde = self::get_bilde_brukerId_trans($this->DB, $oBilde);
                
                //$this->DB->commit();
            }
            catch (PDOException $ex)
            {
                //$this->DB->rollBack();
                $this->oLog->dbexception_log($ex);
                return (new data_ret(_FILE_, _LINE_, class_error::ERROR_DATABASE, false, array('message'=>$ex->getMessage())));
            }
            return (new data_ret(_FILE_, _LINE_, class_error::ERROR_OK, true, [ 'id'=>$iBrukerId ] ));
          }

          public static function get_bilde_brukerId_trans(class_dbpdo $DB, data_bilde $oBilde)
          {
            $sSql = "SELECT BrukerId, Fornavn, Mellomnavn, Etternavn, Epost, Mobil, Passord, Brukertype, Brukerbetingelser, OpprettetDato, Aktiv FROM Bruker WHERE Epost =: Epost";
              $aRows = $DB->query_select($sSql, ['BrukerId'=> $oBilde->iBrukerId]);
             return ($aRows);
          }*/
    }
}