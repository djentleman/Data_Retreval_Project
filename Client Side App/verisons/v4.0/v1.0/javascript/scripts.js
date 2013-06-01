/** HOW THE SCRIPT WORKS
1) Works out if there is stats being uploaded
if no: displays temp stats 
if yes: starts to display real time stats
2) When a user clicks on a stat it will add that stat to the graph
3) works out when the race ends
**/ 

google.load('visualization', '1', {packages: ['corechart']}); // Load graph
//need to check few of these
// basic graph variables
var graphData;
var chart;
var options;
var jsonData;
var queryString;

var time = 0;
var loadGraph = true;
var fullScreen = false;

//array for the current stats selected to be repesented on the graph
var currentStats = new Array();
//array for the top six stats in the top selection 
var topSix = new Array();
var topSixStats = new Array();
var allStats = false;

var statToBeMoved = "";
var statName = "";


/**
// variables to control which lines are on the graph


var speed = "False";
var throttle = "False";
var battery = "False";
var batteryTemp = "False";
var airTemp = "False";
var coolentTemp = "False";
var firstTime = "False";
var noChange = "True";
var lineCounter = 0;
**/
// this gets called when the page first loads
 function drawVisualization() {
		//default graph as an exampe; for when there is no data running ie the car not in race
		graphData = new google.visualization.DataTable();
		graphData.addColumn('string', 'Example Time'); 
		graphData.addColumn('number', 'Example Speed(sec)'); 
		graphData.addRows([
		['56',32],
		['57', 46],
		['58',  63],
		['59', 63],
		['60', 43]
		]);	
		
	
	// Sets up options on how the graph will look and feel
	options = {curveType: "function",
            			backgroundColor: '#F8F8F8',
                        width: 320, height: 180,
                        colors: ['#5a2260', "red", "orange", "#1BE032", "blue", "green"],
                        legend: {position: 'top'},
                        hAxis: {title: 'Time'},
                    	vAxis: {title: 'Scaling',
									viewWindow:{
									min:0 }
									},
						curveType: "function",
						title: 'Real Time Stats',
						animation:{
						duration: 600,
						easing: 'inAndOut'
      }
   }
	  
        // Create the graph
       chart =  new google.visualization.LineChart(document.getElementById('visualization'));
       chart.draw(graphData, options);
	
      }
      
	  // When the page first loads it creates the graph
      google.setOnLoadCallback(drawVisualization);
	  
//MY RANDOM TEST FUNCTION
 function test(){
	//alert(screen.height);
	//alert(screen.width);

	  }
	  
//CHANGES THE GRAPH TO A BIGGER SIZE	  
function changeGraphSize(){
	if (fullScreen == false){
	fullScreen = true;
		options = {curveType: "function",
            			backgroundColor: '#F8F8F8',
                        width: (screen.width * 0.8 ), height: (screen.height * 0.8),
                        colors: ['#5a2260', "red", "orange", "#1BE032", "blue", "green"],
                        legend: {position: 'top'},
                        hAxis: {title: 'Time'},
                    	vAxis: {title: 'Scaling',
									viewWindow:{
									min:0 }
									},
						curveType: "function",
						title: 'Real Time Stats',
						animation:{
						duration: 600,
						easing: 'inAndOut'
      }
   }
   document.getElementById("graph").style.height = (screen.height * 0.8);
   document.getElementById("graph").style.width = (screen.width  * 0.8);
   drawChart();
   }
   else {
   fullScreen = false;
		options = {curveType: "function",
            			backgroundColor: '#F8F8F8',
                        width: 320, height: 180,
                        colors: ['#5a2260', "red", "orange", "#1BE032", "blue", "green"],
                        legend: {position: 'top'},
                        hAxis: {title: 'Time'},
                    	vAxis: {title: 'Scaling',
									viewWindow:{
									min:0 }
									},
						curveType: "function",
						title: 'Real Time Stats',
						animation:{
						duration: 600,
						easing: 'inAndOut'
      }
   }
   document.getElementById("graph").style.height = 180;
   document.getElementById("graph").style.width = 320;
   drawChart();
   }
   
   
   
 

	}

//WORKS OUT WHAT TO CALL AND DO  
 function main(){

		//puts the top six stats into an array
		addTopSixStats();
		//if a race is on
		if(isRaceOn() == true){
		generation();
			
		}
		else if (isRaceOn() != true){
			alert("Their appears to be no race on currently");
			drawVisualization();
		}
	}
	
