<?php
//session_start();
$dbhost = 'localhost'; //host
$dbuser = 'root'; // basic username
$databaseName = 'upStatsAPP'; // creates the database name

//logs into server
$con = mysql_connect($dbhost, $dbuser);
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

//selects database
mysql_select_db("upStatsAPP", $con);



?>