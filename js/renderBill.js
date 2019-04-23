import { DataStore } from "./Data.js";
var DB = new DataStore();

export function renderBill(billName, billAmount, billDueDate) {
  let NewBill = $("<div>", {
    class: "col-sm-12 row",
    id: billName
  });

  let label = $("<label>", {
    text: billName,
    class: "col-sm-12"
  });

  NewBill.append(label);

  let type = "date";
  let name = `${billName}_${type}`;
  let inputGroup = inputGroupRender(name, billDueDate, type);
  NewBill.append([inputGroup]);

  type = "number";
  name = `${billName}_${type}`;
  inputGroup = inputGroupRender(name, billAmount, type);
  NewBill.append([inputGroup]);

  return NewBill;
}

function inputGroupRender(name, value, type) {
  let inputGroup = $("<div>", {
    class: "input-group col-sm-6 row"
  });
  let labelText = name.split("_")[1] == "number" ? "Amount" : "Due";
  let label = $("<label>", {
    text: labelText + ":",
    class: "col-sm-12"
  });
  let input = $("<input>", {
    type: type,
    class: "form-control offset-sm-1 col-sm-11",
    name: `${name}`,
    disabled: true,
    value: value
  });

  let inputBtnDiv = $("<div>", {
    class: "input-group-append"
  });
  let btnRemove = btnRender(name, "btn btn-danger", "fa-trash-alt", "remove");
  let btnEdit = btnRender(name, "btn btn-warning", "fas fa-edit", "edit");
  //if type is date then no removal
  btnRemove = type == "date" ? "" : btnRemove;
  inputBtnDiv.append(btnEdit, btnRemove);
  inputGroup.append([label, input, inputBtnDiv]);
  return inputGroup;
}
/****btn functions */
function btnRender(name, classList, glyphname, type) {
  let btnRemove = $("<button>", {
    class: classList,
    data_id: name,
    html: `<i class="fas ${glyphname}"></i>`
  }).click(function(e) {
    e.preventDefault();
    switch (type) {
      case "remove":
        return removeInput(name);
        break;
      case "edit":
        return editInput($(this));
        break;
    }
  });
  return btnRemove;
}

function removeInput(name) {
  $(`input[name="${name}"]`)
    .closest(".input-group")
    .parent()
    .remove();
  DB.removeBill(name.split("_")[0]);
  if (!$("#billContainer :input").length) {
    $("#billSubmit").hide();
  }
}

function editInput(btn) {
  if (btn.hasClass("btn-warning")) {
    return editOpen(btn);
  }
  return editSave(btn);
}

function editOpen(btn) {
  btn.html(`<i class="fas fa-save"></i>`);
  btn.removeClass("btn-warning");
  btn.addClass("btn-success");
  btn
    .closest(".input-group")
    .find("input")
    .removeAttr("disabled");
  return;
}

function editSave(btn) {
  let billName = btn.attr("data_id").split("_")[0];
  let billAmount = $(`input[name="${billName}_number"]`).val();
  let billDate = $(`input[name="${billName}_date"]`).val();

  console.log("TCL: editSave -> billAmount", billAmount);
  console.log("TCL: editSave -> billDate", billDate);

  btn.html(`<i class="fas fa-edit"></i>`);
  btn.removeClass("btn-success");
  btn.addClass("btn-warning");
  var editInput = btn.closest(".input-group").find("input");
  editInput.attr("disabled", true);

  DB.setBill(billName, billAmount, billDate);
  return;
}
