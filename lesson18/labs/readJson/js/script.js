// chrome.exe --allow-file-access-from-files
console.log('heel');

$('#btn').click(function(event){



	var data = $('#data').val();
	console.log(data);

	$.getJSON(data, function(json, textStatus, jqXHR){
		$('#result').append('<p>This is the result:</p>');

		for (var i = 0; i < json.length ; i++) {
			$('#result').append('<p>name: ' + json[i].name + '</p>');
			$('#result').append('<p>name: ' + json[i].color + '</p>');
			$('#result').append('<p>name: ' + json[i].origin + '</p>');
		}
	})
});