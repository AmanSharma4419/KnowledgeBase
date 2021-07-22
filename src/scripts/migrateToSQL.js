var fs = require('fs');

module.exports.init = () => {
    let data = fs.readFileSync('city.txt', 'utf8')
    let result = data.split('(').join('');
    result = result.split('),').join('');
    result = result.split(')').join('')
    console.log(result)
   
fs.writeFile('city.csv', result, 'utf8', function (err) {
  if (err) {
    console.log('Some error occured - file either not saved or corrupted file saved.');
  } else{
    console.log('It\'s saved!');
  }
});
}