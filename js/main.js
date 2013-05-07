/**
 * @author Michael
 */


$('#main').on('pageinit', function(){
	//code needed for home page goes here
});	
		
$('#add').on('pageinit', function(){

		var myForm = $('#firstForm');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var data = myForm.serializeArray();
			saveData(data);
		}
	});
	
	
});

    // Global variables
    var     groceryItemValue;

// getElementById
    function getID(x){
        var elementID = document.getElementById(x);
        return elementID;
    };
    

    
