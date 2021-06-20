const requestURL = 'https://api.tachyon-analytics.com/predict/';

function sendRequest(method, url, body) {
	const headers = {
		'Content-Type': 'Access-Control-Allow-Origin',
	};
	return fetch(url,
		{
			method,
			body,
			headers,
		}).then((response) => {
		if (response.ok) {
			return response.json();
		}
		return response.json().then((error) => {
			const err = new Error();
			err.data = error;
			throw err;
		});
	});
}

// const dataObj = {
// 	name: 'testt',
// 	desc: '123',
// };

// sendRequest('POST', requestURL, JSON.stringify(dataObj))
// 	.then((data) => console.log(data))
// 	.catch((err) => console.log(err));

const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const formData = new FormData(form);
	const values = Object.fromEntries(formData.entries());
	sendRequest('POST', requestURL, JSON.stringify(values))
		.then((data) => console.log(data))
		.catch((err) => console.log(err));

	sendRequest('GET', requestURL, null)
		.then((data) => console.log(data))
		.catch((err) => console.log(err));
});
// const form = document.getElementById('form');
// form.addEventListener('submit', (e) => {
// 	e.preventDefault();
// 	const formData = new FormData(this);
// 	console.log('formData');
// });
