<?php	
	try {
		// If the input isn't empty
		if (!empty($_GET["causeName"]) && !empty($_GET["locationName"])) { // if input isn't required
			$causeName = $_GET["causeName"];
			$locationName = $_GET["locationName"];
			$conn = getConnection(); // database connection
			
			$first_year = (GetRanking($conn, $causeName, $locationName, 1990));
		    $second_year = (GetRanking($conn, $causeName, $locationName, 2016));
			$results = array_merge($first_year, $second_year);
			echo json_encode($results);
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
	
	function GetRanking($conn, $cause, $location, $year) {
		$stmt = $conn->prepare('CALL GetRankingRange(:location, :cause, :year, "Both")');
		// $stmt = $conn->prepare('CALL GetRankingRangeTemp(:location, :cause, :year, "Both")');		
		$stmt->bindParam(':cause', $cause);
		$stmt->bindParam(':location', $location);
				$stmt->bindParam(':year', $year);
		$stmt->execute();
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return $result; // returns the row as array	
	}
?>



