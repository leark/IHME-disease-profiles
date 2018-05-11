<?php
	$disease = htmlspecialchars($_GET["d"]);
	$region = htmlspecialchars($_GET["r"]);

	if ($disease == '' || $region == '') {
		header('Location: ./diseaseprofile.html', true, 301);
		exit();
	}

	echo '<script>';
	echo 'let cause_name = ' . json_encode($disease) . ';';
	echo 'let location_name = ' . json_encode($region) . ';';
	echo '</script>';
?>

<head>
	<title><?=$disease?> in <?=$region?> | Institute for Health Metrics and Evaluation</title>

	<link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
	<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
	<script src="https://d3js.org/d3.v3.min.js"></script>
	<link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css" rel="stylesheet" />
	<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js"></script>
	<script type="text/javascript" src="./js/linediagram.js"></script>
	<script type="text/javascript" src="./js/line_deaths.js"></script>
	<script type="text/javascript" src="./js/line_daly.js"></script>
	<script type="text/javascript" src="./js/line_yld.js"></script>
	<script type="text/javascript" src="./js/risks.js"></script>
	<script type="text/javascript" src="./js/lineArea.js"></script>
	<script type="text/javascript" src="./js/percent_rank.js"></script>
	<script type="text/javascript" src="./js/heat_map.js"></script>
	<script type="text/javascript" src="./js/select2.js"></script>
	<script type="text/javascript" src="./js/dom-to-image.js"></script>
	<script type="text/javascript" src="./js/FileSaver.js"></script>
	<script type="text/javascript" src="./js/iniSaveButton.js"></script>
	<script type="text/javascript" src="./js/createGraphTable.js"></script>
	<script type="text/javascript" src="./js/causeToLower.js"></script>
	<link type="text/css" rel="stylesheet" href="./css/style.css">
	<link rel="stylesheet" type="text/css" href="./css/column.css">
	<script>
		function goBack() {
			window.history.back();
		}
	</script>
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
            <div class="button"><a href="http://www.healthdata.org/news-events">News &amp; Events</a></div>
            <div class="button"><a href="http://www.healthdata.org/projects">Projects</a></div>
            <div class="button"><a href="http://www.healthdata.org/get-involved">Get Involved</a></div>
            <div class="button"><a href="http://www.healthdata.org/about">About</a></div>
        </div>
    </div>

	<div id="main">
		<div id="sidebar">
			<div onclick="goBack()" style="cursor: pointer; color: #57b055;">
				<p>< Back</p>
			</div>
