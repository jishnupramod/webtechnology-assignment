console.log('Server running...');

// Header files
const express = require('express');
const bodyParser = require('body-parser');
const xml2json = require('xml-js');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.post('/', (req, res) => {
  let stringXML = Object.keys(req.body)[0];

  // converting xml strig to json format in the server side.
  var JSONParsed = xml2json.xml2json(stringXML, { compact: true, spaces: 4 });
  JSONParsed = JSON.parse(JSONParsed);
  type = JSONParsed.studentData.type._text;
  JSONParsed = JSONParsed.studentData.student;

  console.log(JSONParsed);
  console.log(JSONParsed.length);
  var data = '<studentData>';
  for (var i = 0; i < 10; i++) {
    if (type == 'uppercaseButton') {
      console.log(i);
      console.log(JSONParsed[i].name._text + ' : ' + JSONParsed[i].address._text);

      data += '<student><name>' + JSONParsed[i].name._text.toUpperCase() + '</name><address>' + JSONParsed[i].address._text.toUpperCase() + '</address></student>';
    } else {
      data += '<student><name>' + JSONParsed[i].name._text.toLowerCase() + '</name><address>' + JSONParsed[i].address._text.toLowerCase() + '</address></student>';
    }
  }
  data += '</studentData>';
  res.send(data);
})

const PORT = 3000
app.listen(PORT);
