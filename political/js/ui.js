function showData(data){

  const latest = data.slice(-3).reverse();

  let html = "";

  latest.forEach(row => {

    html += `
      <div class="participant-card">

        <div class="participant-name">
          👤 ${row.Name || "مشارك مجهول"}
        </div>

        <div class="participant-party">
          🏛️ ${row.Party || ""}
        </div>

        <div class="participant-score">
          ⭐ ${row.Score || "0"}/10
        </div>

      </div>
    `;
  });

  document.getElementById(
    "participants-list"
  ).innerHTML = html;
}

function showAlert(message){

  const alertBox =
    document.createElement("div");

  alertBox.className = "custom-alert";

  alertBox.textContent = message;

  document.body.appendChild(alertBox);

  setTimeout(() => {
    alertBox.classList.add("show");
  }, 50);

  setTimeout(() => {

    alertBox.classList.remove("show");

    setTimeout(() => {
      alertBox.remove();
    }, 300);

  }, 3000);

}