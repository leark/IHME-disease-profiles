<?php
	try {
		// If the input isn't empty
		if (!empty($_GET["causeName"]) && !empty($_GET["locationName"])) {

			$conn = GetConnection(); // database connection
			$cause = $_GET["causeName"]; // ex: HIV
			$location = $_GET["locationName"]; // ex: Russia
			$req_type = $_GET["request_type"]; // ex: ranking

			// convert location and cause to IDs
			$json = json_decode(file_get_contents('../json/data.json'), true);
			$l_id = 0;
			$c_id = 0;
			foreach ($json['cause'] as $value) {
					if ($value['cause_name'] == $cause)
							$c_id = $value['cause_id'];
			}
			foreach ($json['location'] as $value) {
					if ($value['location_name'] == $location)
							$l_id = $value['location_id'];
			}

			// echo $c_id . " " . $l_id;
			if ($l_id != 0 && $c_id != 0) {
				echo json_encode(ExecuteQuery($conn, $req_type, $c_id, $l_id));
				// echo json_encode(ExecuteQuery($conn, $req_type, $cause, $location));
			}
			$conn = null;
			exit();
		}
	} catch(PDOException $e) {
		// Either connection failed or there was an error in the query
		echo "Connection failed: " . $e->getMessage();
		exit();
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
			return GetMortalityUncertainty($conn, $cause, $location);
		} else if ($type == "death_line") {
			return GetDeathLineData($conn, $cause, $location);
		} else if ($type == "daly_line") {
			return GetDALYLineData($conn, $cause, $location);
		} else if ($type == "yld_line") {
			return GetYLDLineData($conn, $cause, $location);
		} else if ($type == "risks") {
			return GetRisks($conn, $cause, $location);
		} else if ($type == "percent_rank") {
			$death_first = GetChartRanking($conn, $cause, $location, 1990, 'DEATH');
			$death_second = GetChartRanking($conn, $cause, $location, 2016, 'DEATH');

			$daly_first = GetChartRanking($conn, $cause, $location, 1990, 'DALY');
			$daly_second = GetChartRanking($conn, $cause, $location, 2016, 'DALY');

			$yld_first = GetChartRanking($conn, $cause, $location, 1990, 'YLD');
			$yld_second = GetChartRanking($conn, $cause, $location, 2016, 'YLD');
			$total = array_merge($death_first, $death_second, $daly_first, $daly_second, $yld_first, $yld_second);
			return $total;
		} else if ($type == "heat_rank") {
			return GetHeatRanking($conn, $cause, $location, 2016);
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

	function GetRisks($conn, $cause, $location) {
		$stmt = $conn->prepare('CALL GetRisks(:location, :cause)');
		$stmt->bindParam(':cause', $cause);
		$stmt->bindParam(':location', $location);
		$stmt->execute();
		$result = $stmt->fetchAll();
		return $result; // returns the row as array
	}

	// new bullet query
	function GetMortalityUncertainty($conn, $cause, $location) {
		$stmt = $conn->prepare("CALL GetDeathUncertainty(:location, :cause);");
		$stmt->bindParam(':location', $location);
		$stmt->bindParam(':cause', $cause);
		$stmt->execute();
		$result = $stmt->fetchAll();
		return $result; // returns the row as array
	}

	function GetChartRanking($conn, $cause, $location, $year, $type) {
		$stmt = $conn->prepare('CALL GetChartRankingAll(:location, :cause, :year, 3, 3, 22, :type)');
		$stmt->bindParam(':location', $location);
		$stmt->bindParam(':cause', $cause);
		$stmt->bindParam(':year', $year);
		$stmt->bindParam(':type', $type);
		$stmt->execute();
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return $result; // returns the row as array
	}

	function GetHeatRanking($conn, $cause, $location, $type) {
		$stmt = $conn->prepare('CALL GetHeatRanking(:location, :cause, 2016, 3, 3, 27)');
		$stmt->bindParam(':cause', $cause);
		$stmt->bindParam(':location', $location);
		$stmt->execute();
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return $result; // returns the row as array
	}

?>
