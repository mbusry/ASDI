/**
 * Michael Usry, ASDI 1305
 */

// Global variables

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
	listClass();
		var key = $(this).attr('data-key');
		console.log("In the #list page to edit a record with a key of " + key);
                console.log("variables of className/currentDate/fname/lname/phoneNumber" + className + "/" + currentDate + "/" + fname + "/" + lname + "/" + phoneNumber);

	$("#editPeopleButton").click(function() {
		window.location.assign('#addAttendant');
		$('#addForm')[0].reset();
                
		var key = $(this).attr('data-key');
		var value = localStorage.getItem(key);
		//var editThis = JSON.parse(value);
		console.log("In the #list page to edit a record with a key of " + key);
		$('select option[value=blank]').attr('selected', false);
		$('select option[value=' + className + ']').attr('selected', true);
		$('#currentDate').attr('value', currentDate);
		$('#fname').attr('value', fname);
		$('#lname').attr('value', editThis.lname);
		$('#phoneNumber').attr('value', editThis.phoneNumber);
                console.log("Back in #list.on looking at key: " + key);

		return key;
	});

	$("#DeletePeopleButton").click(function() {
		var key = this.key, rev = this.rev;
		$.couch.db.removeDoc({
			_id : key,
			_rev : rev
		})
	});
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
	
		$.couch.db('itrax').view('itrax/all', {
		success : function(data, status) {
			$.each(data.rows, function(index, item) {
				var key = item.id;
                                //var rev = item.rev;
                                var className = item.value.className;
                                var currentDate = item.value.currentDate;
                                var fname = item.value.fname;
                                var lname = item.value.lname;
                                var phoneNumber = item.value.phoneNumber;
                                //console.log("rev = " + rev);
				$('#listPeople').append('<ul>');
				$('#listPeople').append('<li><h3>' +    className);
				$('#listPeople').append('<li>' +    currentDate);
				$('#listPeople').append('<li>' +    fname + " " +    lname);
				$('#listPeople').append('<li>' +    phoneNumber);
				$('#listPeople').append('<input type="button" value="Edit" id = "editPeopleButton" data-key = ' + key + ' data-theme = "a" />');
				$('#listPeople').append('</br>');
				$('#listPeople').append('<input type="button" value="Delete" id = "DeletePeopleButton" data-key = ' + key + ' data-theme = "a" />');
				$('#listPeople').append('</div');
				$('#listPeople').append('<p>');

			});
		}
	});
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
        $.couch.db.saveDoc()
        
        
	// Looking to see if there is a key
	if (!key) {
		var uniqueKey;
	} else {
		// If there is a key id=key
		uniqueKey = key;
		//uniqueRev = rev;
	}
	
	//************* DO THE SAVE *****************
	//*******************************************
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

}

;
// make Links
function Links(key) {

	console.log("In editLinks functions");
	console.log("Key received from editLinks:" + key);
	makeEditLink(key);
}

;
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
	}
	;
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
}

;
// loadData
function loadData() {
	$('#listPeople').empty();
	$.couch.db('asdi').view('itrax/prek');


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
}

;
function deletePerson(key, rev) {
	console.log(key, rev);
	var ask = confirm("Are you sure you want to delete this?");
	if (ask) {
		//localStorage.removeItem(key);

		$.couch.db.removeDoc(key, rev);
		alert("It was deleted");
		window.location.reload();
	}
	alert("You didn't delete it.");
}

;
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

