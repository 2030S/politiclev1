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

  const name =
    document.getElementById("name").value.trim();

  const email =
    document.getElementById("email").value.trim();

  const score =
    document.getElementById("score").value.trim();

  if(!name){
    showAlert("المرجو إدخال الاسم");    
    return;
  }

  if(!email){
    showAlert("المرجو إدخال البريد الإلكتروني");
    return;
  }

  if(!score){
    showAlert("المرجو إدخال التقييم");
    return;
  }

  if(Number(score) < 1 || Number(score) > 10){
    showAlert("التقييم يجب أن يكون بين 1 و 10");
    return;
  }

  const payload = {
    Fingerprint: generateFingerprint(),
    Name: name,
    Email: email,
    Region: document.getElementById("region").value,
    Party: document.getElementById("party").value,
    Score: score
  };

  const response = await fetch(API_URL,{
    method:"POST",
    body: JSON.stringify(payload)
  });

  const result = await response.json();

if(!result.success){

  alert(result.message);

  return;
}

if(result.success){

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("score").value = "";

  document.getElementById("party").selectedIndex = 0;
  document.getElementById("region").selectedIndex = 0;

  await loadData();

  }}