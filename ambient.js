const tessel = require('tessel');
const ambientlib = require('ambient-attx4');
const http = require('http');

const ambient = ambientlib.use(tessel.port.A);
let soundCounter = 0;

ambient.on('ready', () => {
  // Get points of light and sound data.
  setInterval(() => {
    ambient.getLightLevel((err, lightdata) => {
      if (err) throw err;
      ambient.getSoundLevel((err, sounddata) => {
        if (err) throw err;
        if (sounddata.toFixed(8) > 0.35) {
          soundCounter++;
          if (soundCounter === 10) {
            const db = (Number(sounddata.toFixed(3)) * 10).toString();
            console.log(`You're too loud.  You're at a ${db} and I'm going to need you to bring it down to a 2.`);
            const request = http.request({
              hostname: '172.16.22.242',
              port: 3000,
              path: '/' + db,
              method: 'POST',
              headers: {
                        'Content-Type': 'text',
                        'Content-Length': 1000
                        }
            })

            request.write(db)// not sure if db is actually text,
            // we can change to a string once you've figured
            // out what type it actually is
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
