<?php
	$causeName = htmlspecialchars($_POST["causeName"]);
	$locationName = htmlspecialchars($_POST["locationName"]);
	
	echo '<script>';
	echo 'var cause_name = ' . json_encode($causeName) . ';';
	echo 'var location_name = ' . json_encode($locationName) . ';';
	echo '</script>';
?>

<head>
	<title><?=$causeName?> in <?=$locationName?> | Institute for Health Metrics and Evaluation</title>

	<link type="text/css" rel="stylesheet" href="./css/style.css">
	<script
	  src="https://code.jquery.com/jquery-3.3.1.min.js"
	  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
	  crossorigin="anonymous"></script>
	<script type="text/javascript" src="./js/disease.js"></script>
	<script src="https://d3js.org/d3.v3.min.js"></script>
	<style>
		.chart text {
			fill: white;
			font: 14px sans-serif;
			text-anchor: end;
		}

		.axis text {
		 	font: 10px sans-serif;
		 	color: black;
		}

		.axis path,
		.axis line {
		 	fill: none;
		 	stroke: #000;
		 	shape-rendering: crispEdges;
		}

		.x.axis path {
		 	display: none;
		}

		.graphdiv {

		}
	</style>
</head>

<body>
	<p id="jump"><a href="#topmenu">Jump to Navigation</a></p>
	<div id="top">
		<ul class="menu">
			<li><a href="http://www.healthdata.org/">IHME</a></li>
			<li><a href="http://ghdx.healthdata.org/">GHDx</a></li>
			<li><a href="https://vizhub.healthdata.org/gbd-compare/">GBD Compare</a></li>
		</ul>
	</div>
	<div id="topmenu">
		<div id="logo"><img src="./img/logo10.png" /></div>
		<button><a href="http://www.healthdata.org/">Home</a></button>
		<button><a href="http://www.healthdata.org/results">Results</a></button>
		<button><a href="http://www.healthdata.org/news-events">News & Events</a></button>
		<button><a href="http://www.healthdata.org/projects">Projects</a></button>
		<button><a href="http://www.healthdata.org/get-involved">Get Involved</a></button>
		<button><a href="http://www.healthdata.org/about">About</a></button>

	</div>

	<div id="main">

		<div id="sidebar">
			<p>RESULTS</p>
			<ul class="menu">
				<li>GBD Results Tool</li>
				<li>Data Visualizations</li>
				<li>Country Profiles</li>
				<li>Healthcare Access and Quality</li>
				<li>Policy Reports</li>
				<li>Research Articles</li>
				<li>Infographics</li>
				<li>US County Profiles</li>
				<li>Topics</li>
				<li>Data & Tools</li>
			</ul>
		</div>

		<h1><?=$causeName?> in <?=$locationName?></h1>

		<div id="graphdiv">
			<p id="title"></p>
			<svg class="chart"></svg>
		</div>
	</div>
</body>