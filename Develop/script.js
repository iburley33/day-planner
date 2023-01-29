// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var saveBtn = $('.saveBtn');
var plans = [];
var time = parseInt(dayjs().format('HH'));
var date = dayjs().format('MMM D, YYYY');
var divs = document.querySelectorAll(".row");

$('#currentDay').text(date);

$(function () {
  var entries = JSON.parse(localStorage.getItem("plannerContent"));
  if (entries && entries.length > 0){
    plans = entries
  };
  for(var i = 0;i < divs.length;i++) {
    var textStuff = plans[i];
    var textCont = textStuff?.plan ?? "";
    console.log(textCont)
    var blockX = divs[i];
    var hourArr = $(blockX).attr("id").split("-");
    var hourX = parseInt(hourArr[1]);
    console.log({
      blockX,
      hourArr,
      hourX,
      time
    })
    if(hourX < time){
      $(blockX).removeClass("present future")
      $(blockX).addClass("past")
    } if(hourX == time){
      $(blockX).removeClass("past future")
      $(blockX).addClass("present")
    } if (hourX > time){
      $(blockX).removeClass("present past")
      $(blockX).addClass("future")
      console.log("fucked", hourX, time)
    };
    $(blockX).children()[1].innerText= textCont;
    console.log($(blockX).children()[1])
     //so close just not accessing the numnber in the id. currently changing all to future. 
  }}); 
  // Almost done: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage? (getItem object with hour and plan property)(use a for loop to run through "plans" and if plans.hour ===)
  //
  // So Close: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time? (if hour =<> day js setclass past/present/future)
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // Done: Add code to display the current date in the header of the page.
  
saveBtn.on('click', function() {
  var newArr = [];
  var hourPlan = {
    hour: $(this).parent().attr('id'),
    plan: $(this).prev()[0].value //why is this not working? out of ideas to capture the text. moving on sorry mike. feel like bootstraps effing this up
  };
  newArr.push(hourPlan);
  localStorage.setItem("plannerContent", JSON.stringify(newArr))
});

  

  // to solve
  //need to be able to capture and save content based on the hour itself not the description box (listener for the div that runs conditonal check on target to see if button)

