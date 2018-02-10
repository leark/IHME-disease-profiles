<?php

	// Database configurations -- connected to AWS RDS
	$dbhost = "ihme.c1blkxjim6dl.us-west-2.rds.amazonaws.com";
	$dbport = 3306;
	$dbname = "ihmedb";
	$username = "info490user";
	$password = "mypassword";
	
	try {
		// If the input isn't empty
		if (!empty($_GET["causeName"])) {
			// Change the name attribute to align in both HTML and here
			// Get the value in the input
			$causeName = $_GET["causeName"];
			
			// Database connection
			$conn = new PDO("mysql:host=$dbhost;port=$dbport; dbname=$dbname", $username, $password) 
						or die("Could not connect: " . mysql.error());
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);	
			
			// Prints the JSON result of executeQuery
			print_r(executeQuery($conn, $causeName));
		}
	} catch(PDOException $e) {
		// Either connection failed or there was an error in the query
		echo "Connection failed: " . $e->getMessage();
	}
	
	// $value is cause_name like Meningitis, $conn is the database connection
	// Utilized PDO (prepare()) to prevent SQL Injection
	// Returns the query as a JSON value
	function executeQuery($conn, $value) {
		$cause = $value;
		$stmt = $conn->prepare("SELECT * FROM DEATHS WHERE cause_name LIKE :cause");
		$stmt->bindParam(':cause', $cause);
		$stmt->execute();
		$result = $stmt->fetchAll();
		return json_encode($result); // returns the row as JSON
	}
?>