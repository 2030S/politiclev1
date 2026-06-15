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