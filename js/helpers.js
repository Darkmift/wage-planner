import { DataStore } from "./Data.js";

var DB = new DataStore();

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

export function renderBill(billName, billAmount, billDueDate) {
  let NewBill = $("<div>", {
    class: "col-sm-10",
    id: billName
  });
  let label = $("<label>", {
    text: `${billName} bill is due on: ${billDueDate}`
  });
  let inputGroup = $("<div>", {
    class: "input-group"
  });
  let input = $("<input>", {
    type: "number",
    class: "form-control",
    name: billName,
    disabled: true,
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
    let id = $(this).attr("data_id");
    $(`#${id}`).remove();
    DB.removeBill(id);
    if ($("#formBills :input").length <= 4) {
      $("#billSubmit").hide();
    }
  });
  let btnEdit = $("<button>", {
    class: "btn btn-warning",
    data_edit: billName,
    html: `<i class="fas fa-edit"></i>`
  }).click(function(e) {
    e.preventDefault();
    if ($(this).hasClass("btn-warning")) {
      return editOpen($(this));
    }
    editSave($(this));
    return;
  });

  inputBtnDiv.append(btnEdit, btnRemove);
  inputGroup.append([input, inputBtnDiv]);
  NewBill.append([label, inputGroup]);
  return NewBill;
}

export function addInput(target, value) {
  target.val(value).css("background-color", "#9effa6");
}

function editOpen(btn) {
  btn.html(`<i class="fas fa-save"></i>`);
  btn.removeClass("btn-warning");
  btn.addClass("btn-success");
  console.log(
    `TCL: editOpen ->   btn.prev("input")`,
    btn.closest(".input-group").find("input")
  );
  btn
    .closest(".input-group")
    .find("input")
    .removeAttr("disabled");
  return;
}

function editSave(btn) {
  btn.html(`<i class="fas fa-edit"></i>`);
  btn.removeClass("btn-success");
  btn.addClass("btn-warning");
  var editInput = btn.closest(".input-group").find("input");
  editInput.attr("disabled", true);
  DB.setBill(editInput.attr("name"), editInput.val());
  return;
}
