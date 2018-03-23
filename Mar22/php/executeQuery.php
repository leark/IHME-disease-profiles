<?php	
	try {
		// If the input isn't empty
		if (!empty($_GET["causeName"]) && !empty($_GET["locationName"])) { // if input isn't required

			$conn = GetConnection(); // database connection		
			$cause = $_GET["causeName"]; // ex: HIV
			$location = $_GET["locationName"]; // ex: Russia
			$req_type = $_GET["request_type"]; // ex: bullet
			echo json_encode(ExecuteQuery($conn, $req_type, $cause, $location));
		}
	} catch(PDOException $e) {
		// Either connection failed or there was an error in the query
		echo "Connection failed: " . $e->getMessage();
	}
	
	function GetConnection() {
		include 'dbconfig.php';
		$connection = new PDO("mysql:host=$dbhost;port=$dbport; dbname=$dbname", $username, $password) 
						or die("Could not connect: " . mysql.error());
		$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		return $connection;
	}

	function ExecuteQuery($conn, $type, $cause, $location) {
		if ($type == "bullet") {
			return GetRateBulletData($conn, $cause, $location);
		} else if ($type == "line") {
			return GetDeathLineData($conn, $cause, $location);
		} else if ($type == "ranking") {
			$first_year = GetDeathRankingData($conn, $cause, $location, 1990);
		    $second_year = GetDeathRankingData($conn, $cause, $location, 2016);
			return array_merge($first_year, $second_year);
		}
	}
	
	function GetDeathLineData($conn, $cause, $location) {
		$stmt = $conn->prepare("SELECT * FROM tbl_DEATH WHERE cause LIKE :cause AND location LIKE :location 
										AND metric = 'Number' ORDER BY year DESC");
		$stmt->bindParam(':cause', $cause);
		$stmt->bindParam(':location', $location);
		$stmt->execute();
		$result = $stmt->fetchAll();
		return $result; // returns the row as array	
	}	
	
	function GetRateBulletData($conn, $cause, $location) {
		$stmt = $conn->prepare("SELECT * FROM tbl_DEATH WHERE cause LIKE :cause AND location LIKE :location 
								AND (year = 1996 or year = 2006 or year = 2016) AND metric = 'Rate' ORDER BY year DESC");
		$stmt->bindParam(':cause', $cause);
		$stmt->bindParam(':location', $location);
		$stmt->execute();
		$result = $stmt->fetchAll();
		return $result; // returns the row as array	
	}		
	
	function GetDeathRankingData($conn, $cause, $location, $year) {
		$stmt = $conn->prepare('CALL GetRankingRange(:location, :cause, :year, "Both")');
		$stmt->bindParam(':cause', $cause);
		$stmt->bindParam(':location', $location);
				$stmt->bindParam(':year', $year);
		$stmt->execute();
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return $result; // returns the row as array	
	}	
?>