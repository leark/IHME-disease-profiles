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

    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
	
	<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="https://d3js.org/d3.v3.min.js"></script>
	<link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css" rel="stylesheet" />
	<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js"></script>
<!--     <script type="text/javascript" src="./js/bullet.js"></script>
    <script type="text/javascript" src="./js/bulletdiagram.js"></script> -->
	<script type="text/javascript" src="./js/linediagram.js"></script>
	<script type="text/javascript" src="./js/line_daly.js"></script>
	<script type="text/javascript" src="./js/line_yld.js"></script>
	<!-- <script type="text/javascript" src="./js/arrowdiagram.js"></script> -->
	<script type="text/javascript" src="./js/ranking.js"></script>		
	<script type="text/javascript" src="./js/lineArea.js"></script>
	<script type="text/javascript" src="./js/select2.js"></script>
    <link type="text/css" rel="stylesheet" href="./css/style.css">
    <link rel="stylesheet" type="text/css" href="./css/bullet.css"> 
    <link rel="stylesheet" type="text/css" href="./css/column.css">
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
        <div id="buttons">
            <div class="button"><a href="http://www.healthdata.org/">Home</a></div>
            <div class="button"><a href="http://www.healthdata.org/results">Results</a></div>
            <div class="button"><a href="http://www.healthdata.org/news-events">News & Events</a></div>
            <div class="button"><a href="http://www.healthdata.org/projects">Projects</a></div>
            <div class="button"><a href="http://www.healthdata.org/get-involved">Get Involved</a></div>
            <div class="button"><a href="http://www.healthdata.org/about">About</a></div>
        </div>
    </div>

	<div id="main">

        <div id="sidebar">
            <p class="head">RESULTS</p>
            <ul class="side">
                <li><a href="http://ghdx.healthdata.org/gbd-results-tool">GBD Results Tool</a></li>
                <li><a href="http://www.healthdata.org/results/data-visualizations">Data Visualizations</a></li>
                <li><a href="http://www.healthdata.org/results/country-profiles">Country Profiles</a></li>
                <ul>
                    <li><a href="http://www.healthdata.org/results/country-profiles/haq">Healthcare Access and Quality</a></li>
                </ul>
                <li><a href="http://students.washington.edu/shl7/capstone/diseaseprofile.html">Disease Profiles</li>
                <li><a href="http://www.healthdata.org/results/policy-reports">Policy Reports</a></li>
                <li><a href="http://www.healthdata.org/results/research-articles">Research Articles</a></li>
                <li><a href="http://www.healthdata.org/results/research-articles">Infographics</a></li>
                <li><a href="http://www.healthdata.org/us-county-profiles">US County Profiles</a></li>
                <li><a href="http://www.healthdata.org/results/topics">Topics</a></li>
                <li><a href="Data & Tools">Data & Tools</a></li>
            </ul>
        </div>

        <div id="info">
        	<form action="./diseaseprofile.php" method="post">
                <select name="causeName" id="e1" required>					
                    <option value="">Choose</option>
                    <option value="HIV/AIDS">HIV/AIDS</option>
                    <option value="Upper respiratory infections">Upper respiratory infections</option>
                    <option value="Lower respiratory infections">Lower respiratory infections</option>
                    <option value="Thyroid cancer">Thyroid cancer</option>
                    <option value="Iron-deficiency anemia">Iron-deficiency anemia</option>
                    <option value="Liver cancer">Liver cancer</option>
                    <option value="Breast cancer">Breast cancer</option>
                </select>
                <select name="locationName" id="e2" required>
                    <option value="">Choose</option>
					<option value="Global">Global</option>
                    <optgroup label="Sociodemographic Index">                    
                    <option value="High SDI">High SDI</option>
                    <option value="High-Middle SDI">High Middle SDI</option>
                    <option value="Middle SDI">Middle SDI</option>
                    <option value="Low-Middle SDI">Low Middle SDI</option>
                    <option value="Low SDI">Low SDI</option>
                    <optgroup label="Countries">
                    <option value="Cuba">Cuba</option>
                    <option value="Colombia">Colombia</option>
                    <option value="France">France</option>
					<option value="New Zealand">New Zealand</option>
                    <option value="Russia">Russia</option>
                    <option value="United States">United States</option>					
                </select>
				<input type="submit"></button>
            </form>

			<h1><?=$causeName?> in <?=$locationName?></h1>

            <div class="graph" id="lineDiv">
                <h2 class="graph-header" id="lineTitle"></h2>
				<div id="lineLegend">
					<span id="fembar"></span>
					<span id="femtext"></span>
					<span id="mbar"></span>
					<span id="mtext"></span>
					<span id="bothbar"></span>
					<span id="bothtext"></span>
				</div>
            </div>
			
            <div class="graph" id="daly_lineDiv">
                <h2 class="graph-header" id="daly_lineTitle"></h2>
				<div id="daly_lineLegend">
					<span id="daly_fembar"></span>
					<span id="daly_femtext"></span>
					<span id="daly_mbar"></span>
					<span id="daly_mtext"></span>
					<span id="daly_bothbar"></span>
					<span id="daly_bothtext"></span>
				</div>
            </div>
			
			<div class="graph" id="yld_lineDiv">
                <h2 class="graph-header" id="yld_lineTitle"></h2>
				<div id="yld_lineLegend">
					<span id="yld_fembar"></span>
					<span id="yld_femtext"></span>
					<span id="yld_mbar"></span>
					<span id="yld_mtext"></span>
					<span id="yld_bothbar"></span>
					<span id="yld_bothtext"></span>
				</div>
            </div>
			
<!--             <div class="graph" id="bulletDiv">
                <h2 class="graph-header" id="bulletTitle"></h2>
            </div> -->
            <div class="graph" id="lineAreaDiv">
                <h2 class="graph-header" id="lineAreaTitle"></h2>
            </div>
<!--			<div class="graph" id="arrowdiagramDiv">
				<h2 class="graph-header" id="arrowTitle"></h2>
            </div> -->
			
			<div class="graph" id="rankTableDiv">
				<h2 class="graph-header" id="rankTitle"></h2>
				<table id="rankTable"></table>				
            </div>	
			<div id="aboutprofiles">
                <p>The Country Profiles provide an overview of findings from the Global Burden of Disease (GBD). They are based on over 115,000 different data sources used by researchers to produce the most scientifically rigorous estimates possible. Estimates from the GBD study may differ from national statistics due to differences in data sources and methodology. These profiles are meant to be freely downloaded and distributed. Please send feedback and questions to <a href="mailto:engage@healthdata.org">engage@healthdata.org</a>.</p>
            </div>

		</div>
	</div>
</body>