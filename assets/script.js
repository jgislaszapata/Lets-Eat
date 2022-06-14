$("#searchBtn").click(function(findResturants) {

const encodedParams = new URLSearchParams();
encodedParams.append("language", "en_US");
encodedParams.append("limit", "30");
encodedParams.append("location_id", "297704");
encodedParams.append("currency", "USD");

const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': 'dbb930ff0emsh649dcb8a3228950p19ae08jsn5b7d964da6d1',
		'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com'
	},
	body: encodedParams
};

fetch('https://worldwide-restaurants.p.rapidapi.com/search', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

});