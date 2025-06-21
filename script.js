let totalWater = 0;
let hydrationGoal = 64; // default

window.onload = function () {
  const goalSelect = document.getElementById("goalSelect");

  // Load saved goal from localStorage (if any)
  const savedGoal = localStorage.getItem("hydrationGoal");
  if (savedGoal) {
    hydrationGoal = parseInt(savedGoal);
    goalSelect.value = savedGoal;
  } else {
    hydrationGoal = parseInt(goalSelect.value);
  }

  // Listen for dropdown change
  goalSelect.addEventListener("change", function () {
    hydrationGoal = parseInt(this.value);
    localStorage.setItem("hydrationGoal", hydrationGoal);
    updateUI();
  });

  // Load hydrationData from localStorage
  const stored = localStorage.getItem("hydrationData");
  if (stored) {
    const data = JSON.parse(stored);
    const today = new Date().toDateString();

    if (data.date === today) {
      totalWater = data.total;
    } else {
      if (data.total >= hydrationGoal) {
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
  document.getElementById("streak").innerText = streak || 0;

  const percent = Math.min((totalWater / hydrationGoal) * 100, 100);
  const fillElement = document.getElementById("bottle-fill");
  fillElement.style.height = percent + "%";

  // Hide old progress bar if still in DOM
  const bar = document.getElementById("progress-bar");
  if (bar) bar.style.width = "0%";

  if (percent >= 100) {
    document.getElementById("message").innerText = "🏆 Goal Reached! Stay hydrated!";
  }
}

function resetEverything() {
  const confirmReset = confirm("⚠️ This will erase all your progress and start over. Are you sure?");
  
  if (confirmReset) {
    localStorage.removeItem('hydrationData');
    localStorage.removeItem('hydrationGoal');
    totalWater = 0;
    hydrationGoal = 64; // Default

    // Reset dropdown if it exists
    const goalSelect = document.getElementById("goalSelect");
    if (goalSelect) {
      goalSelect.value = "64";
    }

    updateUI(0);
    document.getElementById("message").innerText = "💥 All data has been reset!";
  } else {
    document.getElementById("message").innerText = "Reset canceled.";
  }
}

  updateUI(data.streak);
  document.getElementById("message").innerText = "Day reset!";
}
