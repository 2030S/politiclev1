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

