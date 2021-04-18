<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title> MICHAEL UNCOVERED</title>
	<link rel="stylesheet" href="style.css">
	<script src="scripts.js"></script>
</head>
<body>
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
		<div class="image_set">
		<?php
		$query = mysqli_query($dbconnect, "SELECT * FROM images order by RAND()")
		   or die (mysqli_error($dbconnect));
		$database = mysqli_fetch_all($query);

		$n_entries = 0;
		while ($row = mysqli_fetch_array($query)) {
			if ($n_entries%6 == 0){
				echo "<div class='row'>";
			}
		  echo
			"<div class='column'>\n
				<img id='$n_entries' src={$row['dir']} alt='Nature' onclick='myFunction(this);'>\n
			</div>\n";
			if ($n_entries%6 == 5) {
				echo "</div>";
			}
		$n_entries = $n_entries + 1;
		}
		?>
		
	</div>
	</div>
	</div>
	<script>
		addImages();
		setInterval(updatePosition(),500);
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

