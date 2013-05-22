/**
 * Michael Usry, ASDI 1305
 */

// Global variables
var globalkey;

$('#home').on('pageinit', function() {
	//code needed for home page goes here

});

$('#addAttendant').on('pageinit', function() {

	var myForm = $('#addForm');
	myForm.validate({
		invalidHandler : function(form, validator) {
		},
		submitHandler : function() {
			var data = myForm.serializeArray();
			saveData(data);
		}
	});

	//any other code needed for addItem page goes here

});

$('#list').on('pageinit', function() {
	//code needed for list page goes here
	loadData();
	// listClass();
	// $("#editPeopleButton").click(function() {
		// window.location.assign('#addAttendant')
		// $('#addForm')[0].reset()
		// var key = $(this).attr('data-key');
		// var value = localStorage.getItem(key);
		// var editThis = JSON.parse(value);
		// console.log("In the #list page to edit a record with a key of " + key);
		// $('select option[value=blank]').attr('selected', false);
		// $('select option[value=' + editThis.className[1] + ']').attr('selected', true);
		// $('#currentDate').attr('value', editThis.currentDate[1]);
		// $('#fname').attr('value', editThis.fname[1]);
		// $('#lname').attr('value', editThis.lname[1]);
		// $('#phoneNumber').attr('value', editThis.phoneNumber[1]);
		// return key;

	// });
	// $("#DeletePeopleButton").click(function() {
		// var key = $(this).attr('data-key');
		// deletePerson(key);
		// // key = this.key;
		// // alert("I just click the delete button.   The key is: " + key);
	// });

	// extra code goes here
});

$('#edit').on('pageinit', function() {
	//code needed for list page goes here
	testClass("edit");
	// extra code goes here
});

//

var testClass = function(x) {
	console.log("Entering testClass from: " + x);
};

// listClass: list each object from localStorage

var listClass = function() {
	console.log("Number of items in localStorage are: " + localStorage.length);
	if (localStorage.length === 0) {
		console.log("no localstorage");
		alert("There is nothing here.  Please add someone.");
	}
	for (var i = 0, len = localStorage.length; i < len; i++) {
		var key = localStorage.key(i);

		var value = localStorage.getItem(key);
		var obj = JSON.parse(value);

		// $('#listPeople').append('<div id = "' + key + '">')
		$('#listPeople').append('<li>' + obj.className[1] + '</li>');
		$('#listPeople').append('<li>' + obj.currentDate[1] + '</li>');
		$('#listPeople').append('<li>' + obj.fname[1] + '</li>');
		$('#listPeople').append('<li>' + obj.lname[1] + '</li>');
		$('#listPeople').append('<li>' + obj.phoneNumber[1] + '</li>');
		$('#listPeople').append('<input type="button" value="Edit" id = "editPeopleButton" data-key = ' + key + ' data-theme = "a" />');
		$('#listPeople').append('</br>');
		$('#listPeople').append('<input type="button" value="Delete" id = "DeletePeopleButton" data-key = ' + key + ' data-theme = "a" />');
		$('#listPeople').append('</div');
		$('#listPeople').append('<p>');
		console.log("Key is = " + key);
		console.log("loop variables: i: " + i + " len: " + len + " key: " + key + " value: " + value);
		alert("The end of loop number: " + i);

	}
};

// edit class record with key received from listClass

var editClass = function() {
	console.log("Contents of localStorage: " + localStorage);
	if (localStorage.length === 0) {
		console.log("no localstorage");
		alert("There is nothing here.  Please add someone.");
	}
	for (var i = 0, len = localStorage.length; i < len; i++) {
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var obj = JSON.parse(value);
		console.log(obj);

		$('#editPeople').append('<ul><li><h2>' + obj.className[1] + '</h2></li>');
		$('#editPeople').append('<li><h3>' + obj.currentDate[1] + '</h3></li>');
		$('#editPeople').append('<li>' + obj.fname[1] + '</li>');
		$('#editPeople').append('<li>' + obj.lname[1] + '</li>');
		$('#editPeople').append('<li>' + obj.phoneNumber[1] + '</li>');
		console.log("Key sent to editLinks:" + key);

		Links(key);
	}
};

// saveData from the input with the key sent to it.  If there is not key received one is created.

function saveData(key) {
	testClass("saveData");
	console.log("Entering saveData with a key of " + key);

	// Looking to see if there is a key
	if (!key) {
		var uniqueKey = Math.floor(Math.random() * 100000001);
	} else {
		// If there is a key id=key
		uniqueKey = key;
	}
	console.log("The setting/testing of the key " + uniqueKey);

	//Collect data in an object with label and
	var person = {};
	person.className = ["Class Names:", $("#className").val()];
	person.currentDate = ["Today's Date:", $("#currentDate").val()];
	person.fname = ["First Name:", $("#fname").val()];
	person.lname = ["Last Name:", $("#lname").val()];
	person.phoneNumber = ["Phone Number:", $("#phoneNumber").val()];
	// console.log(person.className);
	// console.log(person.currentDate);
	// console.log(person.fname);
	// console.log(person.lname);
	// console.log(person.phoneNumber);
	//Saving object to a string using Stringify
	localStorage.setItem(uniqueKey, JSON.stringify(person));
	alert(person.fname + " has been saved.");

	// ********************************** old ***************************

};

