let totalWater = 0;

function logWater() {
  const input = document.getElementById("waterInput");
  const amount = parseInt(input.value);

  if (!isNaN(amount)) {
    totalWater += amount;
    document.getElementById("total").innerText = `${totalWater} oz tracked`;
    document.getElementById("message").innerText = "💧 Keep going!";
    input.value = "";
  } else {
    document.getElementById("message").innerText = "Please enter a valid number!";
  }
}
