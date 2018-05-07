// returns table element
// set gender to true if showing both genders
function createGraphTable(location_name, data, gender = false) {
	let table = document.createElement(`table`);

	let tableHeader = table.createTHead();

	let row = tableHeader.insertRow(0);
	row.insertCell(0);

	let countryCell = row.insertCell(1)
	countryCell.innerHTML = location_name;
	countryCell.colSpan = `2`;

	// sdiPresent will be true if data contains sdi values
	let sdiPresent = typeof data[0].sdi !== `undefined`;

	if (sdiPresent) {
		let SDICell = row.insertCell(2);
		SDICell.innerHTML = `SDI Average`;
		SDICell.colSpan = `2`;
	}

	row = tableHeader.insertRow(1);
	row.insertCell(0);
	row.insertCell(1).innerHTML = `1990`;
	row.insertCell(2).innerHTML = `2016`;
	if (sdiPresent) {
		row.insertCell(3).innerHTML = `1990`;
		row.insertCell(4).innerHTML = `2016`;
	}

	let tableBody = table.createTBody();
	tableBody.insertRow(0);
	tableBody.insertRow(1);
	tableBody.insertRow(2);

	let rowNumber = 0;

	if (!gender) {
		rowNumber = 2;
	}
	for (; rowNumber <= 2; rowNumber++) {
		tableBody.deleteRow(rowNumber);
		row = tableBody.insertRow(rowNumber);
	    rowName = data[0][rowNumber + 6];
		row.className = rowName;
		row.insertCell(0).innerHTML = rowName;
		row.insertCell(1).innerHTML = (Math.round(data[0][rowNumber] * 10) / 10).toFixed(1);
		row.insertCell(2).innerHTML = (Math.round(data[data.length - 1][rowNumber] * 10) / 10).toFixed(1);
		if (sdiPresent) {
			sdiNumber = rowNumber + 3;
			row.insertCell(3).innerHTML = (Math.round(data[0][sdiNumber] * 10) / 10).toFixed(1);
			row.insertCell(4).innerHTML = (Math.round(data[data.length - 1][sdiNumber] * 10) / 10).toFixed(1);
		}
	}

	return table;

	// if (gender) {
	// 	row = tableBody.insertRow(rowNumber++);
	// 	row.className = `female`;
	// 	row.insertCell(0).innerHTML = `Females`;
	// 	row.insertCell(1).innerHTML = (Math.round(data[0].female * 10) / 10).toFixed(1);
	// 	row.insertCell(2).innerHTML = (Math.round(data[data.length - 1].female * 10) / 10).toFixed(1);
	// 	if (sdiPresent) {
	// 		row.insertCell(3).innerHTML = (Math.round(data[0].sdiFemale * 10) / 10).toFixed(1);
	// 		row.insertCell(4).innerHTML = (Math.round(data[data.length - 1].sdiFemale * 10) / 10).toFixed(1);
	// 	}

	// 	row = tableBody.insertRow(rowNumber++);
	// 	row.className = `male`;
	// 	row.insertCell(0).innerHTML = `Males`;
	// 	row.insertCell(1).innerHTML = (Math.round(data[0].male * 10) / 10).toFixed(1);
	// 	row.insertCell(2).innerHTML = (Math.round(data[data.length - 1].male * 10) / 10).toFixed(1);
	// 	if (sdiPresent) {
	// 		row.insertCell(3).innerHTML = (Math.round(data[0].sdiMale * 10) / 10).toFixed(1);
	// 		row.insertCell(4).innerHTML = (Math.round(data[data.length - 1].sdiMale * 10) / 10).toFixed(1);
	// 	}
	// }

	// row = tableBody.insertRow(rowNumber++);
	// row.className = `all`;
	// row.insertCell(0).innerHTML = `All`;
	// row.insertCell(1).innerHTML = (Math.round(data[0].both * 10) / 10).toFixed(1);
	// row.insertCell(2).innerHTML = (Math.round(data[data.length - 1].both * 10) / 10).toFixed(1);
	// if (sdiPresent) {
	// 	row.insertCell(3).innerHTML = (Math.round(data[0].sdi * 10) / 10).toFixed(1);
	// 	row.insertCell(4).innerHTML = (Math.round(data[data.length - 1].sdi * 10) / 10).toFixed(1);
	// }

}
