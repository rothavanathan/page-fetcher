const fs = require('fs');
const request = require('request');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//save commandline arguments to variables
const url = process.argv[2];
const filename = process.argv[3];

const writeFile = (filename, body) => {
  fs.writeFile(filename, body, (err) => {
    //handle error on write
    if (err) throw err;
    console.log(`Downloaded and saved ${body.length} bytes to ${filename}`);
  });
};


//check if file already exists
if (fs.existsSync('/etc/passwd')) {
  rl.question(`File already exists. Would you like to write over? Y / N `, (answer) => {
    //yes means try overwrite
    if (answer === "Y" || answer === "y") {
      request(url, (error, response, body) => {
        //handle error
        if (error) {
          console.log('There was an error!', error);
          console.log('statusCode:', response && response.statusCode);
        //write that file
        } else {
          writeFile(filename, body);
        }
      });
    //no overwrite
    } else {
      console.log(`ok`);
    }
    //close it up
    rl.close();
  });
}