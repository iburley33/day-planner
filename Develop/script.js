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
    var blockX = divs[i];
    var hourArr = $(blockX).attr("id").split("-");
    var hourX = parseInt(hourArr[1]);
    if(hourX < time){
      $(blockX).removeClass("present future")
      $(blockX).addClass("past")
    } if(hourX == time){
      $(blockX).removeClass("past future")
      $(blockX).addClass("present")
    } if (hourX > time){
      $(blockX).removeClass("present past")
      $(blockX).addClass("future")
    };
    $(blockX).children()[1].innerText= textCont;
  }}); 
  
saveBtn.on('click', function() {
  var idArr = $(this).parent().attr('id').split('-');
  var newIndex = idArr[1] - 9;
  var hourPlan = {
    hour: $(this).parent().attr('id'),
    plan: $(this).prev()[0].value
  };
  plans.splice(newIndex, 1, hourPlan)
  localStorage.setItem("plannerContent", JSON.stringify(plans))
});
