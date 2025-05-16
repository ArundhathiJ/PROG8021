let cart = {};
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

  if (!name || name.trim() === "") {
    alert("⚠ Name is required to checkout.");
    return;
  }
}
