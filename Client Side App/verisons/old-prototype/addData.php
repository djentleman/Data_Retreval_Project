<?php
	
	//logs into the database
	include "dataBaseLogIn.php";
	
	/**
	$db_selected = mysql_select_db($databaseName, $con);
	if ($db_selected) {
		
		$sql = 'DROP DATABASE ' .$databaseName;
		if (mysql_query($sql)) {
		echo "Database $databaseName was successfully dropped\n";
	} else {
		echo 'Error dropping database: ' . mysql_error() . "\n";
		}
	}
	
	// makes a temp database
	
	if (mysql_query("CREATE DATABASE upStatsAPP",$con))
	{
	echo "Database created";
	}
	else
	{
	echo "Error creating database: " . mysql_error();
	}
	**/
	//mysql_select_db("upStatsAPP", $con);
	
	// makes temp database
	/**
	$sql = "CREATE TABLE CarStats
		(
		 EventID INT NOT NULL AUTO_INCREMENT,
		 PRIMARY KEY(EventID), 
		 Rev TEXT, 
		 Gear TEXT,
		 Speed TEXT,
		 RPM TEXT,
		 FRrpm TEXT,
		 FLrpm TEXT,
		 RRrpm TEXT,
		 RLrpm TEXT,
		 Suspension1 TEXT,
		 Suspension2 TEXT,
		 Suspension3 TEXT,
		 Suspension4 TEXT,
		 GforceX TEXT,
		 GforceY TEXT,
		 AirTemp TEXT,
		 Throttle TEXT,
		 CoolentTemp TEXT,
		 Battery TEXT,
		 BatteryTemp TEXT,
		 Lambda TEXT
		 )";
		 
	 mysql_query($sql,$con);
	**/
	//populate database
	
	$i = 1;
	while($i <=50){
	
		 $Rev = rand(1, 200);
		 $Gear = rand(1, 8);
		 $Speed = rand(1, 100);
		 $RPM = rand(20, 250);
		 $FRrpm = rand(5, 1000);
		 $FLrpm = rand(5, 1000);
		 $RRrpm = rand(5, 1000);
		 $RLrpm = rand(5, 1000);
		 $Suspension1 = rand (100,300);
		 $Suspension2 = rand (100,300);
		 $Suspension3 = rand (100,300);
		 $Suspension4 = rand (100,300);
		 $GforceX = rand(5, 1000);
		 $GforceY = rand(5, 1000);
		 $AirTemp = rand(5, 100);
		 $Throttle = rand(5, 200);
		 $CoolentTemp = rand(5, 200);
		 $Battery = rand(1, 240);
		 $BatteryTemp = rand(1, 240);
		 $Lambda = rand(1, 240);
		 
		 $sql = "INSERT INTO carStats(Rev, Gear, Speed, RPM , FRrpm, FLrpm, RRrpm, RLrpm, Suspension1, Suspension2, Suspension3, Suspension4, GforceX, GforceY, AirTemp, Throttle, CoolentTemp, Battery, BatteryTemp, Lambda)
			 VALUES ('$Rev', '$Gear','$Speed', '$RPM' , '$FRrpm', '$FLrpm', '$RRrpm', '$RLrpm','$Suspension1','$Suspension2', '$Suspension3', '$Suspension4',  '$GforceX', '$GforceY', '$AirTemp', '$Throttle', '$CoolentTemp', '$Battery', '$BatteryTemp', '$Lambda')";
		
		
		//echo $sql . "\n";

		if (mysql_query($sql)){
		echo "worked";
		}
		else {
		echo mysql_error();
		}
		
		$i++;
	}
	// changes the primary key back into order
	/
	$sql = "ALTER TABLE `carStats` DROP `EventID`";
	if (mysql_query($sql)){
		echo "1";
		}
		else {
		echo mysql_error();
		}
	
	$sql="ALTER TABLE `carStats` AUTO_INCREMENT = 1";
	
		if (mysql_query($sql)){
		echo "2";
		}
		else {
		echo mysql_error();
		}
	$sql ="ALTER TABLE `carStats` ADD `EventID` int UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST";
	
			if (mysql_query($sql)){
		echo "3";
		}
		else {
		echo mysql_error();
		}
	
	

	mysql_close();
	
?>