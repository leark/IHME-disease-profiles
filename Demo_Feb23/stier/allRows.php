<?php	
	try {
		// If the input isn't empty
		if (!empty($_GET["causeName"]) && !empty($_GET["locationName"])) { // if input isn't required

			$causeName = $_GET["causeName"];
			$locationName = $_GET["locationName"];
			$conn = getConnection(); // database connection

			echo json_encode(getAllRows($conn, $causeName, $locationName));
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

	function getAllRows($conn, $cause, $location) {
		$stmt = $conn->prepare("SELECT * FROM DEATHS WHERE cause LIKE :cause AND location LIKE :location 
										ORDER BY year DESC");
		$stmt->bindParam(':cause', $cause);
		$stmt->bindParam(':location', $location);
		$stmt->execute();
		$result = $stmt->fetchAll();
		return $result; // returns the row as array	
	}
?>