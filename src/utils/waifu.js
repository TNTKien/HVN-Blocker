export function Waifu() {
  if (!window.location.href.includes('my_waifu.php')) return;
  const allWaifu = document.createElement('ol');
  allWaifu.className = 'prizesLOL2';
  allWaifu.style.cssText = 'padding-bottom: 0;';
  document
    .getElementsByClassName('prizesMid')[0]
    .insertBefore(
      allWaifu,
      document.getElementsByClassName('prizesMid')[0].firstChild
    );
  const waifuImgDiv = document.createElement('div');
  const img = document.createElement('img');
  img.src =
    'https://raw.githubusercontent.com/TNTKien/HVN-Blocker/main/public/icons/doro_think.png';
  img.height = 100;
  waifuImgDiv.style.cssText = 'float: left;height: 100px;';
  waifuImgDiv.appendChild(img);
  allWaifu.appendChild(waifuImgDiv);

  const waifuInfoDiv = document.createElement('div');
  waifuInfoDiv.style.cssText = 'margin-left: 110px;';

  const waifuName = document.createElement('span');
  waifuName.innerHTML = 'Doro';
  waifuInfoDiv.appendChild(waifuName);

  const br = document.createElement('br');
  waifuInfoDiv.appendChild(br);

  const waifuDesc = document.createElement('b');
  waifuDesc.innerHTML =
    'Doro là waifu siuuuuu cấp vippro, chỉ cần vuốt ve và tắm cho Doro là đủ!';
  waifuInfoDiv.appendChild(waifuDesc);

  const vuotveProgress = document.createElement('div');
  const vuotveProgressText = document.createElement('b');
  vuotveProgressText.innerHTML = 'ㅤㅤㅤㅤ';
  vuotveProgress.appendChild(vuotveProgressText);
  waifuInfoDiv.appendChild(vuotveProgress);

  const progressBar = document.createElement('progress');
  progressBar.max = 100;
  progressBar.value = 0;
  progressBar.style.display = 'none'; // Hide initially
  vuotveProgress.appendChild(progressBar);

  allWaifu.appendChild(waifuInfoDiv);

  const btnDiv = document.createElement('div');
  btnDiv.style.cssText = 'gap: 5px; display: flex;';

  const vuotveBtn = document.createElement('button');
  vuotveBtn.innerHTML = '👋Vuốt ve All';
  vuotveBtn.style.cssText = 'padding: 1px 5px; ';

  const tamBtn = document.createElement('button');
  tamBtn.innerHTML = '💦Tắm All';
  tamBtn.style.cssText = 'padding: 1px 5px; ';

  btnDiv.appendChild(vuotveBtn);
  btnDiv.appendChild(tamBtn);

  waifuInfoDiv.appendChild(btnDiv);

  const diviner = document.createElement('div');
  diviner.style.cssText = 'width: 100%;height: 1px;background: #B6B6B6;';
  allWaifu.parentNode.insertBefore(diviner, allWaifu.nextSibling);

  vuotveBtn.addEventListener('click', async function () {
    let elements = document.querySelectorAll('input[value="👋Vuốt ve"]');
    vuotveProgressText.innerHTML = 'Đang vuốt ve...';
    progressBar.style.display = 'block'; // Show progress bar
    progressBar.max = elements.length;
    progressBar.value = 0;

    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      const formData = new FormData();
      formData.append(el.name, '👋Vuốt ve');
      await fetch('https://hentaihvn.tv/forum/my_waifu.php', {
        method: 'POST',
        body: formData,
      });
      progressBar.value = i + 1; // Update progress bar
    }
    vuotveProgressText.innerHTML = 'Xong!';
    //progressBar.style.display = "none";
    location.reload();
  });

  tamBtn.addEventListener('click', async function () {
    let elements = document.querySelectorAll('input[value="💦Tắm"]');
    vuotveProgressText.innerHTML = 'Đang tắm...';
    progressBar.style.display = 'block';
    progressBar.max = elements.length;
    progressBar.value = 0;

    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      const formData = new FormData();
      formData.append(el.name, '💦Tắm');
      await fetch('https://hentaihvn.tv/forum/my_waifu.php', {
        method: 'POST',
        body: formData,
      });
      progressBar.value = i + 1;
    }
    vuotveProgressText.innerHTML = 'Xong!';
    //progressBar.style.display = "none";
    location.reload();
  });
}
