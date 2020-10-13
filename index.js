const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const veebirakendus = express();

function tagastaMatkad(req, res) {
	let matkaAndmed = [
		{
			pildiUrl: './assets/syst1.jpg',
			nimi: 'Süstamatk Võhandu jõel',
			lyhikirjeldus: 'alsdj alskdjfalsdkjf alskdjf lasjdf laskjdf lasdfasdfljasdfa. DFASdf',
		},
		{
			pildiUrl: './assets/syst2.jpg',
			nimi: 'Süstamatk Pärnu jõel',
			lyhikirjeldus: 'alsdj alskdjfalsdkjf alskdjf lasjdf laskjdf lasdfasdfljasdfa. DFASdf',
		},
		{
			pildiUrl: './assets/matk_tartus1.jpg',
			nimi: 'Tutvume Tartu linnaga',
			lyhikirjeldus: 'alsdj alskdjfalsdkjf alskdjf lasjdf laskjdf lasdfasdfljasdfa. DFASdf',
		},
	];

	return res.send({
		matkad: matkaAndmed
	});
}

function tagastaRegistreerimised(req, res) {
	return res.send({ registreeritud: true});
}

veebirakendus
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/matkad',tagastaMatkad)
  .get('/registreerimised',tagastaRegistreerimised)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
