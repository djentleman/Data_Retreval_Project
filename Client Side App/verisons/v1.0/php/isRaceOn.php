<?php
	//RETURNS THE TIME OF THE LAST QUERY SO IT CAN BE COMPARED IN JAVASCRIPT
	
	//logs into the database
	include "databaseLogIn.php";
	
	//Last time of the last query 
	$query = "SELECT Time from CarStats ORDER BY Time DESC LIMIT 1";
	$result = mysql_query($query);
	
	$lastQuery = mysql_result($result,0,"Time");
	echo $lastQuery;
	
	
	
	
	
	
	/**$timezone = date_default_timezone_get();
	echo $timezone;
	date_default_timezone_set("Europe/Berlin");
	$date = date('Y-m-d h:i:s');
	echo "start: " . ($date);
	//works out if the last query if within the 4 seconds time frame
	if (($lastQuery < (time() + 2)) && ($lastQuery > (time() - 2))){
		echo "yes";
		}
		
	else {
		echo "no";
		}
	**/
	
	
	
	
	
	
	
	
	
	
?>