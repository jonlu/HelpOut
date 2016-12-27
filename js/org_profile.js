//console.log("LOADED");
window.onload = function(){
    //hide 
    //$("#showAddEventDiv").hide();
    //$("#addEventdiv").hide();
    //$("#joinEventdiv").hide();

    Parse.initialize("JYa2rthRq1g5OKVCgXtBUonJhWStISPaPvj72x8n", "w7hrygTyDliHdiSKd88lhEbwCwPqF1e06nR0Ockp");

    var currentUser = Parse.User.current();
    console.log(currentUser.id + ' - ' + currentUser.get('user_email') + ' ' + currentUser.get('user_type'));

    $("#showAddEventDiv").click(function () {
        $("#addEventdiv").slideToggle( "swing", function() {
    // Animation complete.
         });
    });
    
   
	  function Address(street1, street2, city, state, zip, country)
    {
        this.street1 = street1;
        this.street2 = street2;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.country = country;
    } // ne
};

function Address(street1, street2, city, state, zip, country)
{
    this.street1 = street1;
    this.street2 = street2;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.country = country;
} // new add("..","..","..","..");

$(function(){
    Parse.initialize("JYa2rthRq1g5OKVCgXtBUonJhWStISPaPvj72x8n", "w7hrygTyDliHdiSKd88lhEbwCwPqF1e06nR0Ockp");
    var user = Parse.User.current();

    $("#showAddEventDiv").click(function () {
        if ($("#addEventdiv").is(":hidden"))
        {
            $("#addEventdiv").slideDown("slow");
        }
    });


    $("#joinEventBtn").click(function () {
        var Event = Parse.Object.extend("Event");

        var addr = new Address("5516 Liverpool ct", "null", "oak parking", "CA", "91377", "US");
        var name = "Test Event";		

        var event = new Event();

        event.set("address", addr);
        event.set("name", name);


        event.save(null, {
            success: function(event) {
                // The object was saved successfully.
                var relation = Parse.User.current().relation("userEvents");
                relation.add(event);
                Parse.User.current().save();
            },
            error: function(event, error) {
                // The save failed.
                // error is a Parse.Error with an error code and description.
                console.log(error.message);
            }
        });

    });
    
    
    $("#addEventBtn").click(function () {
    var userID = user.id; 
	  var street1 = $("#address1").val();
	  var street2 = $("#address2").val();
	  var city = $("#city").val();
	  var state = $("#state").val();
	  var zip = $("#zip").val();
	  var country = $("#country").val();
	  var address = new Address(street1, street2, city, state, zip, country);

		var Event = Parse.Object.extend("Event");
		var event = new Event();
		
		var date_start = new Date($("#start-time").val());
		var date_end = new Date($("#end-time").val());
		
		var title = $("#title").val();
		var blurb = $("#blurb").val();
		var description = $("#description").val();
		console.log("start " + date_start);
		console.log("end " + date_end);
		
		event.set("address", address);
		event.set("description", description);
		event.set("start_date", date_start);
		event.set("end_date", date_end);
		event.set("title", title);
		event.set("tag", blurb);
		event.set("event_owner", userID);
		//event.setACL(new Parse.ACL(user.id));


		event.save(null, {
	  		success: function(event) {
	    		// The object was saved successfully.
	    		var relation = Parse.User.current().relation("userEvents");
	    		relation.add(event);
	    		Parse.User.current().save();
	  		},
	  		error: function(event, error) {
	    		// The save failed.
	    		// error is a Parse.Error with an error code and description.
					console.log(error.message);
	  		}
		});

	});
});