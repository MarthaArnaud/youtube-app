const API_KEY = "AIzaSyCiKPA9zZfe56fsvD85jPUO7y9ykBdR97k";
let previous;
let actualPage = " ";
let next;


function fetchVideos(searchTerm){
	let url = `https://www.googleapis.com/youtube/v3/search?&part=snippet&key=${API_KEY}&q=${searchTerm}&maxResults=10&type=video&pageToken=${actualPage}`
	let settings={
		method: 'GET'
	};
	console.log(url);
	fetch(url,settings)
		.then(response=>{
			if(response.ok){
				return response.json();
			}
			throw new Error(response.statusText);
		})
		.then (responseJSON=>{
			displayResults(responseJSON);
			nextPage(responseJSON);
			previousPage(responseJSON);

		})
		.catch(err=>{
			console.log(err);
		});

}


function displayResults(data){
	let results = document.querySelector('.results');
	results.innerHTML=" ";
	actualPage = data.etag;
	for ( let i = 0;  i < data.items.length; i++){
        results.innerHTML += `
        <div>
        <a href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}" target="_blank"> ${data.items[i].snippet.title} </a><br><br>
        <a href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}" target="_blank">
        <img src="${data.items[i].snippet.thumbnails.high.url}"/>
        </a>
        </div>
        `
        
    }
}


function previousPage(data) {
    let results = document.querySelector('.results');
    previous = data.prevPageToken;
    results.innerHTML = "";
    for ( let i = 0;  i < data.items.length; i++){
        results.innerHTML += `
         <div>
        <a href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}" target="_blank"> ${data.items[i].snippet.title} </a><br><br>
        <a href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}" target="_blank">
        <img src="${data.items[i].snippet.thumbnails.high.url}"/>
        </a>
        </div>
        `
    }
}


function nextPage(data) {
    let results = document.querySelector('.results');
    next = data.nextPageToken;
    results.innerHTML = "";
    for ( let i = 0;  i < data.items.length; i++){
        results.innerHTML += `
         <div>
        <a href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}" target="_blank"> ${data.items[i].snippet.title} </a><br><br>
        <a href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}" target="_blank">
        <img src="${data.items[i].snippet.thumbnails.high.url}"/>
        </a>
        </div>
        `
    }
}

function watchForm(){
	let searchButton = document.getElementById('searchButton');
	let previousPage = document.getElementById('previousPage');
	let nextPage = document.getElementById('nextPage');

	searchButton.addEventListener('click', (event)=>{
		event.preventDefault();
		let searchTerm = document.getElementById('searchInput').value;
		fetchVideos(searchTerm);
		searchTerm=" ";
		console.log(searchTerm);
		 document.getElementById("previousPage").style.display = "inline";
		  document.getElementById("nextPage").style.display = "inline";
	});



	nextPage.addEventListener('click', (event) => {
        event.preventDefault();
        actualPage = next;
        searchTerm = document.getElementById('searchInput').value;
        fetchVideos( searchTerm );
    });

	previousPage.addEventListener('click', (event) => {
        event.preventDefault();
        actualPage = previous;
        searchTerm = document.getElementById('searchInput').value;
        fetchVideos( searchTerm );
    });

}


function init(){
	watchForm();
}

init();