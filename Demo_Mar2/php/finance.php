<?php	
	try {
		if (!empty($_GET["locationName"])) { // if input isn't required

			$locationName = $_GET["locationName"];
			$locationName = str_replace(' ', '_', $locationName);
			$conn = getConnection(); // database connection
			
			echo json_encode(getCountryContributions($conn, $locationName));
		}
	} catch(PDOException $e) {
		// Either connection failed or there was an error in the query
		echo "Connection failed: " . $e->getMessage();
	}
	
	function getConnection() {
		include 'dbconfig.php';
		$connection = new PDO("mysql:host=$dbhost;port=$dbport; dbname=$dbname", $username, $password) 
						or die("Could not connect: " . mysql.error());
		$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		return $connection;
	}

	function getCountryFunds($conn, $location) {
		$stmt = $conn->prepare("SELECT * FROM tbl_FINANCE WHERE source LIKE :location 
										ORDER BY year DESC");
		$stmt->bindParam(':location', $location);
		$stmt->execute();
		$result = $stmt->fetchAll();
		return $result; // returns the row as array	
	}
?>