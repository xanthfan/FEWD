	var list = [];
	var food_item;
	var found = false;
	var response = prompt('(a)dd item or (q)uit?');
	while(response === 'a'){
		food_item = prompt('What do you need to add');
		for (var i = 0; i<list.length; i++){
			if(list[i] === food_item ){
				found = true;
				alert('This item is already on the list');
				break;
			}
		}
		if (!found){
			list.push(food_item);
		}
		found = false;
		response = prompt('(a)dd item or (q)uit?');
	}

	// Print the list to the console
	console.log('My Shopping List');
	for (var i=0; i < list.length; i++){
		console.log(list[i]);
	}

	$('h1').hide();

	$('#instruction').hide();

	$('ul').prepend('<h1>My Shopping List</h1>');

	for (var i=0; i < list.length; i++){
		$('#shopping-list').append('<li>' + list[i] + '</li>');
	}
