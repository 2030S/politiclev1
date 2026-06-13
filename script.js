const API_URL =
"https://script.google.com/macros/s/AKfycby4cdoyflCwaAVo7uE50W8wNAgd8biKfdNZqnFloSc44rPBOPEocBrq6lL6eWtllg/exec";

let partyChart = null;

window.onload = () => {
  loadData();
};

async function loadData() {

  try {

    const response =
      await fetch(API_URL);

    const data =
      await response.json();

    showData(data);

    const ranking =
      calculateRanking(data);

    showRanking(ranking);

    showChart(ranking);

  } catch(error){

    console.error(error);

  }

}


function showData(data){

  let html = "";

  const latest =
    data.slice(-3);

  latest.forEach(row => {

    html += `
      <tr>
        <td>${row.Name || ""}</td>
        <td>${row.Party || ""}</td>
        <td>${row.Score || ""}</td>
      </tr>
    `;

  });

  document
    .getElementById("table-body")
    .innerHTML = html;
}


function calculateRanking(data){

  const parties = {};

  data.forEach(row => {

    const party =
      row.Party;

    const score =
      Number(row.Score);

    if(!party) return;

    if(!parties[party]){
      parties[party] = [];
    }

    parties[party].push(score);

  });

  const ranking = [];

  for(const party in parties){

    const scores =
      parties[party];

    const total =
      scores.reduce(
        (a,b)=>a+b,
        0
      );

    ranking.push({

      party:party,

      average:
        total /
        scores.length

    });

  }

  ranking.sort(
    (a,b)=>
      b.average - a.average
  );

  return ranking;
}


function showRanking(ranking){

  const medals = [
    "🥇",
    "🥈",
    "🥉",
    "4️⃣"
  ];

  let html = "";

  ranking.forEach(
    (item,index)=>{

      html += `
        <p>
          ${medals[index] || ""}
          ${item.party}
          -
          ${item.average.toFixed(2)}
        </p>
      `;

    }
  );

  document
    .getElementById(
      "ranking-results"
    )
    .innerHTML = html;
}


function showChart(ranking){

  const labels =
    ranking.map(
      x => x.party
    );

  const scores =
    ranking.map(
      x => x.average
    );

  if(partyChart){
    partyChart.destroy();
  }

  partyChart =
    new Chart(
      document.getElementById(
        "partyChart"
      ),
      {
        type:"bar",

        data:{
          labels:labels,

          datasets:[{
            label:"Average Score",
            data:scores
          }]
        },

        options:{
          responsive:true,
          maintainAspectRatio:false
        }
      }
    );
}


function generateFingerprint(){

  const data = [
    navigator.userAgent,
    navigator.language,
    navigator.platform,
    screen.width +
    "x" +
    screen.height
  ].join("|");

  let hash = 0;

  for(
    let i=0;
    i<data.length;
    i++
  ){

    hash =
      ((hash<<5)-hash)
      + data.charCodeAt(i);

    hash |= 0;

  }

  return "fp_" +
    Math.abs(hash);
}


async function sendData() {

  const payload = {
    Fingerprint: generateFingerprint(),
    Name: document.getElementById("name").value,
    Email: document.getElementById("email").value,
    Region: document.getElementById("region").value,
    Party: document.getElementById("party").value,
    Score: document.getElementById("score").value
  };

  const response = await fetch(API_URL,{
    method:"POST",
    body: JSON.stringify(payload)
  });

const result = await response.json();

if(result.success){

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("score").value = "";

  document.getElementById("party").selectedIndex = 0;
  document.getElementById("region").selectedIndex = 0;

  await loadData();

}
}
