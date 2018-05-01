/*
<div class="graph" id="lineAreaDiv">
	<button class="saveButtons" id="lineAreaSave">Save as Image</button>
	<div class="graphDiv" id="lineAreaGraph">
		<h2 class="graph-header" id="lineAreaTitle"></h2>
	</div>
</div>

Here's an example div that you want to save (you should also format it your graph div so and make sure classes are same).

To attach the save function to the button in this div, you would write

linkSaveButton(`lineAreaSave`, `lineAreaGraph`, `${cause_name}MortalityAt${location_name}`);

	fileName is an optional parameter that will default the saved file's name to graphID.

	backgroundColor defaults to white(#FFFFFF) if not specified. Use color's hex code to specify color.

do not add file extension (e.g. .jpge, .png, etc) TO fileName if you're changing it.
*/

function iniSaveButton(buttonID, graphID, fileName = graphID, backgroundColor = `#FFFFFF`) {
	$(`#${buttonID}`).click(function() {
		let graph = document.getElementById(graphID);
		domtoimage.toPng(graph, {bgcolor:"#FFFFFF"}).then(function(dataUrl) {
			let dLink = document.createElement("a");
			dLink.download = `${fileName}.png`;
			dLink.href = dataUrl;
			dLink.click();
		})
		.catch(function(error) {
			console.error(`Error from ${graphID}: `, error);
		});
	});
}