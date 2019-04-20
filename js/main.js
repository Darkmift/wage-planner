$(".text-danger").hide();

$("input").focus(function(e) {
  $(this).removeClass("is-invalid");
});

$("#incomeAdd").click(function(e) {
  let income = $("#incomeInput");
  let payDate = $("#payDateInput");
  let incomeError = $("#incomeError");
  let payDayError = $("#payDayError");

  let dateIsNaN = isNaN(Date.parse(payDate.val()));
  //isValid 1st param "hasError" - true if error
  if (isValid(income.val() < 1, income, incomeError)) {
    $("#income")
      .val(income.val())
      .css("background-color", "#9effa6");
  }
  if (isValid(dateIsNaN, payDate, payDayError)) {
    $("#payDate")
      .val(payDate.val())
      .css("background-color", "#9effa6");
  }
});

$("#addBill").click(function(e) {
  let billName = $("#billName");
  let billAmount = $("#billAmount");
  let billNameError = $("#billNameError");
  let billAmountError = $("#billAmountError");

  let validName = isValid(billName.val().length < 2, billName, billNameError);
  let validNum = isValid(billAmount.val() < 1, billAmount, billAmountError);
  if (validName && validNum) {
    $("#billContainer").append(renderBill(billName.val(), billAmount.val()));
  }
});

function hasError(input, inputError, hasError) {
  let errClass = "is-invalid";
  if (hasError === true) {
    input.addClass(errClass);
    inputError.show();
    return false;
  } else {
    input.removeClass(errClass);
    inputError.hide();
    return true;
  }
}

function isValid(logic, input, inputError) {
  let response = logic
    ? hasError(input, inputError, true)
    : hasError(input, inputError, false);
  console.log("TCL: isValid -> response", response, input);
  return response;
}

function renderBill(billName, billAmount) {
  let NewBill = $("<div>", {
    class: "col-sm-10",
    id: billName
  });
  let label = $("<label>", {
    text: billName
  });
  let inputGroup = $("<div>", {
    class: "input-group"
  });
  let input = $("<input>", {
    type: "number",
    class: "form-control",
    name: billName,
    value: billAmount
  });
  let inputBtnDiv = $("<div>", {
    class: "input-group-append"
  });
  let btnRemove = $("<button>", {
    // type:'',
    class: "btn btn-danger",
    data_id: billName,
    text: "X"
  }).click(function() {
    $(`#${$(this).attr("data_id")}`).remove();
  });

  inputBtnDiv.append(btnRemove);
  inputGroup.append([input, inputBtnDiv]);
  NewBill.append([label, inputGroup]);
  return NewBill;
}
