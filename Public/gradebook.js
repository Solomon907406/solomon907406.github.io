// TODO: Fetch data from PosgreSQL database (to be implemented later)
 
function fetchGradeData() {
	// This function will query the PostrgreSQL database and return grade data
	console.log("Fetching grade data...");
	// Create a new request for HTTP data
	let xhr = new XMLHttpRequest();
	// This is the address of the machine we're asking for data
	let apiRoute = "/api/grades";
	// When the request changes status, we run this anonymous fucntion
	xhr.onreadystatechange = function(){
		let results;
		// Check to see if we're done
		if(xhr.readyState === xhr.DONE){
			// Check to see if we're successful
			if(xhr.status !== 200){
				console.error(`Could not get grades.
					Status: ${xhr.status}`);
			}
			// And then call the function to upudate the HTML with our data
			populateGradebook(JSON.parse(xhr.responseText));
		}
	}.bind(this);
	xhr.open("get", apiRoute, true);
	xhr.send();
}

// TODO: Populate the table with grade data
function populateGradebook(data) {
	// This function will take the fetched grade data and populate the table
	console.log("Populating gradebook with data:", data);
	let tableE1m = document.getElementById("gradebook"); // Get the gradebook table element
	data.forEach(function(assignment){ // For each row of data we're passed in
		let row = document.createElement('tr'); // createa a table element
		let columns = [] // Handy place to stick the columns of information
		columns.name = document.createElement('td'); // The first column's table data wil be the name
		columns.name.appendChild(
			// Concantrate the full name: "last_name, first_name"
			document.createTextNode(assignment.last_name + ", " + assignment.first_name)
		);
		columns.grade = document.createElement('td'); // second column will be the grade
		columns.grade.appendChild(
			// Just put the name in text, you could be fancy and figure out the letter grade here
			// with either a bunc of conditions, or a JavaScriot "switch" statement
			document.createTextNode(assignment.total_grade)
		);
		// Add the table data columns to the table row
		row.appendChild(columns.name);
		row.appendChild(columns.grade);
		// Add the row tot he table itself to make the data visible
		tableE1m.appendChild(row);
	});
}

// TODO REMOVE THIS
// Call the stubs to demonstrate the workflow
const gradeData = fetchGradeData();
// END REMOVE