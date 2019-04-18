$(".text-danger").hide();

$("#incomeAdd").click(function(e) {
  let income = $("#incomeInput");
  let payDate = $("#payDateInput");
  let incomeError = $("#incomeError");
  let payDayError = $("#payDayError");

  income.val() < 1
    ? hasError(income, incomeError, true)
    : hasError(income, incomeError, false);

  Date.parse(payDate.val()) == NaN || isNaN(parseInt(payDate.val())) == true
    ? hasError(payDate, payDayError, true)
    : hasError(payDate, payDayError, false);
});

$("#addBill").click(function(e) {
  let billName = $("#billName");
  let billAmount = $("#billAmount");
  let billNameError = $("#billNameError");
  let billAmountError = $("#billAmountError");

  billName.val().length < 4
    ? hasError(billName, billNameError, true)
    : hasError(billName, billNameError, false);

  billAmount.val() < 1
    ? hasError(billAmount, billAmountError, true)
    : hasError(billAmount, billAmountError, false);
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
