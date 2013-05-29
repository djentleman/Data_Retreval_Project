<?php
//logs into the database
include "dataBaseLogIn.php";

//works out which stats are set 
$numOfStats = 0;
if (!empty($_GET['stat1'])){
	$stat1   =  ucfirst($_GET['stat1']);
	$numOfStats = 1;
}
if (!empty($_GET['stat2'])){
	$stat2   =  ucfirst($_GET['stat2']);
	$numOfStats = 2;
}
if (!empty($_GET['stat3'])){
	$stat3 =  ucfirst($_GET['stat3']);
	$numOfStats = 3;
}
if (!empty($_GET['stat4'])){
	$stat4  =  ucfirst($_GET['stat4']);
	$numOfStats = 4;
}
if (!empty($_GET['stat5'])){
	$stat5  =  ucfirst($_GET['stat5']);
	$numOfStats = 5;
}
if (!empty($_GET['stat6'])){
	$stat6   =  ucfirst($_GET['stat6']);
	$numOfStats = 6;
} 

//echo $stat2;


//Needs to build the json object
//Builds the labels
$JSONdata = "{
           \"cols\": [
              {\"label\":\"Time\",\"type\":\"number\"}";

		
	if ($numOfStats >= 1 ){
		$JSONdata .= ", 
						{\"label\":\"$stat1\",\"type\":\"number\"}";
	}
	
		if ($numOfStats >= 2 ){
		$JSONdata .= ", 
						{\"label\":\"$stat2\",\"type\":\"number\"}";
	}
	
		if ($numOfStats >= 3 ){
		$JSONdata .= ", 
						{\"label\":\"$stat3\",\"type\":\"number\"}";
	}
	
	
	//
//Builds the rows 
$JSONdata .= "],
        \"rows\": [";	

		
//Cashes the data (needs improving)---------------------------------------------
$counter = 0;
$time = 1;
	while($counter < 1){
		$sql = "SELECT * FROM carStats LIMIT 5";
		$sth = mysql_query($sql) or die(mysql_error());
		$num_of_results = mysql_num_rows($sth);
	// when there is 5 it breaks out the loop
	if ($num_of_results == 5){
		break;
	}

	}
	
//Adds each stat from the data base to the json object(need to sort out timing)--------------------------
	while($r = mysql_fetch_assoc($sth)) {
	//Adds the timing 
		$JSONdata .= "{\"c\":[{\"v\":  " . $time . "}";
	
		if ($numOfStats >= 1 ){
				$JSONdata .= ", {\"v\": " . $r["$stat1"]  ."}";
		}
	
		if ($numOfStats >= 2 ){
				$JSONdata .= ", {\"v\": " . $r["$stat2"]  ."}";
		}
	
		if ($numOfStats >= 3 ){
				$JSONdata .= ", {\"v\": " . $r["$stat3"]  ."}";
		}

		
		$JSONdata .= "]},";
	}

	
	substr_replace($JSONdata ,"",-2);
	$JSONdata .= "]}";


	echo $JSONdata;

mysql_close();

		



?>