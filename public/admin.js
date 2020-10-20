function naitaRegistreerumist(andmed, matkad) {
	if (!matkad[andmed.index]) {
		return '';
	}

		return `
	<div class ="col-sm-6 cl-lg-3">
		<p>Matk: ${matkad[andmed.index].nimi}</p>
		<p>Nimi: ${andmed.nimi}</p>
		<p>Email: ${andmed.email}</p>
	</div>
	`;
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
		kysiRegistreerimised(response.matkad);
	});
}

function kysiRegistreerimised(matkad) {
	var settings = {
		async: true,
		crossDomain: true,
		url: '/registreerumised',
		method: 'GET',
		headers: {},
	};

	$.ajax(settings).done(function (response) {
		console.log(response);
		const andmedHtml = document.querySelector('#koik-andmed');
		let sisu = '';
		for (let i=0; i < response.length; i++) {
			sisu += naitaRegistreerumist(response[i], matkad);
		}
		andmedHtml.innerHTML = sisu;
	});
}

kysiMatkad();
