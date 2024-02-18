// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
   // TODO: Add code to display the current date in the header of the page.
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

  function updateTimeBlocks() {
    const currentHour = dayjs().hour();


     // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
    $(".time-block").each(function () {
      const blockHour = parseInt($(this).attr("id").split("-")[1]);

      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  updateTimeBlocks();
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  $(".container-lg").on("click",".saveBtn", function () {
    const blockId = $(this).parent().attr("id");
    const eventDescription = $(this).siblings(".description").val();
    
    localStorage.setItem(blockId, eventDescription);
  });

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  function loadEvents() {
    $(".time-block").each(function () {
      const blockId = $(this).attr("id");
      const savedEvent = localStorage.getItem(blockId);

      if (savedEvent) {
        $(this).find(".description").val(savedEvent);
      }
    });
  }

  loadEvents();

// adding new block
const currentHour = dayjs().hour();
  for (let i = currentHour + 1; i <= currentHour + 5; i++) {
    const blockId = "hour-" + i;
    const timeLabel = dayjs().hour(i).format("hA");

    const newBlock = $("<div>").attr("id", blockId).addClass("row time-block future");
    newBlock.append('<div class="col-2 col-md-1 hour text-center py-3">' + timeLabel + '</div>');
    newBlock.append('<textarea class="col-8 col-md-10 description" rows="3"></textarea>');
    newBlock.append('<button class="btn saveBtn col-2 col-md-1" aria-label="save"><i class="fas fa-save" aria-hidden="true"></i></button>');

    // Append the new block to the container
    $(".container-lg").append(newBlock);
  }

});
