function showData(data){

  const latest = data.slice(-3).reverse();

  let html = "";

  latest.forEach(row => {

    html += `
      <div class="participant-row">

        <div class="participant-cell">
          ${row.Name || ""}
        </div>

        <div class="participant-cell">
          ${row.Party || ""}
        </div>

        <div class="participant-cell">
          ${row.Score || ""}/10
        </div>

      </div>
    `;
  });

  document.getElementById(
    "participants-list"
  ).innerHTML = html;
}
