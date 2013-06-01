<?php
	
	//logs into the database
	include "php/databaseLogIn.php";
	
	$sql = "DELETE FROM CarStats";
		
		if (mysql_query($sql)){
		echo "deleted";
		}
		else {
		echo mysql_error();
		}
	
	
	
	$j = 1;
	$i = 0;
	while($i < 5){
		while ($j < 5){
		
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
		 
		 $sql = "INSERT INTO CarStats(Rev, Gear, Speed, RPM , FRrpm, FLrpm, RRrpm, RLrpm, Suspension1, Suspension2, Suspension3, Suspension4, GforceX, GforceY, AirTemp, Throttle, CoolentTemp, Battery, BatteryTemp, Lambda)
			 VALUES ('$Rev', '$Gear','$Speed', '$RPM' , '$FRrpm', '$FLrpm', '$RRrpm', '$RLrpm','$Suspension1','$Suspension2', '$Suspension3', '$Suspension4',  '$GforceX', '$GforceY', '$AirTemp', '$Throttle', '$CoolentTemp', '$Battery', '$BatteryTemp', '$Lambda')";
		
		
		//echo $sql . "\n";

		if (mysql_query($sql)){
		echo "worked";
		}
		else {
		echo mysql_error();
		}
		$j++;
		//}
		$j = 1;
		$i++;
		sleep(1);
		
		
		}
	}