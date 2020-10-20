var settings = {
	async: true,
	crossDomain: true,
	url: '/registreerumised',
	method: 'GET',
	headers: {},
};

$.ajax(settings).done(function (response) {
	console.log(response);
});
