	// this is a single line comment
	/*
	 * this is a multi-line comment
	 */

	 //Prompt the user for their name and last name. 

var firstName = prompt("What is your first name");
var lastName = prompt("What is your last name");

	//Create a new variable called full name and store the users full name.

var fullName = firstName + " " + lastName;
	
	//Print the full name to the console.
	
console.log(fullName);

	//Prompt the user for their age.
	
var age = prompt("What is your age");

	//Add 10 to the age and print the output to the console.

age = parseInt(age);	
age = age + 10;

console.log(age);

	//Verify that the user is over 18 and print if they are a minor or adult to the console.

if (age < 18) {
	console.log("You are a minor.");
} else {
	console.log("You are an adult.");
}
	
	//Verify if the first name is "General" and the last name is NOT "Assembly"

if ( firstName === "General" && lastName !== "Assembly") {
	console.log("Verified");
} else {
	console.log("Not verified.");
}