//LOOPS THROUGH EACH STAGE
	var genTimer;
	var stopGen = 0; 
	var counter = 0;
	function generation() {
	clearTimeout(genTimer)  //stop additional clicks from initiating more timers
	// all methods that need to be done every second need to go here
		//updates the stats 
		//counter++;
		
		getAllStats();
		
		/**
		if (currentStats.length != 0){
				//gets the graph data
				getGraphData();
			 
		}
		**/
		/**
		if(counter > 10){
		counter = 0;
			if(isRaceOn() == false){
			stopGen = 1;
			}
		
		}
		else {
		**/
		time = Number(time);
		time++;
		time = time.toString();
		
		//}
		
	
	if(!stopGen) {
       genTimer = setTimeout(function(){generation()},800)
	   stopGen = 0;
	}
	}	

	  
	  
	  
//REDRAWS THE CHART
	function drawChart() {
	 
		// chart =  new google.visualization.LineChart(document.getElementById('visualization'));
		chart.draw(graphData, options);
		}
	
//COMPARES THE TIME OF THE LAST TWO QUERIES TO SEE IF A RACE IS ON
    function isRaceOn(){
		var isRaceOn = isRaceOnAjax();
	
		if (isRaceOn == "true") {
			return true;
		}
		else{
			return true;
		}
	
	}
	
	
	function isRaceOnAjax(){
		$.ajax({
		url: "../v1.0/php/isRaceOn.php",
		async: false,
		success: function( data ) {
			return data;
		}
		})
	
	}
	
//RETURNS A STAT IN THE CORRECT ORDER
	function getWhichStat(statToReturn,json){
	//alert(statToReturn);
		var tempStat;
		if (statToReturn == "speed"){
			tempStat = json.speed; 
		}
		else if (statToReturn == "throttle"){
			tempStat = json.throttle;
		}
		else if (statToReturn == "battery"){
			tempStat = json.battery;
		}
		else if (statToReturn == "batteryTemp"){
			tempStat = json.batterytemp;
		}
		else if (statToReturn == "airTemp"){
			tempStat = json.airtemp;
		}
			else if (statToReturn == "rev"){
			tempStat = json.rev;
		}
		else if (statToReturn == "gear"){
			tempStat = json.gear;
		}
		else if (statToReturn == "FRrpm"){
			tempStat = json.frrpm;
		}
		else if (statToReturn == "FLrpm"){
			tempStat = json.flrpm;
		}
		else if (statToReturn == "RRrpm"){
			tempStat = json.rrrpm;
		}
		else if (statToReturn == "RLrpm"){
			tempStat = json.rlrpm;
		}
		else if (statToReturn == "rpm"){
			tempStat = json.rpm;
		}
		else if (statToReturn == "coolentTemp"){
			tempStat = json.coolenttemp;
		}
		else if (statToReturn == "suspen1"){
			tempStat = json.suspen1;
		}
		else if (statToReturn == "suspen2"){
			tempStat = json.suspen2;
		}
		else if (statToReturn == "suspen3"){
			tempStat = json.suspen3;
		}
		else if (statToReturn == "suspen4"){
			tempStat = json.suspen4;
		}
		else if (statToReturn == "gForceX"){
			tempStat = json.gforcex;
		}
		else if (statToReturn == "gForceY"){
			tempStat = json.gforcey;
		}
		else if (statToReturn == "lambda"){
			tempStat = json.lambda;
		}
		
		
		
		
		
		return Number(tempStat); 
	
	}
	
