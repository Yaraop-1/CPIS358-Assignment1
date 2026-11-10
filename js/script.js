
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
// onblur on the password 
function checkStrength() {
  var p = document.forms["signupForm"]["password"].value;
  var score = 0;
  if (p.length >= 8) { score++; }
  if (p != p.toLowerCase()) { score++; }
  if (p != p.toUpperCase()) { score++; }
  if (p.indexOf("@") >= 0 || p.indexOf("!") >= 0 || p.indexOf(".") >= 0 || p.indexOf("#") >= 0) { score++; }

  var stars = "";
  for (var i = 0; i < 4; i++) {
    if (i < score) { stars += "&#9733;"; } else { stars += "&#9734;"; }
  }
  
  if (document.getElementById("strength") != null) {
    document.getElementById("strength").innerHTML = stars;
  }
}

// validates the sign-up form and builds a summary table
function validateSignup() {
  var f = document.forms["signupForm"];
  var name = f["fullname"].value;
  var phone = f["phone"].value;

  if (name.length < 3) {
    showMessage("signupMsg", "The name must have 3 characters or more.", true);

  } else if (phone.length != 10 || phone.substring(0, 2) != "05" || isNaN(phone)) {
    showMessage("signupMsg", "The phone must have 10 digits and start with 05.", true);

  } else if (f["password"].value.length < 8) {
    showMessage("signupMsg", "The password must have 8 characters or more.", true);

  } else if (f["accountType"].value == "") {
    showMessage("signupMsg", "Please choose an account type.", true);

  } else {
    var contact = "Email";

    if (f["contact"][1].checked) { contact = "SMS"; }


    document.getElementById("signupBox").style.display = "none";
    document.getElementById("signupResult").innerHTML =
      "<div class='result'>" +
      "<h2>Account created</h2>" +
      "<p>Thank you, <b>" + clean(name) + "</b>. Your request was received.</p>" +
      "<table class='tbl'><caption>Your details</caption>" +
      "<tr><td class='name'>Name</td><td>" + clean(name) + "</td></tr>" +
      "<tr><td class='name'>Email</td><td>" + clean(f["email"].value) + "</td></tr>" +
      "<tr><td class='name'>Phone</td><td>" + clean(phone) + "</td></tr>" +
      "<tr><td class='name'>Account type</td><td>" + f["accountType"].value + "</td></tr>" +
      "<tr><td class='name'>Contact by</td><td>" + contact + "</td></tr>" +
      "</table>" +
      "<p><a class='btn dark' href='#top' onclick='showPage(\"login\")'>Go to Login</a></p>" +
      "</div>";
  }
  return false;
}

function resetSignup() {
  document.getElementById("signupMsg").innerHTML = "";
  if (document.getElementById("strength") != null) {
    document.getElementById("strength").innerHTML = "";
  }
}

//Track cargo page
function getStage(no) {
  switch (no) {
    case "CMAU3300991": return 1;
    case "MAEU5556677": return 2;
    case "ABHU1234567": return 3;
    case "ABHU7771234": return 4;
    case "MSCU8765432": return 5;
    default:            return 0;
  }
}

function getCargo(no) {
  switch (no) {
    case "CMAU3300991": return "Pharmaceuticals";
    case "MAEU5556677": return "Automotive Parts";
    case "ABHU1234567": return "Electronics & Consumer Goods";
    case "ABHU7771234": return "Industrial Machinery";
    default:            return "Textile Bales";
  }
}

function getLocation(no) {
  switch (no) {
    case "CMAU3300991": return "Gate A-02";
    case "MAEU5556677": return "At sea";
    case "ABHU1234567": return "Yard B-12";
    case "ABHU7771234": return "Customs hold C-04";
    default:            return "Released";
  }
}

function getVessel(no) {
  switch (no) {
    case "CMAU3300991": return "MV RED SEA";
    case "MAEU5556677": return "MV AL MADINAH";
    case "ABHU1234567": return "MV AL JAZIRA";
    case "ABHU7771234": return "MV TIHAMA";
    default:            return "MV NOUR";
  }
}

function getStageName(n) {
  switch (n) {
    case 1:  return "Registered";
    case 2:  return "In transit";
    case 3:  return "At port";
    case 4:  return "Customs hold";
    default: return "Released";
  }
}

function fillSample(no) {
  document.forms["trackForm"]["container"].value = no;
}

function trackContainer() {
  var no = document.forms["trackForm"]["container"].value.toUpperCase();
  var stage = getStage(no);
  var box = document.getElementById("trackResult");

  if (no == "") {
    box.innerHTML = "<p class='msg'>Please write a container number.</p>";

  } else if (stage == 0) {
    box.innerHTML = "<p class='msg'>Container " + clean(no) + " was not found. Try one of the samples below.</p>";

  } else {
    var html = "<div class='result'>" +
      "<span class='label'>CONTAINER</span><h2>" + no + "</h2>" +
      "<p>Cargo: <b>" + getCargo(no) + "</b><br>" +
      "Location: <b>" + getLocation(no) + "</b><br>" +
      "Vessel: <b>" + getVessel(no) + "</b><br>" +
      "Status: <b>" + getStageName(stage) + "</b></p>" +
      "<ul class='progress'>";

    var i = 1;
    while (i <= 5) {
      if (i < stage) {
        html += "<li class='done'>&#10003; " + getStageName(i) + "</li>";

      } else if (i == stage) {
        html += "<li class='now'>&#9679; " + getStageName(i) + " (now)</li>";
        
      } else {
        html += "<li class='todo'>&#9675; " + getStageName(i) + "</li>";
      }
      i++;
    }
    box.innerHTML = html + "</ul></div>";
  }
  return false;
}

function resetTrack() {
  document.getElementById("trackResult").innerHTML = "";
}

function changePicture(state) {
    var pic = document.getElementById("mainpic");
    if (state == 1) {
        pic.src = "port2.jpg";
    } else {
        pic.src = "hero.jpg";
    }
}