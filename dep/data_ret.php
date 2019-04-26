<?php
if ( !class_exists("data_ret"))
{
    class data_ret
    {
        public $bRet;
        public $iErr;
        public $aData;
        public $sFile;
        public $iLine;
        
        function __construct($sPath, $iLine, $iErr, $bRet, $aData=array())
        {
            $this->sFile = basename($sPath);
            $this->iLine = $iLine;
            $this->iErr = $iErr;
            $this->bRet = $bRet;
            $this->aData = $aData;
            
            // Possible log the result if negativ.
            if ( !$bRet)
            {
                // Log the error.
            }
        }
    }
}