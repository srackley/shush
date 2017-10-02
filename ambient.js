const tessel = require('tessel');
const ambientlib = require('ambient-attx4');
const app = require('express')();

app.listen(3000, () => {
  console.log('Naked people on 3000');
});

app.post('/', function(req, res, next){

});

const ambient = ambientlib.use(tessel.port.A);
let soundCounter = 0;

ambient.on('ready', () => {
  // Get points of light and sound data.
  setInterval(() => {
    ambient.getLightLevel((err, lightdata) => {
      if (err) throw err;
      ambient.getSoundLevel((err, sounddata) => {
        if (err) throw err;
        if (sounddata.toFixed(8) > 0.4) {
          soundCounter++;
          if (soundCounter === 6) {
            console.log(`You're too loud.  You're at a ${sounddata.toFixed(3)} and I'm going to need you to bring it down to a 2.`);
          }
        } else {
          soundCounter = 0;
          console.log('Light level:', lightdata.toFixed(8), ' ', 'Sound Level:', sounddata.toFixed(8));
        }
      });
    });
  }, 500); // The readings will happen every .5 seconds
});

ambient.on('error', (err) => {
  console.log(err);
});
