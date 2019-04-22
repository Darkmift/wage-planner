import { hasError, isValid, renderBill } from "./helpers.js";

let income = $("#incomeInput");
let payDate = $("#payDateInput");
let incomeError = $("#incomeError");
let payDayError = $("#payDayError");

$(".text-danger ,.text-warning, #billSubmit").hide();

$("input").focus(function(e) {
  $(this).removeClass("is-invalid");
});

$("#incomeAdd").click(function(e) {
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
  if ($("#income").val() < 1 || $("#payDate").val() == "") {
    hasError(income, incomeError, true);
    hasError(payDate, payDayError, true);
    return;
  }
  let billName = $("#billName");
  let billAmount = $("#billAmount");
  let billNameError = $("#billNameError");
  let billAmountError = $("#billAmountError");

  let validName = isValid(billName.val().length < 2, billName, billNameError);
  let validNum = isValid(billAmount.val() < 1, billAmount, billAmountError);
  let inputExist = false;

  $.each($("#formBills  input[type!=submit]"), function(index, input) {
    console.log("TCL: input", $(input).attr("name"));
    if ($(input).attr("name") == billName.val()) inputExist = true;
  });
  console.log("TCL: inputExist", inputExist, inputExist != true);

  if (inputExist == true) {
    $("#billNameExist")
      .text(`Bill for ${billName.val()} is already in list`)
      .show();
      return
  }

  if (validName && validNum && inputExist != true) {
    $("#billNameExist").hide();
    $("#billContainer").append(renderBill(billName.val(), billAmount.val()));
    $("#billSubmit").show();
  }
});
