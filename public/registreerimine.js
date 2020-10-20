function kysiMatkadJaNaitaRegistreerimist() {
	var settings = {
		async: true,
		crossDomain: true,
		url: '/matkad',
		method: 'GET',
		headers: {},
	};

	$.ajax(settings).done(function (response) {
		console.log(response);
		let matk = 0;
		//loeme lehe aadressilt get parameetri matk
		let minuURL = new URL(document.URL);
		matk = minuURL.searchParams.get('matk');
		naitaMatkaAndmeidRegistreerimiseks(matk, response.matkad);
	});
}

function naitaMatkaAndmeidRegistreerimiseks(indeks = 0, matkaAndmed) {
	const matkaKirjeldus = matkaAndmed[indeks];
	const kirjeldusElem = document.querySelector('#matka-kirjeldus');
	const matkaPilt = document.querySelector('#matka-pilt');

	if (!kirjeldusElem) {
		return;
	}

	kirjeldusElem.innerHTML = `
	<h3>${matkaKirjeldus.nimi}</h3>
	<div>${matkaKirjeldus.lyhikirjeldus}</div>
	`;

	matkaPilt.setAttribute('src', matkaKirjeldus.pildiUrl);
}

kysiMatkadJaNaitaRegistreerimist(); // näitame registreerumise lehel matka kirjeldust ja pilti

