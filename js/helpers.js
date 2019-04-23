export function hasError(input, inputError, hasError) {
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

export function isValid(logic, input, inputError) {
  let response = logic
    ? hasError(input, inputError, true)
    : hasError(input, inputError, false);
  return response;
}

export function addInput(target, value) {
  target.val(value).css("background-color", "#9effa6");
}

