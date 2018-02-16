<?php 
	// $registration = $_POST['registration'];
	// $name= $_POST['name'];
	// $email= $_POST['email'];

	// if ($registration == "success"){
		// // some action goes here under php
		// echo json_encode(array("abc"=>'successfuly registered'));
	// }

	$request = $_GET['request'];
	$causeName= $_GET['causeName'];
	$locationName= $_GET['locationName'];
	
	if ($request == "success"){
		getData();
	}
	
	function getData() {
		include 'search.php';
		// $conn = getConnection();
		$causeName= $_GET['causeName'];
		$locationName= $_GET['locationName'];
		
		echo json_encode(array("body"=>executeQuery(getConnection(), $causeName, $locationName)));	
	}
	
	
?>
