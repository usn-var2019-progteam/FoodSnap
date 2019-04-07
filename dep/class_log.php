<?php
if ( !class_exists("class_log"))
{
    class class_log
    {
        public $bDebug;
        public $sProgram;
        
        function __construct($bDebug=false, $sProgram=class_DL::DEFAULT_LOGFILE) {
            $this->bDebug = $bDebug;
            $this->sProgram = $sProgram;
        }
        
        function __destruct() {
            ;
        }
        
        public function logging($sType, $sMessage)
        {
            return (self::logg($sType, $sMessage, $this->sProgram, $this->bDebug));
        }
        
        public static function logg($sType, $sMessage, $sProgram=class_DL::DEFAULT_LOGFILE, $bDebug=false)
        {
            //$sLogDir = $aIni['GENERAL']['logpath'];
				$sLogDir = "../logs";
            
            $sTime = date("Y-m-d H:i:s"); // Time for the logging.
            $sLogPath = sprintf("%s/%s.log", $sLogDir, $sProgram);
            
            if ($bDebug)
                printf("%s %-7s %s\n", $sTime, $sType, $sMessage);
            
            $fp = fopen($sLogPath, "a");
            if ($fp)
            {
                fprintf($fp, "%s %-7s %s\n", $sTime, $sType, $sMessage);
                fclose($fp);
            }
            return (true);
        }
        
        // Handles exceptins from the database.
        public function exception_log(Exception $ex)
        {
            $this->logging("ERROR", sprintf("SQL ERROR: %s(%d): %s, code=%s\n%s", $ex->getFile(), $ex->getLine(), $ex->getMessage(), strval($ex->getCode()), $ex->getTraceAsString()));
        }
        
        // Handles exceptins from the database.
        public function dbexception_log(PDOException $ex)
        {
            $this->logging("ERROR", sprintf("SQL ERROR: %s(%d): %s, code=%s\n%s", $ex->getFile(), $ex->getLine(), $ex->getMessage(), strval($ex->getCode()), $ex->getTraceAsString()));
        }
    }
}