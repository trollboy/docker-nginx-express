var express = require('express');
var cookieParser = require('cookie-parser');
var dateFormat = require('dateformat');

var app = express();
app.use(cookieParser());

function getCookies(request){
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}


var port = process.argv[2] || 3000;

app.get('/', function (req, res) {
	
	var cookies = getCookies(req);

	var mydate =  dateFormat(new Date(), 'yyyy-mm-dd HH\:MM\:ss\:l');
	
	var response = 
		'<h1>Welcome to my project!</h1>' +
		'<p>Hello World, I am Two!<br> I am running on ' + process.env.INSTANCE + '</p>' +
		'<fieldset> ' +
		'<legend>Links</legend> ' +
		'<ul>' +
			'<li><a href="/">Home</a></li>' +
			'<li><a href="/section1">Section 1</a></li>' +
			'<li><a href="/section2">Section 2</a></li>' +
		'</ul>' +
		'</fieldset>' +
		'<fieldset> ' +
		'<legend>Cookies</legend> ' +
		'<ul>'; 
	    for (var prop in req.cookies) {
	        // skip loop if the property is from prototype
	        if(!cookies.hasOwnProperty(prop)) continue;
			response += '<li><strong>' + prop + ':</strong> ' +  decodeURIComponent( cookies[prop] ) + '</li>';
	    } 
		response += '</ul>' +
		'</fieldset>';

	res.cookie('Service-' + process.env.INSTANCE, mydate).send(response); //Sets name = express

});

app.listen(port, function () {
	console.log('Example app listening on port ' + port + '!');
});