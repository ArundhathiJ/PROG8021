let cart = {};
let pricesOfProducts = {
  "Apple Juice": 4.5,
  "Orange Juice": 5.0,
  "Iced Juice": 5.25,
  "Pineapple Juice": 4.75,
  "Sugarcane Juice": 6.0,
};
let TAX = 0.13;

function addToCart(itemName) {
  var quantity = prompt(`Hey! How many ${itemName} do you want?`);

  if (quantity !== null && !isNaN(quantity) && Number(quantity) > 0) {
    quantity = Number(quantity);
    if (cart[itemName]) {
      cart[itemName] += quantity;
    } else {
      cart[itemName] = quantity;
    }
    alert(`${quantity} ${itemName}(s) added to your cart!`);
    document.getElementById("checkoutButton").style.display = "inline-block";
  } else {
    alert("⚠ Please enter a valid number");
  }
}

function checkOut() {
  let name = prompt("Please enter your name to proceed:");

  if (!name || !isNaN(name)) {
    alert("Name is required to checkout.");
    return;
  }

  document.getElementById("customerName").textContent =
    "Customer Name: " + name;
  let printReceipt = document.getElementById("printReceipt");
  printReceipt.innerHTML = "";

  let subTotal = 0;

  for (let item in cart) {
    let quantity = cart[item];
    let price = pricesOfProducts[item];
    let total = quantity * price;
    subTotal += total;

    let row = `<tr>
      <td>${item}</td>
      <td>${quantity}</td>
      <td>$${price.toFixed(2)}</td>
      <td>$${total.toFixed(2)}</td>
    </tr>`;

    printReceipt.innerHTML += row;
  }

  let tax = subTotal * TAX;
  let grandTotal = subTotal + tax;

  document.getElementById(
    "subtotal"
  ).textContent = `Subtotal: $${subTotal.toFixed(2)}`;
  document.getElementById("tax").textContent = `TAX (13%): $${tax.toFixed(2)}`;
  document.getElementById(
    "grandTotal"
  ).textContent = `Grand Total: $${grandTotal.toFixed(2)}`;

  document.getElementById("receipt").style.display = "block";

  setTimeout(() => {
    document.getElementById("receipt").style.display = "none";
    document.getElementById("customerName").textContent = "";
    document.getElementById("subtotal").textContent = "";
    document.getElementById("tax").textContent = "";
    document.getElementById("grandTotal").textContent = "";
    document.getElementById("printReceipt").innerHTML = "";

    cart = {}; //clear the cart after checkout
    document.getElementById("checkoutButton").style.display = "none";
  }, 20000); // after 20 sec
}
