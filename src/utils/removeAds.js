export function RemoveAds() {
  const ads = document.querySelectorAll('[src*="/qx/qx1_pc.php"]');
  for (let ad of ads) {
    ad.remove();
    console.log('Ads removed');
  }

  const adsId = ['qxx', 'qx_main', 'pap'];
  for (let id of adsId) {
    const ads = document.getElementById(id);
    if (ads) ads.remove();
    console.log('Ads removed');
  }
  const adsClass = [
    'qx_main',
    'adsbox ads ad adsbox doubleclick ad-placement carbon-ads',
  ];
  for (let className of adsClass) {
    const ads = document.getElementsByClassName(className);
    for (let ad of ads) {
      ad.remove();
      console.log('Ads removed');
    }
  }
}
