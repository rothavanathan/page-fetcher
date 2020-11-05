const fs = require('fs');
const request = require('request');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//save argument to variable
const url = process.argv[2];
const filename = process.argv[3];

//check if file already exists
if (fs.existsSync('/etc/passwd')) {
  rl.question(`File already exists. Would you like to write over? Y / N `, (answer) => {
    if (answer === "Y" || answer === "y") {
      request(url, (error, response, body) => {
        if (error) {
          console.log('There was an error!', error);
          console.log('statusCode:', response && response.statusCode);
        } else {
          console.log('statusCode:', response && response.statusCode);
          console.log('body:', body);
          fs.writeFile(filename, body, (err) => {
            if (err) throw err;
            console.log(`Downloaded and saved ${body.length} bytes to ${filename}`);
          });
        }
      });
    } else {
      console.log(`ok`);
    }
    rl.close();
  });
}