// make Links
function Links(key) {

	console.log("In editLinks functions");
	console.log("Key received from editLinks:" + key);

	makeEditLink(key);
	// $('#listPeople').append('<input type="button" value="Edit" id = "editPeopleButton" data-theme = "a" />');
	// $('#listPeople').append('</br>');
	// $('#listPeople').append('<input type="button" value="Delete" id = "DeletePeopleButton" data-theme = "a" />');
	// $('#listPeople').append('<a href="#edit" id="editClassButton">Edit</a>');
	// var linksLi = document.createElement("li");
	// var editLink = document.createElement('a');
	// editLink.href = "#";
	// editLink.key = key;
	// var editText = "Edit";
	// editLink.addEventListener("click", editGroceries);
	// editLink.innerHTML = editText;
	// linksLi.appendChild(editLink);
	// console.log("This is from editlinks:" + linksLi.appendChild(editLink));
	// this section will add a br tag to seperate the links for edit and delete groceries
	// var breakTag = document.createElement('br');
	// linksLi.appendChild(breakTag);

	// delete link
	// var deleteLink = document.createElement('a');
	// deleteLink.href = "#";
	// deleteLink.key = key;
	// var deleteText = "Delete";
	// deleteLink.innerHTML = deleteText;
	// will delete the grocerlist item
	// deleteLink.addEventListener("click", deleteGroceries);
	// linksLi.appendChild(deleteLink);
};

// validate function for all required fields
function validate(e) {

	// Elements we want to validate
	var getNotes = getID('notes');

	// reset error message (errTxt)
	errTxt.innerHTML = "";
	getNotes.style.border = "1px solid gray";

	// Error Message(s)
	var errMsgArry = [];
	if (getNotes.value === "") {
		var notesError = "Please provide your instructions.";
		getNotes.style.border = "1px solid red";
		errMsgArry.push(notesError);
	};
	// If errors, show on the screen we pass the errMsgArry
	// to the html id=errTxt
	if (errMsgArry.length >= 1) {
		for (var i = 0, n = errMsgArry.length; i < n; i++) {
			var txt = document.createElement('li');
			txt.innerHTML = errMsgArry[i];
			errTxt.appendChild(txt);
		}
		e.preventDefault();
		return false;
	} else {
		// Save if no errors
		// .key comes from editGroceries as
		saveData(this.key);
	}
};

// loadData
function loadData() {
	$('#listPeople').empty();
	// loading from json.js
	// relative file according to html
	$(function() {
		$('#list').empty();
		$.ajax({
			url : 'xhr/json.js',
			type : 'GET',
			dataType : 'json',
			success : function(data) {
				console.log(data.people[0].className);
				for(var i=0, len=data.people.length; i<len; i++){
					var people = data.people[i];
					$(''+
						'<div class = "listPeople">' +
						'<h2>'+people.className[1]+'</h2>' +
						'<p>'+people.currentDate[1]+'</p>' +
						'<p>'+people.fname[1]+" "+ people.lname[1]+'</p>' +
						'<p>'+people.phoneNumber[1]+'</p>' +
						'</div>'
				).appendTo('#list');
				};
			}
		});
	});
};

// clear local storage function
function clearLocal() {
	console.log("In clearLocal");
	if (localStorage.length === 0) {
		alert("There is no data to clear.");
	} else {
		localStorage.clear();
		alert("All items have been removed.");
		window.location.reload();
		return false;
	}
};

// makeEditLink

// function makeEditLink(key) {
// console.log("in makeEditLink");
//
// ce = $('#listPeople').append('<li>');
//
// //ce = document.createElement("li");
// editLink = $('#listPeople').append('<a>');
// //var editLink = document.createElement('a');
// editLink.href = "#";
// editLink.key = key;
// var editText = "Edit";
// editLink.addEventListener("click", editClass);
// editLink.innerHTML = editText;
// ce.appendChild(editLink);
//
// // this section will add a br tag to seperate the links for edit and delete groceries
// var breakTag = document.createElement('br');
// ce.appendChild(breakTag);
//
// // delete link
// var deleteLink = document.createElement('a');
// deleteLink.href = "#";
// deleteLink.key = key;
// var deleteText = "Delete ";
// deleteLink.innerHTML = deleteText;
// // will delete the grocerlist item
// deleteLink.addEventListener("click", deletePerson);
// ce.appendChild(deleteLink);
// };

// deletePerson function

function deletePerson(key) {
	console.log(key);
	var ask = confirm("Are you sure you want to delete this?");
	if (ask) {
		localStorage.removeItem(key);
		alert("It was deleted");
		window.location.reload();
	}
	alert("You didn't delete it.");

};

// button clicks

// $("button id").click(function() {
//	functionToGoTo();
// });

$("#saveData").click(function() {
	saveData();
});

$("#clearData").click(function() {
	clearLocal();
});

$("#listSavedData").click(function() {
	location.reload();

	listClass();
});

