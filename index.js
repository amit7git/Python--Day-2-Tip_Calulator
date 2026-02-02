var CurrentId = undefined;
var inputValues = [];

const inputPrompts = [
  "How much tip would you like to give? 10, 12, or 15?",
  "How many people to split the bill?"
];

// Click Run
$(document).ready(function () {
  $("#run-button").click(function () {
    inputValues = [];
    $("#Content").empty();
    NewLine("Welcome to the tip calculator!", false);
    NewLine("What was the total bill? $", true);
  });
});

// Enter key
$(document).on("keydown", function (event) {
  if (event.keyCode === 13) {
    var consoleLine = $("#" + CurrentId + " input").val();
    inputValues.push({ id: CurrentId, val: consoleLine });

    if (inputValues.length > inputPrompts.length) {
      const bill = Number(inputValues[0].val);
      const tip = Number(inputValues[1].val);
      const people = Number(inputValues[2].val);

      const totalBill = bill + bill * (tip / 100);
      let perPerson = Math.round((totalBill / people) * 100) / 100;

      if (perPerson % 1 === 0) perPerson = `${perPerson}.00`;
      else if ((perPerson * 10) % 1 === 0) perPerson = `${perPerson}0`;

      NewLine("Each person should pay: $" + perPerson, false);
      $(".console-carrot").remove();
      return;
    }

    $(".console-carrot").remove();
    NewLine(inputPrompts[inputValues.length - 1], true);
  }
});

// Cursor resize
$(document).on("keydown", function (event) {
  var line = $("#" + CurrentId + " input");
  var length = line.val().length;
  line.attr("size", length === 0 ? 1 : length + 1);
});

$(document).on("click", function () {
  $("#" + CurrentId + " input").focus();
});

function NewLine(text, isPrompt) {
  if (CurrentId !== undefined) {
    $("#" + CurrentId + " input").prop("disabled", true);
  }

  CurrentId = "consoleInput-" + GenerateId();

  if (isPrompt) {
    $("#Content").append(
      `<div id="${CurrentId}">
        ${text}
        <input type="text" class="terminal-input" />
        <div class="console-carrot"></div>
      </div>`
    );
    $("#" + CurrentId + " input").focus().attr("size", "1");
  } else {
    $("#Content").append(`<div id="${CurrentId}">${text}</div>`);
  }
}

function GenerateId() {
  return Math.random().toString(16).slice(2);
}
