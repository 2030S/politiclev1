let partyChart = null;

window.onload = function(){
  loadData();
};

const API_URL =
"https://script.google.com/macros/s/XXXXX/exec";

async function sendData() {

  const data = {
    fingerprint: generateFingerprint(),
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    region: document.getElementById("region").value,
    party: document.getElementById("party").value,
    score: document.getElementById("score").value
  };

  const response = await fetch(
    API_URL,
    {
      method: "POST",
      body: JSON.stringify(data)
    }
  );

  const result =
    await response.json();

  alert("Saved");
}

function showData(data){

  let rows = "";

  let start = Math.max(1, data.length - 3);

  for(let i = start; i < data.length; i++){

    rows += "<tr>" +
      "<td>" + data[i][3] + "</td>" +
      "<td>" + data[i][5] + "</td>" +
      "<td>" + data[i][6] + "</td>" +
    "</tr>";
  }

  document.getElementById("table-body").innerHTML = rows;
}

function calculateRanking(data){

  const parties = {
    RNI: [],
    PAM: [],
    PJD: [],
    Istiqlal: []
  };

  for(let i=1;i<data.length;i++){

    const party = data[i][2];
    const score = Number(data[i][3]);

    if(parties[party]){
      parties[party].push(score);
    }
  }

  const ranking = [];

  for(const party in parties){

    const scores = parties[party];

    const total = scores.reduce((a,b)=>a+b,0);

    ranking.push({
      party:party,
      average:scores.length ? total / scores.length : 0
    });
  }

  ranking.sort((a,b)=>b.average-a.average);

  return ranking;
}

function showRanking(ranking){

  const medals = ["🥇","🥈","🥉","4️⃣"];

  let html = "";

  ranking.forEach((item,index)=>{
    html += `<p>${medals[index]} ${item.party} - ${item.average.toFixed(2)}</p>`;
  });

  document.getElementById("ranking-results").innerHTML = html;
}

function showChart(ranking){

  const labels = ranking.map(r=>r.party);
  const scores = ranking.map(r=>r.average);

  if(partyChart){
    partyChart.destroy();
  }

  partyChart = new Chart(
    document.getElementById("partyChart"),
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
    screen.width + "x" + screen.height,
    new Date().getTimezoneOffset()
  ].join("||");

  let hash = 0;

  for(let i=0;i<data.length;i++){
    hash = (hash << 5) - hash + data.charCodeAt(i);
    hash = hash & hash;
  }

  return "fp_" + Math.abs(hash);
}

function sendData(){

  const data = {
    fingerprint: generateFingerprint(),
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    region: document.getElementById("region").value,
    party: document.getElementById("party").value,
    score: document.getElementById("score").value
  };
}
google.script.run
async function loadData() {

  const response =
    await fetch(API_URL);

  const data =
    await response.json();

  showData(data);

  const ranking =
    calculateRanking(data);

  showRanking(ranking);

  showChart(ranking);
}