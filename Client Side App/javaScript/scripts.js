google.load('visualization', '1', {packages: ['corechart']}); // Load graph
//need to check few of these
// basic graph variables
var data;
var chart;
var options;
var jsonData;
var startNumber = 1;

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
	
	  

	  function drawChart() {
	  //redraws the bars with new data
      chart.draw(data, options);
    }
	
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
	 
	 
	 
	
	// Uses JQuery to get all the page stats
	function changeOnPageStats()
	{
		
		statData = $.ajax({
        type: "GET",
		url: "get_Stat.php",
		data: "start=" + startNumber,
		dataType:"String",
        async: false,
		success: function(data){
		     
            },
			error: function(e){
                console.log(e.message);
            }
		}).responseText;

		// gets the string and converts each section into a useful stat for the page, and updates 
		var firstNumber = 0;
		var commaIndex = 0;
		
		
		commaIndex=statData.search(",");
		
		document.getElementById("speedStat").innerHTML = statData.substring(firstNumber, commaIndex);
		statData = statData.substring(commaIndex +1);
		commaIndex=statData.search(",");
		
		document.getElementById("throttleStat").innerHTML = statData.substring(firstNumber, commaIndex);
		statData = statData.substring(commaIndex +1);
		commaIndex=statData.search(",");
		
		document.getElementById("batteryStat").innerHTML = statData.substring(firstNumber, commaIndex);
		statData = statData.substring(commaIndex +1);
		commaIndex=statData.search(",");
		
		document.getElementById("batteryTempStat").innerHTML = statData.substring(firstNumber, commaIndex);
		statData = statData.substring(commaIndex +1);
		commaIndex=statData.search(",");
		
		document.getElementById("airTempStat").innerHTML = statData.substring(firstNumber, commaIndex);
		statData = statData.substring(commaIndex +1);
		commaIndex=statData.search(",");
		
		document.getElementById("coolentTempStat").innerHTML = statData.substring(firstNumber, commaIndex);
		statData = statData.substring(commaIndex +1);
		commaIndex=statData.search(",");
		
		
	
	var str=jsonData.toString();
		
	 startNumber = startNumber + 1;
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
					lineCounter = lineCounter - 1;
					if (this.id == "speed"){
						speed = "False";
					}
					if (this.id == "throttle"){
						throttle = "False";
					}
					if (this.id == "battery"){
						battery = "False";
					}
					if (this.id == "batteryTemp"){
						batteryTemp = "False";
					}
					if (this.id == "airTemp"){
						airTemp = "False";
					}
					if (this.id == "coolentTemp"){
						coolentTemp = "False";
					}
					if (lineCounter == 0){
					stopGen = 1;
					}
					
				}else{
					$(this).addClass('highlight');
					
					if (this.id == "speed"){
						speed = "True";
					}
					if (this.id == "throttle"){
						throttle = "True";
					}
					if (this.id == "battery"){
						battery = "True";
					}
					if (this.id == "batteryTemp"){
						batteryTemp = "True";
					}
					if (this.id == "airTemp"){
						airTemp = "True";
					}
					if (this.id == "coolentTemp"){
						coolentTemp = "True";
					}
					lineCounter = lineCounter + 1;
					stopGen = 0; 
					generation();
		
					
					
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