<!-- 			<p class="head">RESULTS</p>
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
				<li><a href="Data &amp; Tools">Data &amp; Tools</a></li>
			</ul> -->
		</div>

		<div id="info">
			<form action="./diseaseprofile.php" method="get">
				<select name="d" id="e1" required>
					<option value="">Choose</option>
					<option value="Acute glomerulonephritis">Acute glomerulonephritis</option>
					<option value="Adverse effects of medical treatment">Adverse effects of medical treatment</option>
					<!-- <option value="African trypanosomiasis">African trypanosomiasis</option> -->
					<option value="Alcohol use disorders">Alcohol use disorders</option>
					<option value="Alzheimer disease and other dementias">Alzheimer disease and other dementias</option>
					<option value="Animal contact">Animal contact</option>
					<option value="Anxiety disorders">Anxiety disorders</option>
					<option value="Aortic aneurysm">Aortic aneurysm</option>
					<option value="Appendicitis">Appendicitis</option>
					<option value="Asthma">Asthma</option>
					<option value="Atrial fibrillation and flutter">Atrial fibrillation and flutter</option>
					<!-- <option value="Autistic spectrum disorders">Autistic spectrum disorders</option> -->
					<option value="Bipolar disorder">Bipolar disorder</option>
					<option value="Bladder cancer">Bladder cancer</option>
					<option value="Brain and nervous system cancer">Brain and nervous system cancer</option>
					<option value="Breast cancer">Breast cancer</option>
					<option value="Cardiomyopathy and myocarditis">Cardiomyopathy and myocarditis</option>
					<option value="Cerebrovascular disease">Cerebrovascular disease</option>
					<option value="Cervical cancer">Cervical cancer</option>
					<option value="Chagas disease">Chagas disease</option>
					<option value="Chronic kidney disease">Chronic kidney disease</option>
					<option value="Chronic obstructive pulmonary disease">Chronic obstructive pulmonary disease</option>
					<!-- <option value="Cirrhosis due to alcohol use">Cirrhosis due to alcohol use</option> -->
					<!-- <option value="Cirrhosis due to hepatitis B">Cirrhosis due to hepatitis B</option> -->
					<!-- <option value="Cirrhosis due to hepatitis C">Cirrhosis due to hepatitis C</option> -->
					<!-- <option value="Cirrhosis due to other causes">Cirrhosis due to other causes</option> -->
					<!-- <option value="Collective violence and legal intervention">Collective violence and legal intervention</option> -->
					<option value="Colon and rectum cancer">Colon and rectum cancer</option>
					<!-- <option value="Complications of abortion">Complications of abortion</option> -->
					<option value="Conduct disorder">Conduct disorder</option>
					<!-- <option value="Conflict and terrorist">Conflict and terrorist</option> -->
					<option value="Congenital anomalies">Congenital anomalies</option>
					<option value="Cystic echinococcosis">Cystic echinococcosis</option>
					<option value="Cysticercosis">Cysticercosis</option>
					<option value="Dengue">Dengue</option>
					<option value="Depressive disorders">Depressive disorders</option>
					<option value="Diabetes mellitus">Diabetes mellitus</option>
					<option value="Diarrheal diseases">Diarrheal diseases</option>
					<option value="Diphtheria">Diphtheria</option>
					<option value="Drowning">Drowning</option>
					<option value="Drug use disorders">Drug use disorders</option>
					<option value="Eating disorders">Eating disorders</option>
					<option value="Ebola">Ebola</option>
					<option value="Encephalitis">Encephalitis</option>
					<option value="Endocarditis">Endocarditis</option>
					<option value="Endocrine, metabolic, blood, and immune disorders">Endocrine, metabolic, blood, and immune disorders</option>
					<option value="Epilepsy">Epilepsy</option>
					<option value="Esophageal cancer">Esophageal cancer</option>
					<!-- <option value="Exposure to forces of nature, disaster">Exposure to forces of nature, disaster</option> -->
					<!-- <option value="Exposure to forces of nature, non‐disaster">Exposure to forces of nature, non‐disaster</option> -->
					<option value="Exposure to mechanical forces">Exposure to mechanical forces</option>
					<option value="Falls">Falls</option>
					<option value="Fire, heat, and hot substances">Fire, heat, and hot substances</option>
					<!-- <option value="Food‐borne trematodiases">Food‐borne trematodiases</option> -->
					<option value="Foreign body">Foreign body</option>
					<option value="Gallbladder and biliary diseases">Gallbladder and biliary diseases</option>
					<option value="Gallbladder and biliary tract cancer">Gallbladder and biliary tract cancer</option>
					<option value="Gastritis and duodenitis">Gastritis and duodenitis</option>
					<option value="Gout">Gout</option>
					<option value="Gynecological diseases">Gynecological diseases</option>
					<option value="HIV/AIDS">HIV/AIDS</option>
					<option value="Hemoglobinopathies and hemolytic anemias">Hemoglobinopathies and hemolytic anemias</option>
					<option value="Hemolytic disease and other neonatal jaundice">Hemolytic disease and other neonatal jaundice</option>
					<option value="Hepatitis">Hepatitis</option>
					<option value="Hodgkin lymphoma">Hodgkin lymphoma</option>
					<option value="Hypertensive heart disease">Hypertensive heart disease</option>
					<!-- <option value="Idiopathic intellectual disability">Idiopathic intellectual disability</option> -->
					<option value="Indirect maternal deaths">Indirect maternal deaths</option>
					<option value="Inflammatory bowel disease">Inflammatory bowel disease</option>
					<option value="Inguinal, femoral, and abdominal hernia">Inguinal, femoral, and abdominal hernia</option>
					<option value="Interpersonal violence">Interpersonal violence</option>
					<option value="Interstitial lung disease and pulmonary sarcoidosis">Interstitial lung disease and pulmonary sarcoidosis</option>
					<option value="Intestinal nematode infections">Intestinal nematode infections</option>
					<option value="Iodine deficiency">Iodine deficiency</option>
					<!-- <option value="Iron‐deficiency anemia">Iron‐deficiency anemia</option> -->
					<option value="Ischemic heart disease">Ischemic heart disease</option>
					<option value="Kidney cancer">Kidney cancer</option>
					<option value="Larynx cancer">Larynx cancer</option>
					<option value="Late maternal deaths">Late maternal deaths</option>
					<option value="Leishmaniasis">Leishmaniasis</option>
					<option value="Leprosy">Leprosy</option>
					<option value="Leukemia">Leukemia</option>
					<option value="Lip and oral cavity cancer">Lip and oral cavity cancer</option>
					<option value="Liver cancer">Liver cancer</option>
					<option value="Low back and neck pain">Low back and neck pain</option>
					<option value="Lower respiratory infections">Lower respiratory infections</option>
					<option value="Lymphatic filariasis">Lymphatic filariasis</option>
					<option value="Malaria">Malaria</option>
					<option value="Malignant skin melanoma">Malignant skin melanoma</option>
					<option value="Maternal deaths aggravated by HIV/AIDS">Maternal deaths aggravated by HIV/AIDS</option>
					<option value="Maternal hemorrhage">Maternal hemorrhage</option>
					<option value="Maternal hypertensive disorders">Maternal hypertensive disorders</option>
					<option value="Maternal sepsis and other maternal infections">Maternal sepsis and other maternal infections</option>
					<option value="Measles">Measles</option>
					<option value="Meningitis">Meningitis</option>
					<option value="Mesothelioma">Mesothelioma</option>
					<option value="Migraine">Migraine</option>
					<option value="Motor neuron disease">Motor neuron disease</option>
					<option value="Multiple myeloma">Multiple myeloma</option>
					<option value="Multiple sclerosis">Multiple sclerosis</option>
					<option value="Nasopharynx cancer">Nasopharynx cancer</option>
					<option value="Neonatal encephalopathy due to birth asphyxia and trauma">Neonatal encephalopathy due to birth asphyxia and trauma</option>
					<option value="Neonatal sepsis and other neonatal infections">Neonatal sepsis and other neonatal infections</option>
					<!-- <option value="Non‐Hodgkin lymphoma">Non‐Hodgkin lymphoma</option> -->
					<!-- <option value="Non‐melanoma skin cancer">Non‐melanoma skin cancer</option> -->
					<!-- <option value="Obstructed labor">Obstructed labor</option> -->
					<option value="Onchocerciasis">Onchocerciasis</option>
					<option value="Oral disorders">Oral disorders</option>
					<option value="Osteoarthritis">Osteoarthritis</option>
					<option value="Other cardiovascular and circulatory diseases">Other cardiovascular and circulatory diseases</option>
					<option value="Other chronic respiratory diseases">Other chronic respiratory diseases</option>
					<option value="Other digestive diseases">Other digestive diseases</option>
					<option value="Other infectious diseases">Other infectious diseases</option>
					<option value="Other maternal disorders">Other maternal disorders</option>
					<option value="Other mental and substance use disorders">Other mental and substance use disorders</option>
					<option value="Other musculoskeletal disorders">Other musculoskeletal disorders</option>
					<option value="Other neglected tropical diseases">Other neglected tropical diseases</option>
					<option value="Other neonatal disorders">Other neonatal disorders</option>
					<option value="Other neoplasms">Other neoplasms</option>
					<option value="Other neurological disorders">Other neurological disorders</option>
					<option value="Other nutritional deficiencies">Other nutritional deficiencies</option>
					<option value="Other pharynx cancer">Other pharynx cancer</option>
					<option value="Other transport injuries">Other transport injuries</option>
					<option value="Other unintentional injuries">Other unintentional injuries</option>
					<option value="Otitis media">Otitis media</option>
					<option value="Ovarian cancer">Ovarian cancer</option>
					<option value="Pancreatic cancer">Pancreatic cancer</option>
					<option value="Pancreatitis">Pancreatitis</option>
					<option value="Paralytic ileus and intestinal obstruction">Paralytic ileus and intestinal obstruction</option>
					<option value="Parkinson disease">Parkinson disease</option>
					<option value="Peptic ulcer disease">Peptic ulcer disease</option>
					<option value="Peripheral vascular disease">Peripheral vascular disease</option>
					<option value="Pneumoconiosis">Pneumoconiosis</option>
					<!-- <option value="Podoconiosis">Podoconiosis</option> -->
					<option value="Poisonings">Poisonings</option>
					<!-- <option value="Preterm birth complications">Preterm birth complications</option> -->
					<option value="Prostate cancer">Prostate cancer</option>
					<!-- <option value="Protein‐energy malnutrition">Protein‐energy malnutrition</option> -->
					<option value="Rabies">Rabies</option>
					<option value="Rheumatic heart disease">Rheumatic heart disease</option>
					<option value="Rheumatoid arthritis">Rheumatoid arthritis</option>
					<option value="Road injuries">Road injuries</option>
					<option value="Schistosomiasis">Schistosomiasis</option>
					<option value="Schizophrenia">Schizophrenia</option>
					<!-- <option value="Self‐harm">Self‐harm</option> -->
					<option value="Sense organ diseases">Sense organ diseases</option>
					<option value="Sexually transmitted diseases excluding HIV">Sexually transmitted diseases excluding HIV</option>
					<option value="Skin and subcutaneous diseases">Skin and subcutaneous diseases</option>
					<option value="Stomach cancer">Stomach cancer</option>
					<option value="Sudden infant death syndrome">Sudden infant death syndrome</option>
					<!-- <option value="Tension‐type headache">Tension‐type headache</option> -->
					<option value="Testicular cancer">Testicular cancer</option>
					<option value="Tetanus">Tetanus</option>
					<option value="Thyroid cancer">Thyroid cancer</option>
					<option value="Tracheal, bronchus, and lung cancer">Tracheal, bronchus, and lung cancer</option>
					<!-- <option value="Trachoma"><option value="">Trachoma</option> -->
					<option value="Tuberculosis">Tuberculosis</option>
					<option value="Upper respiratory infections">Upper respiratory infections</option>
					<option value="Uterine cancer">Uterine cancer</option>
					<!-- <option value="Urinary diseases and male infertility">Urinary diseases and male infertility</option> -->
					<option value="Varicella and herpes zoster">Varicella and herpes zoster</option>
					<option value="Vascular intestinal disorders">Vascular intestinal disorders</option>
					<option value="Vitamin A deficiency">Vitamin A deficiency</option>
					<option value="Whooping cough">Whooping cough</option>
					<option value="Yellow fever">Yellow fever</option>
					<!-- <option value="Zika virus">Zika virus</option> -->
				</select>
				<select name="r" id="e2" required>
					<option value="">Choose</option>
					<option value="Global">Global</option>
					<optgroup label="Sociodemographic Index">
					<option value="High SDI">High SDI</option>
					<option value="High-middle SDI">High Middle SDI</option>
					<option value="Middle SDI">Middle SDI</option>
					<option value="Low-middle SDI">Low Middle SDI</option>
					<option value="Low SDI">Low SDI</option>
					<optgroup label="Countries">
					<option value="Cuba">Cuba</option>
					<option value="Colombia">Colombia</option>
					<option value="France">France</option>
					<option value="New Zealand">New Zealand</option>
					<option value="Russia">Russia</option>
					<option value="United States">United States</option>
					<!-- <option value="Chad">Chad</option>
					<option value="Colombia">Colombia</option>
					<option value="Cuba">Cuba</option>
					<option value="France">France</option>
					<option value="Japan">Japan</option>
					<option value="Mexico">Mexico</option>
					<option value="New Zealand">New Zealand</option>
					<option value="Nigeria">Nigeria</option>
					<option value="Palestine">Palestine</option>
					<option value="Russia">Russia</option>
					<option value="Spain">Spain</option>
					<option value="Syria">Syria</option>
					<option value="Thailand">Thailand</option>
					<option value="United States">United States</option>					 -->
				</select>
				<input type="submit"></button>
			</form>

			<h1><?=$disease?> in <?=$region?></h1>
			<img id="loading" src="./img/loading.gif">
			<div id="everything" style="visibility: hidden;">
				<div id="media">
					<div class="profile-print-button"><a class="button-style-1" onclick="window.print();">Print</a></div>
				</div>
				<div id="SDI"></div>
				<div class="graph" id="lineDiv">
					<button class="saveButtons" id="lineSave">Save as Image</button>
					<div class="graphDiv" id="lineGraph">
						<h2 class="graph-header" id="lineTitle"></h2>
						<div id="lineLegend">
							<span id="fembar"></span>
							<span id="femtext"></span>
							<span id="sdifbar"></span>
							<span id="sdiftext"></span>
							<span id="mbar"></span>
							<span id="mtext"></span>
							<span id="sdimbar"></span>
							<span id="sdimtext"></span>
						</div>
					</div>
				</div>

				<div class="graph" id="daly_lineDiv">
					<button class="saveButtons" id="dalyLineSave">Save as Image</button>
					<div class="graphDiv" id="dalyLineGraph">
						<h2 class="graph-header" id="daly_lineTitle"></h2>
						<div id="daly_lineLegend">
							<span id="daly_fembar"></span>
							<span id="daly_femtext"></span>
							<span id="daly_sdifbar"></span>
							<span id="daly_sdiftext"></span>
							<span id="daly_mbar"></span>
							<span id="daly_mtext"></span>
							<span id="daly_sdimbar"></span>
							<span id="daly_sdimtext"></span>
						</div>
					</div>
				</div>

				<div class="graph" id="yld_lineDiv">
					<button class="saveButtons" id="yldLineSave">Save as Image</button>
					<div class="graphDiv" id="yldLineGraph">
						<h2 class="graph-header" id="yld_lineTitle"></h2>
						<div id="yld_lineLegend">
							<span id="yld_fembar"></span>
							<span id="yld_femtext"></span>
							<span id="yld_sdifbar"></span>
							<span id="yld_sdiftext"></span>
							<span id="yld_mbar"></span>
							<span id="yld_mtext"></span>
							<span id="yld_sdimbar"></span>
							<span id="yld_sdimtext"></span>
						</div>
					</div>
				</div>
				<div class="graph" id="ranktableDiv">
					<button class="saveButtons" id="ranktableSave" style="display: none">Save as Image</button>
					<div class="graphDiv" id="ranktableGraph">
						<h2 class="graph-header" id="rankTitle"></h2>
					</div>
				</div>
				<div class="graph" id="risksDiv">
					<h2 class="graph-header" id="risksTitle"></h2>
				</div>
				<div class="graph" id="lineAreaDiv">
					<button class="saveButtons" id="lineAreaSave">Save as Image</button>
					<div class="graphDiv" id="lineAreaGraph">
						<h2 class="graph-header" id="lineAreaTitle"></h2>
					</div>
				</div>
				<div class="graph" id="heatmapDiv">
					<button class="saveButtons" id="heatmapSave" style="display: none">Save as Image</button>
					<div class="graphDiv" id="heatmapGraph">
						<h2 class="graph-header" id="heatTitle"></h2>
					</div>
					<div id="benchmark-legend"></div>
				</div>
				<div id="aboutprofiles">
					<p>The Disease Profiles provide an overview of findings from the Global Burden of Disease (GBD). They are based on over 115,000 different data sources used by researchers to produce the most scientifically rigorous estimates possible. Estimates from the GBD study may differ from national statistics due to differences in data sources and methodology. These profiles are meant to be freely downloaded and distributed. Please send feedback and questions to <a href="mailto:engage@healthdata.org">engage@healthdata.org</a>.</p>
				</div>
			</div>

		</div>
	</div>
</body>