//GETS ALL THE PAGE STATS AS A JSON OBJECT
	function getAllStats(){
		//alert("this");
		$.ajax({
		dataType: "json",
		url: "../v1.0/php/getStatsData.php",
		//async: false,
		//data: dataString,
		success: function(data) {
		
		if (data[0] != null){
		if (currentStats != 0){
		
		/**
		var bah = Number(data[0].speed);
		//alert (typeof bah);
		
		//graphData = new google.visualization.DataTable();
		//graphData.addColumn('string', 'Example Time'); 
		//graphData.addColumn('number', 'Example Speed(sec)'); 
		graphData.addRows([
		['56',32],
		['57', 46],
		['58',  63],
		['59', 63],
		['60', bah]
		]);	
		
		drawChart();
		**/
		//only load the graph every two cycles to make it the stats faster
		//if (loadGraph == true){
			//checks the size of the graph
		if(graphData.getNumberOfRows() >= 8){
			graphData.removeRow(0);
		}
		
		
		//gets the correct stat for the size of the ones selected
		var stat1 = getWhichStat(currentStats[0], data[0]);
		var stat2 = getWhichStat(currentStats[1], data[0]);
		var stat3 = getWhichStat(currentStats[2], data[0]);
		var stat4 = getWhichStat(currentStats[3], data[0]);
		var stat5 = getWhichStat(currentStats[4], data[0]);
		var stat6 = getWhichStat(currentStats[5], data[0]);
	//	alert(graphData.getNumberOfColumns());
		//alert(stat1);
		//alert(currentStats.length);
		var length = currentStats.length;
	//	alert(length);
		//works out the size of the row
		var rowToAdd = [];
		if (length == 1){
			rowToAdd[0] = [time, stat1];
		}
		else if (length == 2){
			rowToAdd[0] = [time, stat1, stat2];
		}
		else if (length == 3){
			rowToAdd[0] = [time, stat1, stat2, stat3];
		}
		else if (length == 4){
			rowToAdd[0] = [time, stat1,stat2, stat3, stat4];
		}
		else if (length == 5){
			rowToAdd[0] = [time, stat1, stat2, stat3, stat4, stat5];
		}
		else if (length == 6){
			rowToAdd[0] = [time, stat1, stat2, stat3, stat4, stat5, stat6];
		}
		
		graphData.addRows([rowToAdd[0]]);
		drawChart();
		//loadGraph = false;
		}
		else {
			//loadGraph = true;
		}//}
		
			 stat1 = getWhichStat(topSix[0], data[0]);
			 stat2 = getWhichStat(topSix[1], data[0]);
			 stat3 = getWhichStat(topSix[2], data[0]);
			 stat4 = getWhichStat(topSix[3], data[0]);
			 stat5 = getWhichStat(topSix[4], data[0]);
			 stat6 = getWhichStat(topSix[5], data[0]);
		
		

		//sets the stats 
		//sets the top six stats
		//if (allStats == false){
//USE GET WITH STAT WITH THE ID OF TH 
/**
			document.getElementById("speedStat").innerHTML = data[0].speed;
			document.getElementById("throttleStat").innerHTML = data[0].throttle;
			document.getElementById("batteryStat").innerHTML = data[0].battery;
			document.getElementById("batteryTempStat").innerHTML = data[0].batterytemp;
			document.getElementById("airTempStat").innerHTML = data[0].airtemp;
			document.getElementById("coolentTempStat").innerHTML = data[0].coolenttemp;
			**/
			
			document.getElementById(topSixStats[0]).innerHTML = stat1;
			document.getElementById(topSixStats[1]).innerHTML = stat2;
			document.getElementById(topSixStats[2]).innerHTML = stat3;
			document.getElementById(topSixStats[3]).innerHTML = stat4;
			document.getElementById(topSixStats[4]).innerHTML = stat5;
			document.getElementById(topSixStats[5]).innerHTML = stat6;
			
			console.log(topSixStats[0]);
			console.log(topSixStats[1]);
			console.log(topSixStats[2]);
			console.log(topSixStats[3]);
			console.log(topSixStats[4]);
			console.log(topSixStats[5]);
			
			
			
		if (allStats == true){
			document.getElementById("revStatFoot").innerHTML = data[0].rev;
			document.getElementById("gearStatFoot").innerHTML = data[0].gear;
			document.getElementById("speedStatFoot").innerHTML = data[0].speed;
			document.getElementById("throttleStatFoot").innerHTML = data[0].throttle;
			document.getElementById("FRrpmStatFoot").innerHTML = data[0].frrpm;
			document.getElementById("FLrpmStatFoot").innerHTML = data[0].flrpm;
			document.getElementById("RLrpmStatFoot").innerHTML = data[0].rlrpm;
			document.getElementById("RRrpmStatFoot").innerHTML = data[0].rrrpm;
			
			document.getElementById("rpmStatFoot").innerHTML = data[0].rpm;
			document.getElementById("airTempStatFoot").innerHTML = data[0].airtemp;
			document.getElementById("coolentTempStatFoot").innerHTML = data[0].coolenttemp;
			document.getElementById("lambdaStatFoot").innerHTML = data[0].lambda;
			document.getElementById("suspen1StatFoot").innerHTML = data[0].suspen1;
			
			document.getElementById("suspen2StatFoot").innerHTML = data[0].suspen2;
			document.getElementById("suspen3StatFoot").innerHTML = data[0].suspen3;
			document.getElementById("suspen4StatFoot").innerHTML = data[0].suspen4;
			document.getElementById("gForceXStatFoot").innerHTML = data[0].gforcex;
			document.getElementById("gForceYStatFoot").innerHTML = data[0].gforcey;
			document.getElementById("batteryStatFoot").innerHTML = data[0].battery;
			document.getElementById("batteryTempStatFoot").innerHTML = data[0].batterytemp;
			
			
		}
		}
		
		}})
	
	
	 }
	
