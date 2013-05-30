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
		'rev' => $r['Rev'],
		'gear' => $r['Gear'],
		'speed' => $r['Speed'],
		'rpm' => $r['RPM'],
		'frrpm' => $r['FRrpm'],
		'flrpm' => $r['FLrpm'],
		'rrrpm' => $r['RRrpm'],
		'rlrpm' => $r['RLrpm'],
		'suspen1' => $r['Suspension1'],
		'suspen2' => $r['Suspension2'],
		'suspen3' => $r['Suspension3'],
		'suspen4' => $r['Suspension4'],
		'gforcex' => $r['GforceX'],
		'gforcey' => $r['GforceY'],
		'airtemp' => $r['AirTemp'],
		'throttle' => $r['Throttle'],
		'coolenttemp' => $r['CoolentTemp'],
		'battery' => $r['Battery'],
		'batterytemp' => $r['BatteryTemp'],
		'lambda' => $r['Lambda']
		);
		array_push($json, $temp);
			
}

$jsonString = json_encode($json);

//prints out the stats 
//echo $Stat_String;

echo $jsonString;


mysql_close();


?>