<?php
// class_DL_innhold.php
// 
// This class contains all the interaction with the database.
// 
if ( !class_exists("class_DL_innhold"))
{
    require_once "../dep/class_error.php";
    require_once "../dep/class_dbpdo.php";
    require_once "../dep/class_DL.php";
    require_once "../dep/data_ret.php";
    
    class data_innhold
    {
        var $iInnholdId;
		  var $sInnhold;
        var $iBildeId;
        var $dKcal;
		  var $dKarb;
        var $dProt;
        var $dFett;
        var $dGram;
        
        function __construct()
        {
            $this->iInnholdId = 0;
				$this->sInnhold = "";
            $this->iBildeId = 0;
            $this->dKcal = 0.0;
            $this->dKarb = 0.0;
            $this->dProt = 0.0;
            $this->dFett = 0.0;
            $this->dGram = 0.0;
        }
    }

    class class_DL_innhold extends class_DL
    {
        function __construct($bDebug=false, $sLogFile=class_DL::DEFAULT_LOGFILE) {
            parent::__construct($bDebug, $sLogFile);
        }
        
        function __destruct() {
            parent::__destruct();
        }
        
        public static function create_trans(class_dbpdo $DB, data_innhold $oData)
        {
            $sSql = "INSERT INTO Innhold (Innhold,BildeId,Kcal,Karb,Prot,Fett,Gram) ".
						  "VALUES (:Innhold,:BildeId,:Kcal,:Karb,:Prot,:Fett,:Gram)";
				$iInnholdId = $DB->query_execute($sSql, [
					':Innhold'=>$oData->sInnhold,
					':BildeId'=>$oData->iBildeId,
					':Kcal'=>$oData->dKcal,
					':Karb'=>$oData->dKarb,
					':Prot'=>$oData->dProt,
					':Fett'=>$oData->dFett,
					':Gram'=>$oData->dGram
				]);
            return($iInnholdId);

        }
        
		public static function update_trans(class_dbpdo $DB, data_innhold $oData)
		{
			$sSql ="UPDATE Innhold SET Gram=:Gram WHERE Bildeid=:BildeId AND Innhold=:Innhold"; 
			$DB->query_execute($sSql, [ 
				':Gram'=>$oData->dGram,
				':BildeId'=>$oData->iBildeId,
				':Innhold'=>$oData->sInnhold
			]);
			return(true);

		}

		public static function delete_trans(class_dbpdo $DB, data_innhold $oData)
		{

			$sSql = "DELETE FROM Innhold WHERE BildeId=:BildeId AND Innhold=:Innhold";
			$DB->query_execute($sSql, [
				':BildeId'=>$oData->iBildeId,
				':Innhold'=>$oData->sInnhold
			]);
			return (true);
		}

        public static function get_trans(class_dbpdo $DB)
        {

            $sSql = "SELECT InnholdId,BildId,Kcal,karb,Prot,Fett,Gram FROM Innhold WHERE iInnholdId=:iinnholdId";
             $aRows = $DB->query_select($sSql);
             return ($aRows);

            /*$sSql = "SELECT id,callpers_id,created FROM calllog WHERE id=:id";
            $aRows = $DB->query_select($sSql, [
                ':id'=>$oData->iId
            ]);
            return ($aRows);*/
        }

		public function get_innhold_epost()
		{
			try
			{
				//$this->DB->beginTransaction();
				$aInnhold = self::get_innhold_bildeId_trans($this->DB, $oInnhold);

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

		public static function get_innhold_brukerId_trans(class_dbpdo $DB, data_innhold $oinnhold)
		{
			$sSql = "SELECT InnholdId,BildId,Kcal,karb,Prot,Fett,Gram FROM innhold WHERE BrukerId =: BrukerId";
			$aRows = $DB->query_select($sSql, ['BrukerId'=> $oinnhold->iBruker]);
			return ($aRows);
		}
		
		public function get_innhold_exist_bilde(data_innhold $oInnhold)
		{
			try
			{
				//$this->DB->beginTransaction();
				$aInnhold = self::get_innhold_exist_bilde_trans($this->DB, $oInnhold);

				//$this->DB->commit();
			}
			catch (PDOException $ex)
			{
				//$this->DB->rollBack();
				$this->oLog->dbexception_log($ex);
				return (new data_ret(_FILE_, _LINE_, class_error::ERROR_DATABASE, false, array('message'=>$ex->getMessage())));
			}
			return (new data_ret(_FILE_, _LINE_, class_error::ERROR_OK, true, $aInnhold));
		}

		public static function get_innhold_exist_bilde_trans(class_dbpdo $DB, data_innhold $oinnhold)
		{
			$sSql = "SELECT * FROM Innhold WHERE BildeId=:BildeId AND innhold=:Innhold";
			$aRows = $DB->query_select($sSql, [
				'BildeId'=> $oinnhold->iBildeId,
				'Innhold'=> $oinnhold->sInnhold
			]);
			return ($aRows);
		}
   }
}