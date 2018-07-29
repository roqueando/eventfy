const Source = new EventSource('/user');

Source.addEventListener('sendTime', result => {

	var el = document.getElementById('put_here');

	console.log(result.data);
})