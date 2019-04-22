
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

export function renderBill(billName, billAmount) {
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
    class: "btn btn-danger",
    data_id: billName,
    html: `<i class="fas fa-trash-alt"></i>`
  }).click(function(e) {
    e.preventDefault();
    $(`#${$(this).attr("data_id")}`).remove();
  });
  inputBtnDiv.append(btnRemove);
  inputGroup.append([input, inputBtnDiv]);
  NewBill.append([label, inputGroup]);
  return NewBill;
}