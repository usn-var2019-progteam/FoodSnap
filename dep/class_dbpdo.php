<?php
/**
 * Description of dbo
 * This is a simple wrapper around the PHP DBO library.
 */
if ( !class_exists("class_dbpdo"))
{
    require_once "../dep/class_util.php";
    require_once "../dep/class_log.php";
    
    class class_dbpdo extends PDO
    {
       private $m_sHost;
       private $m_sDatabase;
       private $m_sUser;
       private $m_sPassword;
       private $m_sCharSet;
       private $m_sPort;
       private $m_bError;
       private $m_sDriver;

       public function __construct($sDBType="mysql",$sHost="",$sDatabase="",$sUser="",$sPassword="",$sPort="",$sDriver="",$sCharSet="")
       {
            if ( !class_exists("PDO"))
            {
                class_log::logg("ERROR", "class PDO does not exist.");
                exit(1);
            }
                
				$aIni['DATABASE']['host'] = "localhost";
				$aIni['DATABASE']['database'] = "Foodsnap";
				$aIni['DATABASE']['user'] = "root";
				$aIni['DATABASE']['password'] = "tramsix";
				/*$aIni['DATABASE']['host'] = "progteamno01.mysql.domeneshop.no";
				$aIni['DATABASE']['database'] = "progteamno01";
				$aIni['DATABASE']['user'] = "progteamno01";
				$aIni['DATABASE']['password'] = "9avmerke-Forstikke-gjente-utrast";*/
				$aIni['DATABASE']['port'] = 3306;
            
            $this->m_bError      = false;
            $this->m_sDBType     = trim($sDBType);
            $this->m_sHost       = (strlen(trim($sHost)) == 0) ? $aIni['DATABASE']['host'] : trim($sHost);
            $this->m_sDatabase   = (strlen(trim($sDatabase)) == 0) ? $aIni['DATABASE']['database'] : trim($sDatabase);
            $this->m_sUser       = (strlen(trim($sUser)) == 0) ? $aIni['DATABASE']['user'] : trim($sUser);
            $this->m_sPassword   = (strlen(trim($sPassword)) == 0) ? $aIni['DATABASE']['password'] : trim($sPassword);
            $this->m_sCharSet    = trim($sCharSet);
            $this->m_sPort       = (strlen(trim($sPort)) == 0) ? $aIni['DATABASE']['port'] : trim($sPort);
            $this->m_sDriver     = trim($sDriver);
          
            $sDSN = sprintf("%s:host=%s;dbname=%s;port=%d", $this->m_sDBType, $this->m_sHost, $this->m_sDatabase, (int)$this->m_sPort);

            if (strlen($this->m_sDriver)>0)
                $sDSN .= sprintf(";driver=%s", $this->m_sDriver);
            if (strlen($this->m_sCharSet)>0)
                $sDSN .= sprintf(";charset=%s", $this->m_sCharSet);

            // Add some options.
            $aOptions = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION ]; // Use exceptions.

            if (strlen(trim($this->m_sHost)) > 0 and strlen(trim($this->m_sDatabase)) > 0 and strlen(trim($this->m_sUser)) > 0)
            {
                parent::__construct($sDSN, $this->m_sUser, $this->m_sPassword, $aOptions);

                switch ($this->m_sDBType)
                {
                    case 'mysql': // Special mysql settings.
                        //$this->setAttribute(PDO::MYSQL_ATTR_INIT_COMMAND, "SET NAMES 'UTF8'");
                        //$this->setAttribute(PDO::MYSQL_ATTR_INIT_COMMAND, "SET TIME_ZONE='UTC'");
                        break;

                    case 'mssql':
                    case 'dblib':
                        break;

                    default:
                        $this->m_bError = true;
                        break;
                }
            }
            else
            {
                $this->m_bError = true;
            }
        }

        public function __destruct()
        {
        }

        public function query_select($sSql, $aPrepare=array())
        {
            if (count($aPrepare) == 0)
            {
                $stmt = $this->query($sSql);
            }
            else
            {
                $stmt = $this->prepare($sSql);
                $stmt->execute($aPrepare);
            }
            $aRows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $stmt->closeCursor(); // Close the statement handler.
            unset($stmt);
            return ($aRows);
        }

        // Not for select
        public function query_execute($sSql, $aPrepare=array())
        {
            if (count($aPrepare) == 0)
            {
                $stmt = $this->query($sSql);
            }
            else
            {
                $stmt = $this->prepare($sSql);
                $stmt->execute($aPrepare);
            }
            $lastId = $this->lastInsertId();
            $stmt->closeCursor();
            unset($stmt);

            return ($lastId);
        }
    }
}
