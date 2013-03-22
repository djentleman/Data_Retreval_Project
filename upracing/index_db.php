<?php
//logs into the database
include "dataBaseLogIn.php";

//gets the variables from the prevouis page, so it can work out what data to get
$numberFrom = $_GET['start'];
$ifSpeed = $_GET['speed'];
$ifThrottle = $_GET['throttle'];
$ifBattery = $_GET['battery'];
$ifBatteryTemp = $_GET['batteryTemp'];
$ifAirTemp = $_GET['airTemp'];
$ifCoolentTemp = $_GET['coolentTemp'];


//NEED TO do something with this
$numberTo = $numberFrom + 5;


 // Works out the labels for the JSON object
 $JSONdata = "{
           \"cols\": [
              {\"label\":\"Time\",\"type\":\"number\"}";
			  
	if($ifSpeed == "True"){
	
	$JSONdata .= ", 
					 {\"label\":\"Speed\",\"type\":\"number\"}";
	
	}
	
	if($ifThrottle == "True"){
	$JSONdata .= ", 
					 {\"label\":\"Throttle\",\"type\":\"number\"}";
	}
	
	if($ifBattery == "True"){
	$JSONdata .= ", 
					 {\"label\":\"Battery\",\"type\":\"number\"}";
	}
	
	if($ifBatteryTemp == "True"){
	$JSONdata .= ", 
					 {\"label\":\"Battery Temp\",\"type\":\"number\"}";
	}
	
	if($ifAirTemp == "True"){
	$JSONdata .= ", 
					 {\"label\":\"Air Temp\",\"type\":\"number\"}";
	}
	
	if($ifCoolentTemp == "True"){
	$JSONdata .= ", 
					 {\"label\":\"Coolent Temp\",\"type\":\"number\"}";
	}
	
	
	
	//NEED THIS: makes it ready for the JSON object data
	$JSONdata .= "],
        \"rows\": [";
		
		
//keeps looping until there is 5 rows in the database which there should be (so error checking)
$counter = 0;
$time = $numberFrom;
while($counter < 1){
$sql = "SELECT * FROM carStats LIMIT 5";
$sth = mysql_query($sql) or die(mysql_error());
$num_of_results = mysql_num_rows($sth);
// when there is 5 it breaks out the loop
if ($num_of_results == 5){
	break;
}

}


//loops the JSON data
while($r = mysql_fetch_assoc($sth)) {
	//must add the time to top
	$JSONdata .= "{\"c\":[{\"v\":  " . $time . "}";
	
	if($ifSpeed == "True"){
	
	$JSONdata .= ", {\"v\": " . $r['Speed']  ."}";
	
	}
	
	if($ifThrottle == "True"){
	$JSONdata .= ", {\"v\": " . $r['Throttle']  ."}";
	}
	
	if($ifBattery == "True"){
	$JSONdata .= ", {\"v\": " . $r['Battery']  ."}";
	}
	
	if($ifBatteryTemp == "True"){
	$JSONdata .= ", {\"v\": " . $r['BatteryTemp']  ."}";
	}
	
	if($ifAirTemp == "True"){
	$JSONdata .= ", {\"v\": " . $r['AirTemp']  ."}";
	}
	
	if($ifCoolentTemp == "True"){
	$JSONdata .= ", {\"v\": " . $r['CoolentTemp']  ."}";
	}
	
	
	//must at bottom this
	$JSONdata .= "]},";
	
   
	// need to change this
	$time = $time + 1;
} 
 
   

//NEED this: the json data/object literal with the correct syntax
substr_replace($JSONdata ,"",-2);
$JSONdata .= "]}";

// echos so the respones can gain it 
echo $JSONdata;

mysql_close();

?>