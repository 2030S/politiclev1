function calculateRanking(data){

  const parties = {};

  data.forEach(row => {

    const party = row.Party;

    if(!party) return;

    if(!parties[party]){
      parties[party] = 0;
    }

    parties[party]++;
  });

  const ranking = [];

  for(const party in parties){

    ranking.push({
      party: party,
      votes: parties[party]
    });

  }

  ranking.sort(
    (a,b) => b.votes - a.votes
  );

  return ranking;
}

function showRanking(ranking){

  const logoMap = {
    "حزب الاستقلال":"assets/logo/حزب الاستقلال.png",
    "التجمع الوطني للأحرار":"assets/logo/التجمع الوطني للأحرار.png",
    "حزب الأصالة والمعاصرة":"assets/logo/حزب الأصالة والمعاصرة.png",
    "حزب العدالة والتنمية":"assets/logo/حزب العدالة والتنمية.png",
    "الاتحاد الدستوري":"assets/logo/الاتحاد الدستوري.png"
  };

  let html = "";

  if(ranking.length === 0){
    document.getElementById("ranking-results").innerHTML = "";
    return;
  }

  const maxVotes = ranking[0].votes;

  ranking.forEach(item => {

    const percent =
      Math.round(
        (item.votes / maxVotes) * 100
      );

    html += `
      <div class="party-row">

        <img
          class="party-logo"
          src="${logoMap[item.party] || 'assets/logo/default.png'}"
          alt="${item.party}"
        >

        <div class="bar-wrapper">
          <div
            class="bar-fill"
            style="width:${percent}%">
          </div>
        </div>

        <span class="party-votes">
          ${item.votes}
        </span>

        <span class="party-percent">
          ${percent}%
        </span>

      </div>


    `;

    
  });

  document.getElementById("ranking-results").innerHTML = html;
}

