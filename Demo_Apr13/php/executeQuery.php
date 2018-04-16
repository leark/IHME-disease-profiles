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
		} else if ($type == "death_line") {
			return GetDeathLineData($conn, $cause, $location);
		} else if ($type == "daly_line") {
			return GetDALYLineData($conn, $cause, $location);
		} else if ($type == "yld_line") {
			return GetYLDLineData($conn, $cause, $location);
		} else if ($type == "ranking") {
			$death_first = GetChartRanking($conn, $cause, $location, 1990, 'DEATH');
		    $death_second = GetChartRanking($conn, $cause, $location, 2016, 'DEATH');
			
			$daly_first = GetChartRanking($conn, $cause, $location, 1990, 'DALY');
		    $daly_second = GetChartRanking($conn, $cause, $location, 2016, 'DALY');

			$yld_first = GetChartRanking($conn, $cause, $location, 1990, 'YLD');
		    $yld_second = GetChartRanking($conn, $cause, $location, 2016, 'YLD');			
		
			$total = array_merge($death_first, $death_second, $daly_first, $daly_second, $yld_first, $yld_second);
			return $total;
		} else if ($type == "arrow_ranking") { // delete this one
			$first_year = GetDeathRankingData($conn, $cause, $location, 1990);
		    $second_year = GetDeathRankingData($conn, $cause, $location, 2016);
			return array_merge($first_year, $second_year);			
		}
	}
	
	function GetDeathLineData($conn, $cause, $location) {
		$stmt = $conn->prepare('CALL SDICountry_Death(:location, :cause)');
		$stmt->bindParam(':cause', $cause);
		$stmt->bindParam(':location', $location);
		$stmt->execute();
		$result = $stmt->fetchAll();
		return $result; // returns the row as array	
	}
	
	function GetDALYLineData($conn, $cause, $location) {
		$stmt = $conn->prepare('CALL SDICountry_DALY(:location, :cause)');
		$stmt->bindParam(':cause', $cause);
		$stmt->bindParam(':location', $location);
		$stmt->execute();
		$result = $stmt->fetchAll();
		return $result; // returns the row as array	
	}

	function GetYLDLineData($conn, $cause, $location) {
		$stmt = $conn->prepare('CALL SDICountry_YLD(:location, :cause)');
		$stmt->bindParam(':cause', $cause);
		$stmt->bindParam(':location', $location);
		$stmt->execute();
		$result = $stmt->fetchAll();
		return $result; // returns the row as array	
	}
	
	// new bullet query 
	function GetRateBulletData($conn, $cause, $location) {
		$stmt = $conn->prepare("SELECT * FROM tbl_DEATH WHERE location LIKE :location AND cause LIKE :cause AND 
								metric = 'Rate' AND sex = 'Both' AND age = 'All Ages' ORDER BY year DESC");
		$stmt->bindParam(':cause', $cause);
		$stmt->bindParam(':location', $location);
		$stmt->execute();
		$result = $stmt->fetchAll();
		return $result; // returns the row as array	
	}	
	
	// old bullet query
	// function GetRateBulletData($conn, $cause, $location) {
		// $stmt = $conn->prepare("SELECT * FROM tbl_DEATH WHERE cause LIKE :cause AND location LIKE :location 
								// AND (year = 1996 or year = 2006 or year = 2016) AND metric = 'Rate' 
								// AND age = 'All Ages' ORDER BY year DESC");
		// $stmt->bindParam(':cause', $cause);
		// $stmt->bindParam(':location', $location);
		// $stmt->execute();
		// $result = $stmt->fetchAll();
		// return $result; // returns the row as array	
	// }		
	
	function GetChartRanking($conn, $cause, $location, $year, $type) {
		$stmt = $conn->prepare('CALL GetChartRanking(:location, :cause, :year, "Both", "Rate", "All Ages", :type)');
		$stmt->bindParam(':location', $location);
		$stmt->bindParam(':cause', $cause);
		$stmt->bindParam(':year', $year);
		$stmt->bindParam(':type', $type);
		$stmt->execute();
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
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