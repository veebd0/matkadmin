let menyyAndmed = [
	{ nimi: 'Esileht', url: 'index.html', title: 'Matkaklubi' },
	{ nimi: 'Meist', url: 'meist.html', title: 'Matkaklubi - meist' },
	{ nimi: 'Kontakt', url: 'kontakt.html', title: 'Matkaklubi - kontakt' },
];

let matkaAndmed = [];

function menyyValik(menyyObjekt) {
	let klassid = 'nav-item nav-link';
	if (menyyObjekt.title === document.title) {
		klassid += ' active';
	}

	let menyyTekst = `
		<a class="${klassid}"
		   href="${menyyObjekt.url}"
		>
			${menyyObjekt.nimi}
		</a>
		`;
	return menyyTekst
}

function matkaKaart(matkaObjekt, i) {
	let kaart = `
				<div class="card col-md-6 col-lg-4">
					<img class="card-img-top" src="${matkaObjekt.pildiUrl}" alt="">
					<div class="card-body">
						<div class="card-title">
							${matkaObjekt.nimi}
						</div>
						<div class="card-text">
							${matkaObjekt.lyhikirjeldus}
						</div>
						<a href="registreeru.html?matk=${i}" class="btn btn-primary">Registreeru!</a>
					</div>
				</div>
	`;
	return kaart;
}

function kysiMatkad() {
	var settings = {
		async: true,
		crossDomain: true,
		url: '/matkad',
		method: 'GET',
		headers: {},
	};

	$.ajax(settings).done(function (response) {
		console.log(response);
		naitaMatkaKaarte(response.matkad);
	});
}


//Näitame kõigil lehtedel samasugust menüüd
let menyyKast = document.querySelector('.navbar-nav');
let koguMenyy = '';
for (let i = 0; i < menyyAndmed.length; i++) {
	koguMenyy += menyyValik(menyyAndmed[i]);
}

menyyKast.innerHTML = koguMenyy;

function naitaMatkaKaarte(matkaAndmed) {
	let matkaKaardid = document.querySelector('#matkakaardid');
	if (matkaKaardid) {
		let matkaSisu = '';
		for (let i = 0; i < matkaAndmed.length; i++) {
			matkaSisu += matkaKaart(matkaAndmed[i], i);
		}
		matkaKaardid.innerHTML = matkaSisu; //loome esilehele matkakaartide sis
	}
}

function registreeri() {
	//loeme lehe aadressilt get parameetri matk
	let minuURL = new URL(document.URL);
	const matkIndex = minuURL.searchParams.get('matk');
	const email = document.querySelector('#registreerujaEmail').value;
	const nimi = document.querySelector('#registreerujaNimi').value;

	console.log(`Salvestan registreerumise: ?matkIndex=${matkIndex}&email=${email}&nimi=${nimi}`);

	var settings = {
		async: true,
		crossDomain: true,
		url: `/registreeri?matkIndex=${matkIndex}&email=${email}&nimi=${nimi}`,
		method: 'GET',
		headers: {},
	};

	$.ajax(settings).done(function (response) {
		console.log(response);
		window.open('/');
	});
}