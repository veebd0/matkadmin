var settings = {
	async: true,
	crossDomain: true,
	url: '/matkad',
	method: 'GET',
	headers: {},
};

$.ajax(settings).done(function (response) {
	console.log(response);
});
