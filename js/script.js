// var containerDiv = $(".container");
// var table = $("<table>");
// table.attr("class", "table table-responsive time-block");

// var hours = [
// 	"8am",
// 	"9am",
// 	"10am",
// 	"11am",
// 	"12am",
// 	"1pm",
// 	"2pm",
// 	"3pm",
// 	"4pm",
// 	"5pm",
//  "6pm",
//  "7pm",
//  "8pm",
//  "9pm",

// ];

// function createTable() {
// 	table.appendTo(containerDiv);
// 	// the following were all moved into the for loop
// 	// tableRow.appendTo(table);
// 	// hourTD.appendTo(tableRow);
// 	// // hourTD.text(hours[i]);
// 	// textArea.appendTo(tableRow);
// 	// saveTD.appendTo(tableRow);
// 	// icon.appendTo(saveTD);
// }

// createTable();
// for (i = 0; i < hours.length; i++) {
// 	$(".time-block").append(
// 		`<tr class='row'><td class='hour col-md-1'>${hours[i]}</td><td class="col-md textArea"><textarea type="text" id=${hours[i]}></textarea></td><td class='saveBtn btn col-md-1'><i class='far fa-save fa-2x'></td></tr>`
// 	);
// }

// moment(?).isBefore(your current hours var) for past
// moment(?).isAfter(your current hours var) for future
// moment(?).isSame(your current hours var) for present

// function to change bg of textarea's
// how do I set the textarea's to know what the current time is?
// if hour is past, bg should be grayed out, or class of .past
// if hour is current, bg should be red, or class .present
// if hour is future, bg should be green, or class .future

// .click on save buttons to save what is written in the textarea of that row into localStorage
// need to call id of textarea from the matching hour for each button
// need to create different keys for each hour?
// textarea should getItem from localStorage once it has been set

// function bg() {
// 	if ()
// };

// $("#submit").on("click", function(e) {
// 	e.preventDefault();
// 	var mytext = $("#myText").val();
// 	console.log(mytext);
//   });

// var tableRow = $("<tr>");
// tableRow.attr("class", "row");

// var hourTD = $("<td>");
// hourTD.attr("class", "hour");

// var textArea = $("<textarea>");

// var saveTD = $("<td>");
// saveTD.attr("class", "saveBtn");

// var icon = $("<i>");
// icon.attr("class", "far fa-save");

// Abby's code
$(document).ready(function() {
	const m = moment();
	$("#currentDay").html(moment().format("LL"));
	console.log(moment());
	console.log(m.format('LL'));
	
	// var todaysDate = $("#currentDay");
	// todaysDate.text(m.format('LL'));
	// const date = moment();

	var planner = JSON.parse(localStorage.getItem("planner")) || initializePlanner();
	console.log(planner);

	for (var time in planner) {
		console.log(time, planner[time]);
		var tr = $("<tr>")
			// .addClass("row time-block");
		var tdTime = $("<td>")
			.addClass("hour") // col-md-1
			.text(time);
		var tdEvent = $("<td>")
			.addClass("textArea");

		var thisTime;
		
		if (moment(time, "h a").isSame(moment(), "hour")) {
			thisTime = "present";
		} else if (moment(time, "h a").isAfter(moment())) {
			thisTime = "future";
		} else if (moment(time, "h a").isBefore(moment())) {
			thisTime = "past";
		}

		var eventText = $("<textarea>")
			.addClass("description") // col-md
			.addClass(thisTime)
			.attr("data-time", time)
			.val(planner[time]);
		tdEvent.append(eventText);
		// eventText.appentTo(tdEvent);

		var tdSubmit = $("<td>").addClass("saveBtn"); // col-md-1

		var icon = $("<i>").addClass("far fa-save fa-2x");

		tdSubmit.append(icon);
		// icon.appentTo(tdSubmit);

		tr.append(tdTime, tdEvent, tdSubmit);

		$("#myPlanner").append(tr);
		// tr.appentTo($("#myPlanner"));
	}

	function initializePlanner() {
		var tempPlanner = {};

		for (var i = 8; i < 18; i++) {
			// tempPlanner.moment(i, "H").format("h a") = "";
			tempPlanner[moment(i, "H").format("h a")] = "";
		}
		// tempplanner.appendTo($(".container"));
		return tempPlanner;
	}

	$(".saveBtn").on("click", function() {
		$(this).css("color", "#06AE");
		var time = $(this)
			.parent()
			.find(".description")
			.attr("data-time");
		var text = $(this)
			.parent()
			.find(".description")
			.val();
		console.log(time, text);

		planner[time] = text;

		localStorage.setItem("planner", JSON.stringify(planner));
	});
});
