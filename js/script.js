
function showPage(name) {
  var names = ["home", "about", "login", "signup", "track"];
  var i = 0;

  while (i < names.length) {
    document.getElementById("page_" + names[i]).style.display = "none";
    document.getElementById("menu_" + names[i]).style.color = "#0f1b33";
    document.getElementById("menu_" + names[i]).style.fontWeight = "normal";
    i++;
  }

  document.getElementById("page_" + name).style.display = "block";
  document.getElementById("menu_" + name).style.color = "#a98550";
  document.getElementById("menu_" + name).style.fontWeight = "bold";

  document.getElementById("mainpic").onmouseover = function () {
    changePicture(1);
  };

  document.getElementById("mainpic").onmouseout = function () {
    changePicture(0);
  };
}

//highlight the focused field
function highlight(x) {
  x.style.background = "#fffbe6";
}

function normal(x) {
  x.style.background = "#ffffff";
}

//error or success messages
function showMessage(id, text, isError) {
  var box = document.getElementById(id);
  box.innerHTML = text;

  if (isError) {
    box.style.color = "#c4552f";
  } else {
    box.style.color = "#2f7d52";
  }
}

// makes text safe before using innerHTML
function clean(text) {
  text = text.split("&").join("&amp;");
  text = text.split("<").join("&lt;");
  text = text.split(">").join("&gt;");
  return text;
}


//login page
//returns the password for each demo account
function getPassword(email) {
  switch (email) {
    case "staff@abharna.sa": return "Staff.port";
    case "manager@abharna.sa": return "Manager.port";
    case "customer@abharna.sa": return "Customer.port";
    default: return "";
  }
}

function getRole(email) {
  switch (email) {
    case "staff@abharna.sa": return "Port Staff";
    case "manager@abharna.sa": return "Port Manager";
    case "customer@abharna.sa": return "Customer / Consignee";
    default: return "";
  }
}

function getName(email) {
  switch (email) {
    case "staff@abharna.sa": return "Faisal Al-Harbi";
    case "manager@abharna.sa": return "Sara Al-Otaibi";
    case "customer@abharna.sa": return "Layla Al-Ghamdi";
    default: return "";
  }
}

// displays tools according to the user's role
function getTool(role, n) {
  if (role == "Port Staff") {
    if (n == 1) {return "Register a new ship and its berth"; }
    if (n == 2) {return "Register containers and their yard location";}
    return "Update ship and container status";

  } else if (role == "Port Manager") {
    if (n == 1) { return "See the total number of vessels and containers";}
    if (n == 2) { return "Follow the container distribution by status"; }
    return "Watch customs holds";

  } else {
    if (n == 1) {return "Track your containers by number"; }
    if (n == 2) {return "Read notifications about your cargo";}
    return "See the estimated arrival time";
  }
}

// fills the login form with demo account details
function fillDemo(email, pass) {
  document.forms["loginForm"]["email"].value = email;
  document.forms["loginForm"]["password"].value = pass;
}

// validates the login form
function validateLogin() {
  var email = document.forms["loginForm"]["email"].value;
  var pass = document.forms["loginForm"]["password"].value;

  if (email == "" || pass == "") {
    showMessage("loginMsg", "Please fill in all the fields.", true);

  } else if (pass.length < 8) {
    showMessage("loginMsg", "The password must have 8 characters or more.", true);

  } else if (getPassword(email) == "") {
    showMessage("loginMsg", "This e-mail is not registered.", true);

  } else if (getPassword(email) != pass) {
    showMessage("loginMsg", "Wrong password.", true);

  } else {
    var role = getRole(email);
    var list = "";

    for (var i = 1; i <= 3; i++) {
      list += "<li>" + getTool(role, i) + "</li>";
    }

    document.getElementById("welcomeTitle").innerHTML =
      "Welcome, " + getName(email) + "!";

    document.getElementById("welcomeRole").innerHTML =
      "You are signed in as: <b>" + role + "</b>";

    document.getElementById("toolList").innerHTML = list;
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("welcomeBox").style.display = "block";
  }

  return false;
}

function resetLogin() {
  document.getElementById("loginMsg").innerHTML = "";
}

function signOut() {
  document.getElementById("welcomeBox").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
  document.forms["loginForm"].reset();
}