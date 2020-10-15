const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const veebirakendus = express();

const registreerumised = {'0': [], '1': []};

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
	const nimi = req.query.nimi;
	const matkIndex = req.query.matkIndex;
	const email = req.query.email;
	//console.log('Käivitati registreerumine. Registreerus ' + nimi + ' matkale ' + matkIndex + ' email on ' + email);
	console.log(`Käivtati registreerumine. Registreerus ${nimi} matkale ${matkIndex} ja kelle email on ${email}`);
	registreerumised[matkIndex].push({nimi, email});
	console.log(registreerumised[matkIndex]);
	return res.send({ registreeritud: true});
}

function tagastaKoik(req, res) {
	return res.send({registreerumised});
}

veebirakendus
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/matkad',tagastaMatkad)
  .get('/registreerimised',tagastaRegistreerimised)
  .get('/koik',tagastaKoik)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
