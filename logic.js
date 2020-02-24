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
  // if (k == true) return s;
  // else {
  //   s.forEach(element => {});
  // }
}

function snap_to_center_horizontally(s, k) {
  textWidth = 0;
  s.forEach(element => {
    textWidth = Math.max(textWidth, element.length);
  });
  console.log(textWidth);

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

function convert() {
  var inp = document.getElementById("in").value.split("\n");
  var va = document.getElementById("va").value;
  if (document.getElementById("va").disabled == true) {
    va = "none";
  }
  var ha = document.getElementById("ha").value;
  var keep = document.getElementById("keep").checked;

  document.getElementById("out").value = "";

  if (va == "up") inp = snap_to_up_vertically(inp);
  else if (va == "center") inp = snap_to_center_vertically(inp);
  else if (va == "down") inp = snap_to_down_vertically(inp);

  if (ha == "left") inp = snap_to_left_horizontally(inp, keep);
  else if (ha == "center") inp = snap_to_center_horizontally(inp, keep);
  else if (ha == "right") inp = snap_to_right_horizontally(inp, keep);

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

function enableSelect() {
  document.getElementById("va").disabled = !document.getElementById("va")
    .disabled;
}