//WORKS OUT IF A STAT IS IN AND ADDS IT TO IT (not in use)
/**
	function addStat(data){
		//var keys = new Array();
		//for 
		var myJSONObject =  {"ircEvent": "PRIVMSG", "method": "newURI", "regex": "^http://.*"}; 
var keys=[];
for (var i in data[0]) { keys.push(i); }
alert(keys[1]);
document.getElementById("speedStat").innerHTML = data[0].keys[0];
	}
	
	
	var getKeys = function(data){
   var keys = [];
   for(var key in obj){
      keys.push(key);
   }
   return keys;
}
**/


//ADDS STATS TO THE GRAPH
	function addAStat(statsName){
		var length = currentStats.length;
		var inArray = false;
		
		if (length >= 6) {
			alert("You cannot add any more stats to the graph, please remove some first");
		}
		else {
			currentStats.push(statsName);
				//if the length of one it needs to build the graph data
		length = currentStats.length;
		if((length) == 1){
			graphData = new google.visualization.DataTable();
			graphData.addColumn('string', 'Time'); 
			graphData.addColumn('number', currentStats[0]); 
			
		
		}
		else {
			graphData.addColumn('number', currentStats[length - 1]);
			//alert("new:" + graphData.getNumberOfColumns());
		}
			
			
			
			updateQueryString()
			//alert(currentStats[length]);
		}
	}
	
	
//DELETE STATS FROM THE GRAPH
	function deleteAStat(statsName){
		for(var i = 0 ; i < currentStats.length; i++){
				if (statsName == currentStats[i]){
					currentStats.splice(i,1);
					//needs to remove coloum of the graph
					graphData.removeColumn(i);
				
					//alert("win");
					updateQueryString()
				break;
				}
		}	
	}
	
//UPDATES THE QUERYSTRING FOR THE GRAPH AJAX
	function updateQueryString(){
		var length = currentStats.length;
		queryString = "";
		
		if (length != 0){
		
		
			//builds the query string
			queryString = "stat1=" + currentStats[0];
			for(var i = 1; i < length; i++){
			queryString += ("&stat" + (i + 1) + "=" + currentStats[i]);
			}
		}
		else {
			//if no lines on graph go to default
			drawVisualization(); 
		}
	
	//alert (queryString);
	
	}
	
	

	
	
	
	
//GETS AN JSON OBJECT FOR THE STATS ON THE GRAPH 

   function getGraphData() {	
		if (currentStats.length != 0 ){
		 jsonData = $.ajax({
        type: "GET",
		url: "../v1.0/php/getGraphData.php",
		data: queryString,
		dataType:"json",
        async: false,
		success: function(jsonData) {
            }
		}).responseText;
		
		//alert(jsonData);
	//Converts the JSON object into useful graph data
   graphData = new google.visualization.DataTable(jsonData);
	drawChart();
	 
	 }}
	 
	
//WORKS OUT WHICH ARE THE TOP SIX STATS AND ADDS THEM TO THE ARRAY
	function addTopSixStats(){
		var placeHolder = document.getElementById('liveStats');
		for (var i = 0; i < 6; i++){
			 topSix[i] = placeHolder.children[i].id;
			 topSixStats[i] = placeHolder.children[i].children[1].id;
			
		}
	//	alert(topSixStats[2]);
	//	alert(topSix[2]);
		
	}
	
	
