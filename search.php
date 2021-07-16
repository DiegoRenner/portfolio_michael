<?php
$hostname = "localhost";
$username = "admin";
$password = "6@fhP-4QQXnmNxDfmOeyyCU?/";
$db = "michael_db";

$dbconnect=mysqli_connect($hostname,$username,$password,$db);

if ($dbconnect->connect_error) {
    die("Database connection failed: " . $dbconnect->connect_error);
}
$keyword = $_POST['keyword'];
$query = mysqli_query($dbconnect, "SELECT id FROM tags WHERE tag LIKE '%".$_POST['keyword']."%'")
or die (mysqli_error($dbconnect));
$i = 0;
while ($row = mysqli_fetch_array($query)) {
    $dir = $row[0];
    $i++;
    if (mysqli_num_rows($query)>$i){
        echo "$dir,";
    } else {
        echo "$dir";
    }
}
?>