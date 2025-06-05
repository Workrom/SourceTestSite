function startSurvey() {
  let name = prompt("Enter your name:");
  let surname = prompt("Enter your surname:");
  let age = prompt("Enter your age:");

  const outputDiv = document.getElementById("surveyResult");

  if (!name || !surname || !age || isNaN(age)) {
    outputDiv.innerHTML = "You must enter all fields correctly.";
  } else {
    let yearBorn = new Date().getFullYear() - parseInt(age);
    outputDiv.innerHTML = `Hello <strong>&nbsp${name} ${surname}</strong>, nice to meet you!   You were born in <strong>&nbsp${yearBorn}</strong>.`;
  }
}

function calculateGameRuntime() {
  const gameHours = parseFloat(document.getElementById("gameHours").value);
  const sessionHours = parseFloat(document.getElementById("sessionHours").value);
  const resultDiv = document.getElementById("calcResult");

  if (isNaN(gameHours) || isNaN(sessionHours) || gameHours <= 0 || sessionHours <= 0) {
    resultDiv.innerHTML = `<span style="color: #ff6961;">⚠️ Please enter valid numbers for both fields.</span>`;
    return;
  }

  const daysNeeded = Math.ceil(gameHours / sessionHours);
  resultDiv.innerHTML = `🕹️ At <span style="color: #f2a52b;"><b>${sessionHours}</b></span> hours/day, 
    you'll finish your game in about <span style="color: #adc9bd;"><b>${daysNeeded} day(s)</b></span>.`;
}

function handleSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const comment = document.getElementById("comment").value.trim();
  const rating = document.querySelector('input[name="rating"]:checked')?.value;
  const likes = Array.from(document.querySelectorAll('input[name="likes"]:checked')).map(cb => cb.value);

  if (!name || !age || !phone || !rating) {
    alert("Будь ласка, заповніть всі обов’язкові поля.");
    return false;
  }

  const feedbackData = {
    name,
    age,
    phone,
    rating,
    likes,
    comment,
    submittedAt: new Date().toLocaleString()
  };

  localStorage.setItem("userFeedback", JSON.stringify(feedbackData));

  const outputDiv = document.getElementById("submittedData");
  if (!outputDiv) {
    const newDiv = document.createElement("div");
    newDiv.id = "submittedData";
    document.body.appendChild(newDiv);
  }

  document.getElementById("submittedData").innerHTML = `
    <h3>Ви надіслали:</h3>
    <ul>
      <li><strong>Ім'я:</strong> ${name}</li>
      <li><strong>Вік:</strong> ${age}</li>
      <li><strong>Телефон:</strong> ${phone}</li>
      <li><strong>Оцінка:</strong> ${rating}</li>
      <li><strong>Що сподобалось:</strong> ${likes.join(", ") || "Нічого не вибрано"}</li>
      <li><strong>Коментар:</strong> ${comment || "Без коментаря"}</li>
      <li><strong>Дата та час:</strong> ${feedbackData.submittedAt}</li>
    </ul>
  `;

  alert("Дякуємо за ваш відгук!");
  return false;
}
document.getElementById("feedbackForm").addEventListener("submit", handleSubmit);
