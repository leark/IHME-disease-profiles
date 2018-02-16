<html>
<head>
	<title></title>
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"
            integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
            crossorigin="anonymous"></script>	
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css">
</head>
<body>
	<div class="container">
		<header>
			<h1>IHME Data</h1>
		</header>
		<form method="get">
			Disease: <input type="text" name="causeName" required="true">
			Country: <input type="text" name="locationName" required="true">
			<input type="submit" id="submit" value="Search">
		</form>
		<?php include 'search.php' ?>
	</div>
</html>
</body>