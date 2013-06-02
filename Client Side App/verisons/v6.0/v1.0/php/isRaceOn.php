<?php
	//RETURNS THE TIME OF THE LAST QUERY SO IT CAN BE COMPARED IN JAVASCRIPT
	
	//logs into the database
	include "databaseLogIn.php";
	
	//Last time of the last query 
	$query = "SELECT EventID from CarStats ORDER BY Time DESC LIMIT 1";
	$result = mysql_query($query);
	$isRaceOn = "false";
	$firstQuery = mysql_result($result,0,"EventID");
	
	for ($i = 0; $i <10; $i++){
		$result = mysql_query($query);
		$secondQuery = mysql_result($result,0,"EventID");
		if ($firstQuery != $secondQuery){
		    $isRaceOn = "true";
			break;
		}
	
	}
	
	
	echo $isRaceOn;
	
	
	
	
	
	
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