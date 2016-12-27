
$( document ).ready(function() {
    console.log( "ready!" );
    $("#slide").hide();

    $(".fadein").animate({
      opacity: '1',
      paddingTop: '20px'
    }, 900)
  $( "#showAddEventDiv" ).click(function() {
  $( "#slide" ).slideToggle( "swing", function() {
    // Animation complete.
  });
});
});



