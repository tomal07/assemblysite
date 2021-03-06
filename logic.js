var screenHeight = 25;
var screenWidth = 80;
var name = "var";

function snap_to_up_vertically(s) {
  var new_string = [];
  for (i = 0; i < s.length; i++) {
    new_string.push(s[i]);
  }
  for (i = 0; i < screenHeight - s.length; i++) {
    new_string.push("");
  }

  return new_string;
}

function snap_to_center_vertically(s) {
  var new_string = [];
  for (i = 0; i < parseInt((screenHeight - s.length) / 2); i++) {
    new_string.push(" ");
  }
  for (i = 0; i < s.length; i++) {
    new_string.push(s[i]);
  }
  for (i = 0; i < parseInt((screenHeight - s.length) / 2); i++) {
    new_string.push("");
  }

  return new_string;
}

function snap_to_down_vertically(s) {
  var new_string = [];
  for (i = 0; i < screenHeight - s.length; i++) {
    new_string.push("");
  }
  for (i = 0; i < s.length; i++) {
    new_string.push(s[i]);
  }

  return new_string;
}

function snap_to_left_horizontally(s, k) {
  return s;
}

function snap_to_center_horizontally(s, k) {
  textWidth = 0;
  s.forEach(element => {
    textWidth = Math.max(textWidth, element.length);
  });

  var new_string = [];
  var spacing;
  s.forEach(element => {
    if (k == true)
      spacing = " ".repeat(parseInt((screenWidth - textWidth - 1) / 2));
    else spacing = " ".repeat(parseInt((screenWidth - element.length - 1) / 2));

    new_string.push(spacing + element + spacing);
  });

  return new_string;
}

function snap_to_right_horizontally(s, k) {
  var textWidth = 0;
  s.forEach(element => {
    textWidth = Math.max(textWidth, element.length);
  });

  var new_string = [];
  var spacing;
  s.forEach(element => {
    if (k == true) spacing = " ".repeat(parseInt(screenWidth - textWidth - 1));
    else spacing = " ".repeat(parseInt(screenWidth - element.length - 1));

    new_string.push(spacing + element);
  });

  return new_string;
}

/* The function that is called when the main button is pressed*/
function convert() {
  var inp = document.getElementById("inputText").value.split("\n"); /* get the input text to convert*/
  var foundError = false;
  for (var i = 0; i < inp.length && !foundError; i++) { 
    if (inp[i].includes("\'")){
      alert("found ' in the input, Assembly doesn't support that")
      foundError = true;
    }
  }
  if (!foundError) {
    var verAlign = document.getElementById("verticalAlign").value; /* get the status of vertical aligning*/
    if (document.getElementById("verticalAlign").disabled)
      verAlign = "none";

    var horAlign = document.getElementById("horizontalAlign").value; /* get the status of horizontal aligning*/
    if (document.getElementById("horizontalAlign").disabled)
      verAlign = "none";

    var keep = document.getElementById("keep").checked; /* check the status of keeping proportions*/

    document.getElementById("out").value = "";

    if (verAlign == "up") inp = snap_to_up_vertically(inp);
    else if (verAlign == "center") inp = snap_to_center_vertically(inp);
    else if (verAlign == "down") inp = snap_to_down_vertically(inp);

    if (horAlign == "left") inp = snap_to_left_horizontally(inp, keep);
    else if (horAlign == "center") inp = snap_to_center_horizontally(inp, keep);
    else if (horAlign == "right") inp = snap_to_right_horizontally(inp, keep);

    for (var i = 0; i < inp.length; i++) {
      if (i == 0)
        document.getElementById("out").value +=
        name + " db'" + inp[i] + "',10,13\n";
      else if (i == inp.length - 1)
        document.getElementById("out").value +=
        " ".repeat(name.length) + " db'" + inp[i] + "',10,13,'$'";
      else
        document.getElementById("out").value +=
        " ".repeat(name.length) + " db'" + inp[i] + "',10,13\n";
    }
  }
}

function enableSelect() {
  document.getElementById("verticalAlign").disabled = !document.getElementById("verticalAlign")
    .disabled;
}

/* copies the output to the clipboard*/
function copyOut() {
  /* Get the text field */
  var copyText = document.getElementById("out");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");
}