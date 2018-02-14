<html>
<head>
	<title></title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css">
</head>
<body>
	<div class="container">
		<header>
			<h1>IHME Data</h1>
		</header>
		<form method="get">
			<input type="text" name="causeName" required="true">
			<input type="submit" value="Search">
		</form>
		<?php
			// Database configurations
			$dbhost = "ihme.c1blkxjim6dl.us-west-2.rds.amazonaws.com";
			$dbport = 3306;
			$dbname = "ihmedb";
			$username = "info490user";
			$password = "mypassword";
			
			try {
				if (!empty($_GET["causeName"])) { // Change the name attribute
					$causeName = $_GET["causeName"]; // based on their names for input
					
					// Database connection
					$conn = new PDO("mysql:host=$dbhost;port=$dbport; dbname=$dbname", $username, $password) 
								or die("Could not connect: " . mysql.error());
					$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
					
					// Connected successfully
					print_r(executeQuery($conn, $causeName));
				}
			} catch(PDOException $e) {
				echo "Connection failed: " . $e->getMessage();
			}
			
			// $value is cause_name
			// Utilized PDO to prevent SQL Injection
			// Returns the query as a JSON value
			function executeQuery($conn, $value) {
				$cause = $value;
				$stmt = $conn->prepare("SELECT * FROM DEATHS WHERE cause_name LIKE :cause");
				$stmt->bindParam(':cause', $cause);
				$stmt->execute();
				$result = $stmt->fetchAll();
				return json_encode($result);
				//return $result;
			}
		?>
	</div>
</html>
</body>