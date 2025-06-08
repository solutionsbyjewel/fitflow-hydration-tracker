let totalWater = 0;
const goal = 64;

window.onload = function() {
  const stored = localStorage.getItem("hydrationData");
  if (stored) {
    const data = JSON.parse(stored);
    const today = new Date().toDateString();
    if (data.date === today) {
      totalWater = data.total;
    } else {
      if (data.total >= goal) {
        data.streak = (data.streak || 0) + 1;
      } else {
        data.streak = 0;
      }
      totalWater = 0;
      data.total = 0;
      data.date = today;
    }
    localStorage.setItem("hydrationData", JSON.stringify(data));
    updateUI(data.streak);
  } else {
    const initData = { total: 0, streak: 0, date: new Date().toDateString() };
    localStorage.setItem("hydrationData", JSON.stringify(initData));
    updateUI(0);
  }
};

function logWater() {
  const input = document.getElementById("waterInput");
  const amount = parseInt(input.value);

  if (!isNaN(amount) && amount > 0) {
    totalWater += amount;
    const data = JSON.parse(localStorage.getItem("hydrationData"));
    data.total = totalWater;
    localStorage.setItem("hydrationData", JSON.stringify(data));
    updateUI(data.streak);
    input.value = "";
    document.getElementById("message").innerText = "💧 Keep going!";
  } else {
    document.getElementById("message").innerText = "Please enter a valid number!";
  }
}

function updateUI(streak) {
  document.getElementById("total").innerText = `${totalWater} oz tracked today`;
  const percent = Math.min((totalWater / goal) * 100, 100);
  document.getElementById("progress-bar").style.width = percent + "%";
  document.getElementById("streak").innerText = streak || 0;
}

function resetDay() {
  totalWater = 0;
  const data = JSON.parse(localStorage.getItem("hydrationData"));
  data.total = 0;
  data.date = new Date().toDateString();
  localStorage.setItem("hydrationData", JSON.stringify(data));
  updateUI(data.streak);
  document.getElementById("message").innerText = "Day reset!";
}
