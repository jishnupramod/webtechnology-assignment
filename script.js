btnUpper = document.getElementById("uppercase-button");
lowercaseBtn = document.getElementById("lowercase-button");

btnUpper.onclick = toUpper;
lowercaseBtn.onclick = toLower;

var data,
  parser,
  docXML,
  rootXML,
  tableContents,
  xmlContents,
  counter,
  serializer,
  resp,
  type;


function toUpper() {
  rootXML = '<studentData></studentData>';
  tableContents = document.getElementsByTagName('td');
  parser = new DOMParser();
  serializer = new XMLSerializer();
  docXML = parser.parseFromString(rootXML, 'text/xml');

  // Loop to parse the table to xml file.
  var parsedXML = docXML.createElement("studentData");
  counter = 0;
  for (var i = 0; i < 10; i++) {
    counter += 1;

    newStudent = docXML.createElement("student");

    newStudentName = docXML.createElement("name");
    newStudentName.innerHTML = tableContents[counter].textContent;
    counter += 1;

    newStudentAddress = docXML.createElement("address")
    newStudentAddress.innerHTML = tableContents[counter].textContent;
    counter += 1;

    newStudent.appendChild(newStudentName);
    newStudent.appendChild(newStudentAddress)

    parsedXML.appendChild(newStudent);
  }

  type = docXML.createElement("type");
  type.innerHTML = "uppercaseButton";
  parsedXML.appendChild(type);
  console.log(parsedXML);

  // Sending data to server
  var http = new XMLHttpRequest();
  var url = 'http://localhost:3000';
  http.open('POST', url, true);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  // Converting xml to string before sending
  var data = serializer.serializeToString(parsedXML);

  http.onreadystatechange = function() {
    if (http.readyState == 4 && http.status == 200) {
      resp = parser.parseFromString(http.respText, "text/xml");
      displayContents();
      console.log(resp);
    }
  }

  // Sending the data
  http.send(data);
}

function toLower() {
  rootXML = '<studentData></studentData>';
  tableContents = document.getElementsByTagName('td');
  parser = new DOMParser();
  serializer = new XMLSerializer();
  docXML = parser.parseFromString(rootXML, 'text/xml');

  // Loop to parse the table to xml file.
  var parsedXML = docXML.createElement("studentData");
  counter = 0;
  for (var i = 0; i < 10; i++) {
    counter += 1;

    newStudent = docXML.createElement("student");

    newStudentName = docXML.createElement("name");
    newStudentName.innerHTML = tableContents[counter].textContent;
    counter += 1;

    newStudentAddress = docXML.createElement("address")
    newStudentAddress.innerHTML = tableContents[counter].textContent;
    counter += 1;

    newStudent.appendChild(newStudentName);
    newStudent.appendChild(newStudentAddress)

    parsedXML.appendChild(newStudent);
  }

  type = docXML.createElement("type");
  type.innerHTML = "lowercaseButton";
  parsedXML.appendChild(type);
  console.log(parsedXML);

  // Sending data to server
  var http = new XMLHttpRequest();
  var url = 'http://localhost:3000';
  http.open('POST', url, true);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  // Converting xml to string before sending
  var data = serializer.serializeToString(parsedXML);

  // Waiting for reply from the server. If a resp is received and it is not an error, then render the contents back to the table.
  http.onreadystatechange = function() { //Call a function when the state changes.
    if (http.readyState == 4 && http.status == 200) {
      resp = parser.parseFromString(http.respText, "text/xml");
      displayContents();
      console.log(resp);
    }
  }

  // Sending the data
  http.send(data);
}

// Re-render the contents of the table.
function displayContents() {
  console.log('Rendering the contents back to the table.');

  tableContents = document.getElementsByTagName('td');
  xmlContents = resp.getElementsByTagName('student');

  for (var i = 0, j = 0; i < 30, j < 10;) {
    i += 1;

    tableContents[i].innerHTML = xmlContents[j].getElementsByTagName('name')[0].innerHTML;
    i += 1;

    tableContents[i].innerHTML = xmlContents[j].getElementsByTagName('address')[0].innerHTML;
    i += 1;
    j += 1;
  }
}
