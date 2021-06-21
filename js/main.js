const requestURL = 'https://api.tachyon-analytics.com/predict/';
const imgWrapper = document.getElementById('img-wrapper');
const popup = document.querySelector('.popup');
const mainBtn = document.querySelector('.main-btn');
const form = document.getElementById('form');
const formWrapper = document.querySelector('.form-wrapper');

mainBtn.addEventListener('click', () => {
	formWrapper.classList.toggle('__active');
	popup.classList.toggle('__active');
});
popup.addEventListener('click', (e) => {
	e.stopPropagation();
	formWrapper.classList.remove('__active');
	popup.classList.remove('__active');
	imgWrapper.innerHTML = '';
	form.reset();
});
formWrapper.addEventListener('click', (e) => {
	e.stopPropagation();
});

function sendRequest(method, url, body) {
	return fetch(url, { method, body }).then((response) => {
		if (response.ok) {
			return response.json().then((text) => {
				formWrapper.classList.remove('__active');
				imgWrapper.innerHTML = `<img src="https://api.tachyon-analytics.com/predict/${text.url}" alt="graph" id="imgDiv" onclick="event.stopPropagation()"></img>`;
			});
		}
		return response.text().then((error) => {
			const err = new Error();
			err.data = error;
			throw err;
		});
	});
}

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const formData = new FormData(form);
	sendRequest('POST', requestURL, formData)
		.then((data) => console.log(data))
		.catch((err) => console.log(err));
});
