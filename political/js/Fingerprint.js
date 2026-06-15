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
