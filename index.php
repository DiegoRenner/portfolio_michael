<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title> MICHAEL UNCOVERED</title>
	<link rel="stylesheet" href="style.css">
	<script src="scripts.js"></script>
</head>
<body onresize="clearInterval(id); fillImageSetContainer(dir_array, height_array); myMove();">
	<?php

	$hostname = "localhost";
	$username = "admin";
	$password = "6@fhP-4QQXnmNxDfmOeyyCU?/";
	$db = "michael_db";

	$dbconnect=mysqli_connect($hostname,$username,$password,$db);

	if ($dbconnect->connect_error) {
		die("Database connection failed: " . $dbconnect->connect_error);
	}
	?>
	<p id=debugging> </p>
	<div class=container>
		<div id="background" class=sliding_background>	
		<div id="image_set_container" class="image_set_container">
	</div>
	</div>
	</div>
	<script>
		var dir_array = [ 
<?php
		$query = mysqli_query($dbconnect, "SELECT * FROM images") 
			or die (mysqli_error($dbconnect)); 
		while ($row = mysqli_fetch_array($query)) { 
			$dir = $row["dir"]; 
			echo "'$dir',"; 
		} 
?>
];
		var height_array = [ 
<?php
		$query = mysqli_query($dbconnect, "SELECT * FROM images") 
			or die (mysqli_error($dbconnect)); 
		while ($row = mysqli_fetch_array($query)) { 
			$dir = $row["height"]; 
			echo "'$dir',"; 
		} 
?>
];
		fillImageSetContainer(dir_array, height_array);
		//setInterval(updatePosition(),500);
		myMove();
	</script>
	<!-- The expanding image container -->
	<div class="img_container">
		<!-- Close the image -->
		<span onclick="this.parentElement.style.display='none'" class="closebtn">&times;</span>

		<!-- Expanded image -->
		<img id="expandedImg" style="width:100%">

		<!-- Image text -->
		<div id="imgtext"></div>
	</div>
</body>
</html>

