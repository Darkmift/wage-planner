$('#billList').hide();

$("#addBill").click(e => {
  e.preventDefault();
  let billName = $("#billName").val();
  let billAmount = parseInt($("#billAmount").val());
  console.log(billName.length,billAmount);
  if (billName.length > 2 && billAmount > 0) {
    $("#billInputs").append(addBill(billName, billAmount));
    $('#billList').show();
  } else {
    alert("Please make suree to add bill name and bill amount");
  }
});

function addBill(name, num) {
  let inputGroup = $("<span>");
  let inputLabel = $("<label>", {
    text: name
  });
  let input = $("<input>", {
    type: "number",
    value: num,
    class: "form-control"
  });
  inputGroup.append([inputLabel, input]);
  return inputGroup;
}
