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
var data;
var chart;
var options;
var jsonData;
var queryString;

var currentStats = new Array();



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
		data = new google.visualization.DataTable();
		data.addColumn('string', 'Example Time'); 
		data.addColumn('number', 'Example Speed(sec)'); 
		data.addRows([
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
                        colors: ['#5a2260', "red", "#acf", "#1BE032"],
                        legend: {position: 'top'},
                        hAxis: {title: 'Time'},
                    	vAxis: {title: 'Speed',
									viewWindow:{
									min:0 }
									},
						curveType: "function",
						title: 'Real Time Stats',
						animation:{
						duration: 1000,
						easing: 'linear'
      }
   }
	  
        // Create the graph
       chart =  new google.visualization.LineChart(document.getElementById('visualization'));
       chart.draw(data, options);
      }
      
	  // When the page first loads it creates the graph
      google.setOnLoadCallback(drawVisualization);
	  
//MY RANDOM TEST FUNCTION
 function test(){
	//  alert("bpob");
	  }

//WORKS OUT WHAT TO CALL AND DO  
 function main(){
		//if a race is on
		if (isRaceOn() == true){
				//updates the stats 
				getAllStats();
		if (currentStats.length != 0){
				//gets the graph data
				getGraphData();
				drawChart();
		}
			
		}
		else {
			alert("Their appears to be no race on");
		}
	}
	  
	  
	  
//REDRAWS THE CHART
	function drawChart() {
	 
		// chart =  new google.visualization.LineChart(document.getElementById('visualization'));
		chart.draw(data, options);
		}
	
//COMPARES THE TIME OF THE LAST TWO QUERIES TO SEE IF A RACE IS ON
    function isRaceOn(){
		var time1 = isRaceOnAjax();
		var time2 = isRaceOnAjax();
	
		if (time1 != time2) {
			return true;
		}
		else{
			return false
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
	
	
//GETS ALL THE PAGE STATS AS A JSON OBJECT
	function getAllStats(){
		//alert("this");
		$.ajax({
		dataType: "json",
		url: "../v1.0/php/getStatsData.php",
		async: false,
		//data: dataString,
		success: function(data) {
			document.getElementById("speedStat").innerHTML = data[0].speed;
		}
		})
	
	
	}

//ADDS STATS TO THE GRAPH
	function addAStat(statsName){
		var length = currentStats.length;
		var inArray = false;
		
		if (length >= 6) {
			alert("You cannot add any more stats to the graph, please remove some first");
		}
		else {
			currentStats.push(statsName);
			updateQueryString()
			//alert(currentStats[length]);
		}
	}
	
	
//DELETE STATS FROM THE GRAPH
	function deleteAStat(statsName){
		for(var i = 0 ; i < currentStats.length; i++){
				if (statsName == currentStats[i]){
				currentStats.splice(i,1);
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
   function getGraphData()
	 {	
		if (currentStats.length != 0 ){
		 jsonData = $.ajax({
        type: "GET",
		url: "../v1.0/php/getGraphData.php",
		data: queryString,
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
	
	drawChart();
	 
	 }}
	
	
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
					$("footer").show();

					var scrollAmount = $('footer').position().top;	

					setTimeout(function(){ $('html, body').animate({scrollTop: scrollAmount}, 600); }, 100);

					event.preventDefault(); 
				} else {
					
					$('html, body').animate({scrollTop: 0}, 600);
					setTimeout(function(){ $("footer").hide(); }, 650);

					event.preventDefault(); 
				}

			});

			$('.livestats section').click(function(){
			
		
				//adds a line to the 
				if ($(this).hasClass('highlight')){
					$(this).removeClass('highlight');
					deleteAStat(this.id);
					
					
					/**
					lineCounter = lineCounter - 1;
					if (this.id == "speed"){
						//speed = "False";
					}
					if (this.id == "throttle"){
					//	throttle = "False";
					}
					if (this.id == "battery"){
					//	battery = "False";
					}
					if (this.id == "batteryTemp"){
					//	batteryTemp = "False";
					}
					if (this.id == "airTemp"){
				//		airTemp = "False";
					}
					if (this.id == "coolentTemp"){
						//coolentTemp = "False";
					}
				//	if (lineCounter == 0){
					//stopGen = 1;
				//	}
					**/
				}else{
				
			
					$(this).addClass('highlight');
					addAStat(this.id);
					
					/**
					if (this.id == "speed"){
						//speed = "True";
					}
					if (this.id == "throttle"){
						//throttle = "True";
					}
					if (this.id == "battery"){
						//battery = "True";
					}
					if (this.id == "batteryTemp"){
						//batteryTemp = "True";
					}
					if (this.id == "airTemp"){
						//airTemp = "True";
					}
					if (this.id == "coolentTemp"){
					//	coolentTemp = "True";
					}
					//lineCounter = lineCounter + 1;
					//stopGen = 0; 
					//generation();
					
					**/
					
				}
				

			});

			var stat = ' '

			$('footer ul li').click(function(){

				stat = $(this).text();

				$('.livestats section').each(function(){

					if ($(this).hasClass('highlight')){
						$(this).children('h2').text(stat);
						$(this).removeClass('highlight');

					}
				});

			});
		}); 