<?php
// log into database
include "dataBaseLogIn.php";

$numberFrom = $_GET['start'];
$numberFrom = $numberFrom + 5;

$sql = "SELECT * FROM carStats LIMIT 1";

$sth = mysql_query($sql) or die(mysql_error());


//gets the stats in a long string 
while($r = mysql_fetch_assoc($sth)) {
$Stat_String= $r['Speed'] ."," . $r['Throttle']. "," . $r['Battery']. ",". $r['BatteryTemp']. ",". $r['AirTemp']. "," . $r['CoolentTemp']. ",";

}



//prints out the stats 
echo $Stat_String;




mysql_close();


?>