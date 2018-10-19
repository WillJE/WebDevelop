// add listener to the form
document.getElementById('myForm').addEventListener('submit', saveBookMarker);

function saveBookMarker(e){
	// console.log('It works!');
	var siteName = document.getElementById('siteName').value;
	var siteURL = document.getElementById('siteURL').value;
	var bookmarker = {
		Name: siteName,
		URL: siteURL
	}

	if (!validateForm(siteName, siteURL)) {
		return false;
	}
	// localStorage.removeItem('1');
	// console.log(bookmarker)

	if (localStorage.getItem('bookmarkers') == null) {
		console.log('bookmarkers is null')
		var bookmarkers = [];
		bookmarkers.push(bookmarker);
		localStorage.setItem('bookmarkers', JSON.stringify(bookmarkers));
	}else{
		var bookmarkers = JSON.parse(localStorage.getItem('bookmarkers'));
		bookmarkers.push(bookmarker);
		localStorage.setItem('bookmarkers', JSON.stringify(bookmarkers))
	}
	fetchBookmarks();
	var myForm = document.getElementById('myForm').reset();
	e.preventDefault();
}
// if(window.localStorage){
//  alert('This browser supports localStorage');
// }else{
//  alert('This browser does NOT support localStorage');
// }

function fetchBookmarks(){
	var bookmarksResult = document.getElementById('bookmarksResult');
	var bookmarkers = JSON.parse(localStorage.getItem('bookmarkers'));
	bookmarksResult.innerHTML = '';
	for (var i = 0; i < bookmarkers.length; i++) {
		var name = bookmarkers[i].Name;
		var url = bookmarkers[i].URL;

		bookmarksResult.innerHTML += '<div class="well"> '+
		                               '<h3>'+name+''+
		                               '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> '+
		                               '<a class="btn btn-danger" href="#" onclick="deleteBookmark(\''+url+'\')">Delete</a> '+
		                               '</h3>'
		                               '</div>';
	}

}

function deleteBookmark(url){
	var bookmarkers = JSON.parse(localStorage.getItem('bookmarkers'));
	for (var i = 0; i < bookmarkers.length; i++) {
		if (bookmarkers[i].URL == url) {
			bookmarkers.splice(i, 1);
		}
	}
	localStorage.setItem('bookmarkers', JSON.stringify(bookmarkers))
	fetchBookmarks()
}

function validateForm(siteName, siteURL){
	if (!siteName || !siteURL) {
		alert('please fill into the form!');
		return false;
	}
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);
	if (!siteURL.match(regex)) {
		alert('url is not format!');
		return false;
	}
	return true;
}
