	console.log("LOADED");

	Parse.initialize("JYa2rthRq1g5OKVCgXtBUonJhWStISPaPvj72x8n", "w7hrygTyDliHdiSKd88lhEbwCwPqF1e06nR0Ockp");
	
	var Event = Parse.Object.extend("Event");
	var eventsList;	
	var hashPass = "|oe)j_8WHDY,#TU4x+LalG";
	
	function checkSession()
	{
		var user = Parse.User.current();
		var content;
		if (user)  // logged in
		{
			content = "<nav class='navbar navbar-transparent'>";
      content += "<div class='navbar-header'>";
      content += "<button type='button' class='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar' aria-expanded='false' aria-controls='navbar'>";
      content += "<span class='glyphicon glyphicon-menu-hamburger'></span>";
      content += "</button>";
      content += "<a class='navbar-brand' href='index.html'><span class='logo1 link'>Help</span><span class='logo2'>Out!</span></a>";
      content += "</div>";
      content += "<div id='navbar' class='collapse navbar-collapse'>";
      content += "<ul class='nav navbar-nav navbar-right'>";
      content += "<li><a href='signedinsplash.html' style=''>Browse Events</a></li>";
			
			var currentUser = Parse.User.current();
			if(currentUser.get('user_type')=="org")
				content += "<li id='events'><a href='org-landing.html' style=''>My Events</a></li>";
      else
      	content += "<li id='events'><a href='events.html' style=''>My Events</a></li>";
		
			
			content += "<li><a id='logout' onClick='logOut()' href='#'>Sign Out</a></li>";
      content += "</ul>";
      content += "</div><!--/.nav-collapse -->"
      content += "</nav>";
			
			if(user.user_type == "org")
			{
				document.getElementById("events").innerHTML = "<a href='org-landing.html' style=''>My Events</a>";
			}
			
			document.getElementById("toolbar").innerHTML = content;
		} else {
			
			var strVar="";
strVar += "<nav class=\"navbar navbar-transparent\">";
strVar += "        <div class=\"navbar-header\">";
strVar += "          <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">";
strVar += "            <span class=\"glyphicon glyphicon-menu-hamburger\"><\/span>";
strVar += "          <\/button>";
strVar += "          <a class=\"navbar-brand\" href=\"index.html\"><span class=\"logo1 link\">Help<\/span><span class=\"logo2\">Out!<\/span><\/a>";
strVar += "        <\/div>";
strVar += "        <div id=\"navbar\" class=\"collapse navbar-collapse\">";
strVar += "          <ul class=\"nav navbar-nav navbar-right\">";
strVar += "            <li><a href=\"#\" style=\"\">View Events<\/a><\/li>";
strVar += "            <li><p class=\"navbar-btn\"><a class=\"btn btn-default\" href=\"signin.html\">Sign in<\/a><\/p><\/li>";
strVar += "          <\/ul>";
strVar += "        <\/div>";
strVar += "      <\/nav>";

			
			document.getElementById("toolbar").innerHTML = strVar;
      		
		}
	}
	
	$("#signup").submit(function(event) { // needs form to have id signup_student and to have jquery, like src links above 
		event.preventDefault();
		
		console.log("TESTING");
		
		var firstName = $("#first_name").val();
		var lastName = $("#last_name").val();
		var email = $("#user_email").val();
		var password = $("#user_password").val();
		var userType = $("#dropthebass").val();
		
		

		var user = new Parse.User();
			
		//var encrypted = CryptoJS.AES.encrypt(password, hashPass); 
			
		user.set("username", email);
		user.set("password", password); //change to encrypted
		user.set("name1", firstName);
		user.set("name2", lastName);
		user.set("user_email", email);
		
		if (userType == "I'm an organization!")
		{
			user.set("user_type", "org");
		} else {
			user.set("user_type", "student");
		}

		user.setACL(new Parse.ACL(user.id));
			
		user.signUp(null, {
			success: function(user) {
				

				if (userType == "I'm an organization!")
				{
					window.location="org-landing.html";
				} else {
					window.location="signedinsplash.html";
				}
				
        
			
			}, error: function(user, error) {
					console.log("signup error:" + error.message);
				}
			});
			
		});
		
		$("#login").submit(function(event){
			event.preventDefault();
			
			var name = $("#login_username").val();
			var pass = $("#login_password").val();
			
			Parse.User.logIn(name, pass, {
				success: function(user){
					console.log("Login success");
					var currentUser = Parse.User.current();
					if(currentUser.get('user_type')=="org")
                window.location="org-landing.html";
            else
                window.location="signedinsplash.html";
				}, error: function(user, error){
					console.log("Log in error:" + error.message);
				}
			});
			
		});
		
		function logOut()
		{
			Parse.User.logOut();
			document.location.href = "index.html";
		}
		
		$("#logout").click(function(event){
			console.log("Log out initiated");
			Parse.User.logOut();
		});
		
		
		
		function Address(street1, street2, city, state, zip, country)
		{
			this.street1 = street1;
			this.street2 = street2;
			this.city = city;
			this.state = state;
			this.zip = zip;
			this.country = country;
		} // new add("..","..","..","..");
		
		function limitText(limitField, limitCount, limitNum) {
			if (limitField.value.length > limitNum) {
				limitField.value = limitField.value.substring(0, limitNum);
			} else {
				limitCount.value = limitNum - limitField.value.length;
			}
		}
		
		/*
		var add = new Address("5510 Liverpool ct", "null", "oak park", "ca", "91377", "US");
		var name = "Test Event";		
		
		var event = new Event();
		
		event.set("address", add);
		event.set("title", name);
		event.setACL(new Parse.ACL(Parse.User.current(), id));
		

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
		*/
		
		
		
		// take results from a query (array of Parse Objects [in this case events]) and generate tiles in specified element
		function generateEventTiles(results, inID)
		{
			var mainDiv = document.getElementById(inID);
			//var temporaryTextNode = document.createTextNode("Title");
						
			for (var i = 0; i < results.length; i++)
			{
				console.log(results.length);
				//var mainDiv = document.createElement("div")
				//mainDiv.className = "col-sm-4 cards";
				//document.getElementById(inID).appendChild(mainDiv);

			  var startDate = results[i].get("start_date");
				var endDate = results[i].get("end_date");
				
				if (startDate && endDate) {
				var month = startDate.getMonth();
				var day = startDate.getDay();
				var year = startDate.getFullYear();
				
				var startAmpm;
				var startHour = startDate.getHours();
				var startMinutes = startDate.getMinutes();
				
				var endAmpm;
				var endHour = endDate.getHours();
				var endMinutes = endDate.getMinutes();
				} else {
					
				}
				/*
				if (startHour > 12)
				{
					startAmpm = "PM";
					startHour = startHour % 12;
				} else {
					startAmpm = "AM";
				}
				
				if (endHour > 12)
				{
					endAmpm = "PM";
					endHour = startHour % 12;
				} else {
					endAmpm = "AM";
				}
				*/
				
				var title = "Default";
				var tag = "Default";
				var address = "Default";
				
				if (results[i].get("title"))
					title = results[i].get("title");

				if (results[i].get("tag"))
					title = results[i].get("tag");
				if (results[i].get("address").city)
					address = results[i].get("address").city;
				
				var content = "<div class='col-sm-4 cards'>";
				content += "<div class='tile'>"
				content += "<div class = 'title'>" + "<h3>" + title + "</h3></div>";
				content += "<div class = 'tag'>" + tag + "</div>";
				content += "<div class = 'address'>" + address + "</div>";
				content += "<div class = 'time_span'>" + startHour + ":" + startMinutes + " - " + endHour + ":" + endMinutes + "</div>";			
				content += "<div class = 'date'>" + month + "/" + day + "/" + year + "</div>";	
				content += "<div class='text-center'>";
				if(inID != "tiles_events")
				{
				content += "<button class='btn btn-default btn-small btn-center' onClick='joinEvent(this)' id=" + i + ">Join</button>";
				}

				content += "</div></div>";
				mainDiv.innerHTML += content;
			}
			
		}
		
		function joinEvent(object)
		{ //rely on global eventsList!
			var event = eventsList[object.id];
    	var relation = Parse.User.current().relation("userEvents");
    	relation.add(event);
    	Parse.User.current().save();
  			
		} 
		
		function getAllEvents(inId)
		{
			var query = new Parse.Query(Event);

    	query.find({
      success: function(results) {
        console.log("Successfully retrieved " + results.length);
        // Do something with the returned Parse.Object values.
        console.log("Result" + results);
				
				eventsList = results;
				generateEventTiles(results, inId);
				
					
        

      },
      error: function(error) {
        console.log("Error: " + error.code + " " + error.message);
      }
    });
		
    
		} // function getAllEvents
		
		
		//gets all events they are an owner of
		function getMyEvents(inID)
		{
			var query = new Parse.Query(Event);
			query.equalTo("event_owner", Parse.User.current().id);
    	query.find({
      success: function(results) {
        console.log("Successfully retrieved " + results.length);
        // Do something with the returned Parse.Object values.
        console.log("Result" + results);
				
				eventsList = results;
				generateEventTiles(results, inID);
				
      },
      error: function(error) {
        console.log("Error: " + error.code + " " + error.message);
      }
    });
		
    
		}
		
		
		// all events a user is attending
		function getVolunteerEvents(inId)
		{

			
			var user = Parse.User.current();
			var relation = user.relation("userEvents");
			var query = relation.query();

    	query.find({
      success: function(results) {
        console.log("Successfully retrieved " + results.length);
        // Do something with the returned Parse.Object values.
        console.log("Result" + results);
				
				eventsList = results;
				generateEventTiles(results, inId);
				
      },
      error: function(error) {
        console.log("Error: " + error.code + " " + error.message);
      }
    });
		
    
		}
		
		// get all users attending an event
		function getVolunteersForEvent()
		{

				var query_event = new Parse.Query(Event);
				query_event.equalTo("objectId", "QA6bKOfEeF")
				var event;
				query_event.find({
					success: function(results) {
						//console.log("Successfully retrieved " + results.length);
						// Do something with the returned Parse.Object values.
						
						event = results[0];
						console.log(event.id);
					}
    			});
					
					
					var query = new Parse.Query("User");
					query.equalTo("userEvents", event);
					
    	query.find({
      success: function(results) {
        console.log("Successfully retrieved " + results.length);
        // Do something with the returned Parse.Object values.
        console.log("Result" + results);
				
				eventsList = results;
				//generateEventTiles(results, "myEventTiles");
				
      },
      error: function(error) {
        console.log("Error: " + error.code + " " + error.message);
      }
    });
		
    
		}
		
		
		/*
		var new_email = "newemail@update.com";

    var Student = Parse.Object.extend("Student");
    var query = new Parse.Query(Student);
    query.equalTo("user_email", "test@gmail.com");

    // Query array of object
    var array_users = [];
    query.find({
      success: function(results) {
        console.log("Successfully retrieved " + results.length);
        // Do something with the returned Parse.Object values.
        console.log("Result" + results);
        for (var i = 0; i < results.length; i++) 
        {
          var object = results[i];
          console.log(object.id + ' - ' + object.get('user_email'));

          array_users.push(object);
        }

        if (array_users.length == 1)
        {
            
            // Update
            array_users[0].save(null, {
              success: function(stud) {
                // Now let's update it with some new data. In this case, only cheatMode and score
                // will get sent to the cloud. playerName hasn't changed.
                array_users[0].set("user_email", new_email);
                array_users[0].save();
              }
            });
            
            // Delete
            array_users[0].destroy({
                success: function(myObject) {
                console.log("Deleted!");
                },
                error: function(myObject, error) {
                // The delete failed.
                // error is a Parse.Error with an error code and message.
                }
            });
        }//if
        

      },
      error: function(error) {
        console.log("Error: " + error.code + " " + error.message);
      }
    });
		*/
		
		
		
		



		
		
