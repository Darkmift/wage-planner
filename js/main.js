$(".text-danger").hide();

let income = $("#incomeInput");
let payDate = $("#payDateInput");
let incomeError = $("#incomeError");
let payDayError = $("#payDayError");

let billName = $("#billName");
let billAmount = $("#billAmount");
let billNameError = $("#billNameError");
let billAmountError = $("#billAmountError");

$("input").focus(function(e) {
  $(this).removeClass("is-invalid");
});

$("#incomeAdd").click(function(e) {
  let dateIsNaN = isNaN(Date.parse(payDate.val()));
  //isValid 1st param "hasError" - true if error
  if (isValid(income.val() < 1, income, incomeError)) {
    $("#income").val(income.val());
  }
  if (isValid(dateIsNaN, payDate, payDayError)) {
    $("#payDate").val(payDate.val());
  }
});

$("#addBill").click(function(e) {
  if (
    isValid(billName.val().length < 4, billName, billNameError) &&
    isValid(billAmount.val() < 1, billAmount, billAmountError)
  ) {
    //add bill input
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
