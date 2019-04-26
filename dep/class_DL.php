<?php
if ( !class_exists("class_DL"))
{
    require_once "../dep/class_dbpdo.php";
    require_once "../dep/class_log.php";
    
    class class_DL
    {
        const DEFAULT_LOGFILE = "foodsnap";
        
        protected $oLog;
        protected $DB;
        
        public function __construct($bDebug=false, $sLogFile=class_DL::DEFAULT_LOGFILE) {
            $this->oLog = new class_log($bDebug, $sLogFile);
            $this->DB = new class_dbpdo();
        }
        
        public function __destruct() {
            $this->DB = null;
        }
        
        // Call the logging function
		  public function logging($sType, $sMessage)
        {
            return ($this->oLog->logging($sType, $sMessage));
        }
        
        //
        // This function creates a new record in the table.
        public function create($oData)
        {
            $iId = 0;
            
            try
            {
                $iId = static::create_trans($this->DB, $oData);
            }
            catch (PDOException $ex)
            {
                $this->oLog->dbexception_log($ex);
                return (new data_ret(__FILE__, __LINE__, class_error::ERROR_DATABASE, false, [ 'message'=>$ex->getMessage() ]));
            }
            return (new data_ret(__FILE__, __LINE__, class_error::ERROR_OK, true, [ 'id'=>$iId ]));
        }
        
        //
        // This function updates a record in the table.
        public function update($oData)
        {
            try
            {
                static::update_trans($this->DB, $oData);
            }
            catch (PDOException $ex)
            {
                $this->oLog->dbexception_log($ex);
                return (new data_ret(__FILE__, __LINE__, class_error::ERROR_DATABASE, false, [ 'message'=>$ex->getMessage() ]));
            }
            return (new data_ret(__FILE__, __LINE__, class_error::ERROR_OK, true));
        }
        
        //
        // This record deletes a record in the table.
        public function delete($iId)
        {
            if ($iId <= 0)
                return (new data_ret(__FILE__, __LINE__, class_error::ERROR_ID_MISSING, false));
            
            try
            {
                static::delete_trans($this->DB, $iId);
            }
            catch (PDOException $ex)
            {
                $this->oLog->dbexception_log($ex);
                return (new data_ret(__FILE__, __LINE__, class_error::ERROR_DATABASE, false, [ 'message'=>$ex->getMessage() ]));
            }
            return (new data_ret(__FILE__, __LINE__, class_error::ERROR_OK, true));
        }
        
        //
        // This function gets a record in the table.
        public function get()
        {
            //if ($iId <= 0)
              //  return (new data_ret(__FILE__, __LINE__, class_error::ERROR_ID_MISSING, false));
            
            $aRows = [];
            
            try
            {
                $aRows = static::get_trans($this->DB);
            }
            catch (PDOException $ex)
            {
               $this->oLog->dbexception_log($ex);
               return (new data_ret(__FILE__, __LINE__, class_error::ERROR_DATABASE, false, array('message'=>$ex->getMessage())));
            }
            return (new data_ret(__FILE__, __LINE__, class_error::ERROR_OK, true, $aRows));
        }
    }
}