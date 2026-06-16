function calculateRanking(data){

  const parties = {};

  data.forEach(row => {

    const party = row.Party;
    const score = Number(row.Score);

    if(!party || !score) return;

    if(!parties[party]){
      parties[party] = [];
    }

    parties[party].push(score);

  });

  const ranking = [];

  for(const party in parties){

    const scores = parties[party];

    const votes = scores.length;

    const total = scores.reduce(
      (a,b) => a + b,
      0
    );

    const average = total / votes;

    ranking.push({
      party,
      votes,
      average
    });

  }

  // الترتيب حسب عدد الأصوات
  ranking.sort(
    (a,b) => b.votes - a.votes
  );

  return ranking;
} 

function showRanking(ranking){

  const logoMap = {
    "جبهة القوى الديمقراطية":"assets/logo/ffd.jfif",
    "الحركة الديمقراطية الاجتماعية":"assets/logo/mdp.jfif",
    "الحركة الشعبية":"assets/logo/mp.png",
    "التجمع الوطني للأحرار":"assets/logo/rni.png",
    "حزب الأصالة والمعاصرة":"assets/logo/pam.png",
    "حزب العدالة والتنمية":"assets/logo/pjd.jfif",
    "حزب التقدم والاشتراكية":"assets/logo/pps.png",
    "الاتحاد الدستوري":"assets/logo/uc.png",
    "حزب الاستقلال":"assets/logo/pi.jfif"
  };

  let html = "";

  if(ranking.length === 0){
    document.getElementById("ranking-results").innerHTML = "";
    return;
  }

  // أكبر عدد أصوات
  const maxVotes = ranking[0].votes;

  ranking.forEach(item => {

    // طول البار حسب عدد الأصوات
    const barPercent = Math.round(
      (item.votes / maxVotes) * 100
    );

    // نسبة الرضا حسب متوسط التقييم
    const ratingPercent = Math.round(
      item.average * 10
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
            style="width:${barPercent}%">
          </div>
        </div>

        <span class="party-votes">
          ${item.votes}
        </span>

        <span class="party-percent">
          ${ratingPercent}%
        </span>

      </div>
    `;
  });

  document.getElementById("ranking-results").innerHTML = html;
}