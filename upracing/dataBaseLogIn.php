       <?php
            //Variables for connecting to your database.
            //These variable values come from your hosting account.
            $hostname = "upStatsAPPV2.db.9980564.hostedresource.com";
            $username = "upStatsAPPV2";
            $dbname = "upStatsAPPV2";
			
			//$con = mysql_connect($hostname, $username);
            //These variable values need to be changed by you before deploying
            $password = "Southsea2#";
        
            //Connecting to your database
            mysql_connect($hostname, $username, $password) OR DIE ("Unable to 
            connect to database! Please try again later.");
            mysql_select_db($dbname);

           
            ?>