//MOVES A STAT TO THE CORRECT PLACE
	function moveStats(statToBeMoved, locationId, statName){
		//alert(statToBeMoved);
		statName = statName.replace(/[0-9]/g,"");
		var pTagId = statToBeMoved.slice(0, - 8);
		var sectionTagId = pTagId;
		pTagId = pTagId + "Stat";
		var isAlreadyAStat = false;
		for(var i = 0; i < 6 ; i++){
			if (topSix[i] == sectionTagId){
			isAlreadyAStat = true;
			alert("This is already a stat, so you can't have it 2x");
			break;
			}
		}
		if(isAlreadyAStat == false){
			var placeHolder = document.getElementById(locationId);
			//alert(locationId);
			placeHolder.children[1].id = pTagId;
			placeHolder.children[0].innerHTML = statName;
			placeHolder.id = sectionTagId;
		}
		
	
	
	}
	
	
	/**ADDS AND DELETES THE CURRENT STATS BEING ADDED TO THE GRAPH
	function changeStatsOnGraph(statToAdd){
	var length = currentStats.length();
	var inArray = false;
	
	if (length >= 6) {
		alert("You cannot add any more stats to the graph, please remove some first");
	}
	
	for (var i = 0 ; i < length; i++){
		if (statsToAdd == currentStats[i]){
		alert("error");
		inArray = true;
		break;
		}
		
	}
	
	if (inArray == false){
		alert("win");
	}
	
	}
	**/
	/**
	//Main function: deletes a row then gets new data for the graph
	function addToGraphs() {
      if (data.getNumberOfRows() >= 5) {
		data.removeRow(0);
		dataViaAjax();
		drawChart();
	  }
	  }
	 
	 //Uses JQUERY ajax call to send what lines the user wants
	 function dataViaAjax()
	 {
		 jsonData = $.ajax({
        type: "GET",
		url: "index_db.php",
		data: "start=" + startNumber + "&speed=" + speed + "&throttle=" + throttle + "&battery=" + battery + "&batteryTemp=" + batteryTemp + "&airTemp=" + airTemp + "&coolentTemp=" + coolentTemp,
		dataType:"json",
        async: false,
		success: function(data){
		     
            },
			error: function(e){
                console.log(e.message);
            }
		}).responseText;
	//Converts the JSON object into useful graph data
    data = new google.visualization.DataTable(jsonData);
	 
	 }
	 
	 
	 
	
	
	

	var genTimer
	var stopGen = 0 
	//clever timer and works when the user clicks on any of the stat buttons
	function generation() {
	clearTimeout(genTimer)  ///stop additional clicks from initiating more timers
	// all methods that need to be done every second need to go here
	addToGraphs();
	changeOnPageStats();
	if(!stopGen) {
       genTimer = setTimeout(function(){generation()},1000)
	}
	}	
	
	**/

$(document).ready(function(){
			
			$("header").click(function(){ $(this).slideUp(400); });
			$('#up').click(function(){
				
				if ($("footer").is(":hidden")) {
					//varable that works out if all stats should be shown
					allStats = true;
				
					$("footer").show();
				
					var scrollAmount = $('footer').position().top;	

					setTimeout(function(){ $('html, body').animate({scrollTop: scrollAmount}, 600); }, 100);

					//event.preventDefault(); 
				} else {
					allStats = false;
					
					$('html, body').animate({scrollTop: 0}, 600);
					setTimeout(function(){ $("footer").hide(); }, 650);

					//event.preventDefault(); 
				}
				
			});

			$('.livestats section').click(function(){
			
		
				//adds a line to the 
				if ($(this).hasClass('highlight')){
					$(this).removeClass('highlight');
						deleteAStat(this.id);
					
				}else{
				
					if (statToBeMoved == ""){
						$(this).addClass('highlight');
						addAStat(this.id);
					}
					else {
						
						moveStats(statToBeMoved, this.id, statName);
						statToBeMoved = "";
						statName = "";
						addTopSixStats();
					
					}
				
					
				}
				

			});


			$('footer ul li').click(function(){

				statToBeMoved = (this.children[0].id);
				statName = $(this).text();
			
				
				
				

				//$('.livestats section').each(function(){

					//if ($(this).hasClass('highlight')){
					//	$(this).children('h2').text(stat);
					//	$(this).removeClass('highlight');

				//	}
				//});

			});
		}); 