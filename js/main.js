$(".text-danger").hide();

$("#incomeAdd").click(function(e) {
  let income = $("#incomeInput");
  let payDate = $("#payDateInput");
  let incomeError = $("#incomeError");
  let payDayError = $("#payDayError");

  isValid(income.val() < 1, income, incomeError);
  isValid(
    Date.parse(payDate.val()) == NaN || isNaN(parseInt(payDate.val())) == true,
    payDate,
    payDayError
  );
});

$("#addBill").click(function(e) {
  let billName = $("#billName");
  let billAmount = $("#billAmount");
  let billNameError = $("#billNameError");
  let billAmountError = $("#billAmountError");

  isValid(billName.val().length < 4, billName, billNameError);
  isValid(billAmount.val() < 1, billAmount, billAmountError);
});

function hasError(input, inputError, hasError) {
  let errClass = "is-invalid";
  if (hasError === true) {
    input.addClass(errClass);
    inputError.show();
  } else {
    input.removeClass(errClass);
    inputError.hide();
  }
}

function isValid(logic, input, inputError) {
  logic
    ? hasError(input, inputError, true)
    : hasError(input, inputError, false);
}
