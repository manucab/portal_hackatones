const testFolder = '../media/SocialMedia/';
const fs = require('fs');

fs.readdirSync(testFolder).forEach(file => {
console.log(file);
  
    console.log(file.slice(0,-4));

});