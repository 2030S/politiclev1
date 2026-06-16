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