const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

const MongoClient = require('mongodb').MongoClient;
const salas6na = 'KalaSuppD0';
const andmebaas = 'veebda'; // <= Pane siia enda number
const uri = `mongodb+srv://veebd0:${salas6na}@cluster0.qz3rv.mongodb.net/${andmebaas}?retryWrites=true&w=majority`;

const veebirakendus = express();

const registreerumised = { 0: [], 1: [] };

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
		matkad: matkaAndmed,
	});
}

function registreeri(req, res) {
	const nimi = req.query.nimi;
	const matkIndex = req.query.matkIndex;
	const email = req.query.email;
	console.log(`Käivtati registreerumine. Registreerus ${nimi} matkale ${matkIndex} ja kelle email on ${email}`);

	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
	client.connect((err) => {
		if (err) {
			res.send({ error: 'Viga: ' + err.message });
		} else {
			const collection = client.db(andmebaas).collection('matkaklubi_' + andmebaas);
			const matkaAndmed = { index: matkIndex, nimi: nimi, email: email };
			collection.insertOne(matkaAndmed, (err) => {
				client.close();
				if (err) {
					return res.send({ error: 'Viga andmete lisamisel: ' + err.message });
				}
				res.send({ success: true });
			});
		}
	});
}

function tagastaKoik(req, res) {
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
	client.connect((err) => {
		if (err) {
			res.send({ error: 'Viga: ' + err.message });
		} else {
			const collection = client.db(andmebaas).collection('matkaklubi_' + andmebaas);
			collection.find({}).toArray((err, registreerumised) => {
				client.close();
				if (err) {
					return res.send({ error: 'Viga andmete leidmisel: ' + err.message });
				}
				res.send(registreerumised);
			});
		}
	});
}

veebirakendus
	.use(express.static(path.join(__dirname, 'public')))
	.set('views', path.join(__dirname, 'views'))
	.set('view engine', 'ejs')
	.get('/', (req, res) => res.render('pages/index'))
	.get('/matkad', tagastaMatkad)
	.get('/registreeri', registreeri)
	.get('/registreerumised', tagastaKoik)
	.listen(PORT, () => console.log(`Listening on ${PORT}`));
