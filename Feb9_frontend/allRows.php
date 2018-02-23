<?php	
	try {
		// If the input isn't empty
		if (!empty($_GET["causeName"])) { // if input isn't required

			$causeName = $_GET["causeName"];
			$conn = getConnection(); // database connection

			echo json_encode(getAllRows($conn, $causeName));
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

	function getAllRows($conn, $cause) {
		$stmt = $conn->prepare("SELECT * FROM DEATHS WHERE cause LIKE :cause AND year = 2016");
		$stmt->bindParam(':cause', $cause);
		$stmt->execute();
		$result = $stmt->fetchAll();
		return $result; // returns the row as array	
	}
?>