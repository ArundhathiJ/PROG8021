function handleForm() {
  var fm = document.forms["myForm"];
  //get the form values
  var name = fm["name"].value.trim();
  var email = fm["email"].value.trim();
  var card = fm["cNumber"].value.trim();
  var expMonth = fm["eNumber"].value.trim();
  var expYear = fm["eYear"].value.trim();

  var bottles = parseInt(fm["bottles"].value.trim());
  if (isNaN(bottles) || bottles < 0) {
    bottles = 0;
  } // Default to 0 if not a number
  var caps = parseInt(fm["caps"].value.trim());
  if (isNaN(caps) || caps < 0) {
    caps = 0;
  }
  var pens = parseInt(fm["pens"].value.trim());
  if (isNaN(pens) || pens < 0) {
    pens = 0;
  }

  var bags = parseInt(fm["bags"].value.trim());
  if (isNaN(bags) || bags < 0) {
    bags = 0;
  }
  var cakes = parseInt(fm["cakes"].value.trim());
  if (isNaN(cakes) || cakes < 0) {
    cakes = 0;
  }
  //regular expressions for validation
  var emailPurchase = /^(\d|[a-zA-Z])+@(\d|[a-zA-Z])+\.(\d|[a-zA-Z])+$/;
  var cardPurchase = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
  var monthPattern = /^(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)$/;
  var yearPattern = /^\d{4}$/;

  var valid = true;
  // Clear previous error messages
  document.getElementById("nameerr").innerHTML = "";
  document.getElementById("emailerr").innerHTML = "";
  document.getElementById("carderr").innerHTML = "";
  document.getElementById("montherr").innerHTML = "";
  document.getElementById("yearerr").innerHTML = "";
  document.getElementById("receipt").innerHTML = "";
  document.getElementById("purchaseerr").innerHTML = "";

  //validation of the form
  if (name == "") {
    document.getElementById("nameerr").innerHTML = "Name cannot be empty";
    valid = false;
  } else if (!isNaN(name)) {
    document.getElementById("nameerr").innerHTML = "Name cannot be a number";
    valid = false;
  }
  if (!emailPurchase.test(email)) {
    document.getElementById("emailerr").innerHTML = "Email Format Wrong";
    valid = false;
  }
  if (!cardPurchase.test(card)) {
    document.getElementById("carderr").innerHTML =
      "Card number format is wrong";
    valid = false;
  }
  if (!monthPattern.test(expMonth)) {
    document.getElementById("montherr").innerHTML =
      "Enter a valid 3-letter month (e.g., JAN)";
    valid = false;
  }
  if (!yearPattern.test(expYear)) {
    document.getElementById("yearerr").innerHTML =
      "Enter a valid year (e.g., 2025)";
    valid = false;
  }

  if (!valid) return false;

  // Prices
  var priceBottles = 5;
  var priceCaps = 20;
  var pricePens = 2;
  var priceBags = 10;
  var priceCakes = 3;
  // Calculate totals
  var totalBottles = bottles * priceBottles;
  var totalCaps = caps * priceCaps;
  var totalPens = pens * pricePens;
  var totalBags = bags * priceBags;
  var totalCakes = cakes * priceCakes;
  // Calculate subtotal
  var subtotal = totalBottles + totalCaps + totalPens + totalBags + totalCakes;
  // Check if subtotal is zero
  if (subtotal === 0) {
    document.getElementById("purchaseerr").innerHTML =
      "You must buy at least one item.";
    return false;
  }

  // Calculate donation
  var donation = 0;
  if (subtotal <= 10) {
    donation = 10;
  } else {
    donation = subtotal * 0.1;
  }

  var total = subtotal + donation;
  var last4 = card.substring(card.length - 4);
  // Create the receipt table with name,email,credit card
  var table = `<h3>Thank You for your purchase</h3>
  <table border="1" >
  <tr><th>Name</th><td>${name}</td></tr>
  <tr><th>Email</th><td>${email}</td></tr>
  <tr><th>Credit Card</th><td>xxxx-xxxx-xxxx-${last4}</td></tr>
  </table><br>
  <table border="1">
  <tr>
    <th>Item</th><th>Quantity</th><th>Unit Price</th><th>Total Price</th>
  </tr>`;
  // Add items to the receipt table
  if (bottles > 0) {
    table += `<tr><td>Water Bottles</td><td>${bottles}</td><td>$5.00</td><td>$${totalBottles.toFixed(
      2
    )}</td></tr>`;
  }
  if (caps > 0) {
    table += `<tr><td>Caps</td><td>${caps}</td><td>$20.00</td><td>$${totalCaps.toFixed()}</td></tr>`;
  }
  if (pens > 0) {
    table += `<tr><td>Pens</td><td>${pens}</td><td>$2.00</td><td>$${totalPens.toFixed(
      2
    )}</td></tr>`;
  }
  if (bags > 0) {
    table += `<tr><td>Candy Bags</td><td>${bags}</td><td>$10.00</td><td>$${totalBags.toFixed(
      2
    )}</td></tr>`;
  }
  if (cakes > 0) {
    table += `<tr><td>Cup Cakes</td><td>${cakes}</td><td>$3.00</td><td>$${totalCakes.toFixed(
      2
    )}</td></tr>`;
  }

  table += `
  <tr><td>Donation</td><td colspan="2">Minimum $10 or 10%</td><td>$${donation.toFixed(
    2
  )}</td></tr>
  <tr><td colspan="3"><strong>Total</strong></td><td><strong>$${total.toFixed(
    2
  )}</strong></td></tr>
  </table>`;
  // Display the receipt
  document.getElementById("receipt").innerHTML = table;
}
