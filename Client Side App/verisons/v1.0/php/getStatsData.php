<?php
// log into database
include "dataBaseLogIn.php";

//$numberFrom = $_GET['start'];
//$numberFrom = $numberFrom + 5;

//Queries the database
$sql = "SELECT * FROM carStats LIMIT 1";

//Makes a json object
$json = array();

$sth = mysql_query($sql) or die(mysql_error());


//Makes an json array of all the stats
while($r = mysql_fetch_assoc($sth)) {
//$Stat_String= $r['Speed'] ."," . $r['Throttle']. "," . $r['Battery']. ",". $r['BatteryTemp']. ",". $r['AirTemp']. "," . $r['CoolentTemp']. ",";
	$temp = array(
		'speed' => $r['Speed'],
		'rev' => $r['Rev']
		);
		array_push($json, $temp);
			
}

$jsonString = json_encode($json);

//prints out the stats 
//echo $Stat_String;

echo $jsonString;


mysql_close();


?>