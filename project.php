<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Project</title>
    <link rel="stylesheet" href="project_style.css">
    <script src="project_scripts.js"></script>
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
<div id="gallery" class="gallery">
</div>
<div id="text" class="text">
    <?php
    $query = mysqli_query($dbconnect, "SELECT txt_dir FROM projects WHERE id=".$_GET['project_id'])
    or die (mysqli_error($dbconnect));
    $dir= mysqli_fetch_array($query);
    echo  "<p>";
    include($dir[0]);
    echo "</p>";

    ?>
    <object id="txt_temp" width=auto height=auto type="text/plain" >
    </object>
</div>

<script>
    var project_id = location.search.slice(1).split("&")[0].split("=")[1];
    var project_images = [
        <?php
        $query = mysqli_query($dbconnect, "SELECT * FROM images WHERE group_id=".$_GET['project_id'])
        or die (mysqli_error($dbconnect));
        while ($row = mysqli_fetch_array($query)) {
            $dir = $row["dir"];
            echo "'$dir',";
        }
        ?>
    ];
    var text_dir = [
        <?php
        $query = mysqli_query($dbconnect, "SELECT * FROM projects WHERE id=".$_GET['project_id'])
        or die (mysqli_error($dbconnect));
        while ($row = mysqli_fetch_array($query)) {
            $dir = $row["txt_dir"];
            echo "'$dir',";
        }
        ?>
    ];
    init_image(project_images)
    //set_text(text_dir)
</script>

</body>
</html>