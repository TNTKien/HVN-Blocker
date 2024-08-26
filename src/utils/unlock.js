export function UnlockHD() {
  if (!window.location.href.includes('-xem-truyen-')) return;
  const btnRow = document.getElementsByClassName('buttonhide')[0];

  const autoBtn = btnRow.children[2];
  const onclickAttr = autoBtn.getAttribute('onclick');
  const match = onclickAttr.match(/clickActionzserver\('(\d)'\)/);

  if (match[1] === '0') {
    const title_bar = document.getElementsByClassName('bar-title-episode')[0];
    const message = document.createElement('p');
    message.style.cssText = `width: 750px;font-size: 14px;text-align: center;color: #000;margin: 10px auto 0px;border-radius: 4px;background-image: -webkit-gradient(linear, left top, left bottom, from(#e2eef5), to(#ffffff));`;
    message.innerHTML = `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAJHSURBVDjLbVJNa1NBFD0zk/eSNIlJ21RLKhYpKoLuKrgRURQp/gLBbf+BUEGlCC7avW504Q8ouHFR/NZu7ULbbqwoVSSaJjZp8l7ex8y9I+/VSgsOXJi595x75xyuwH/O3OfgClx3GrAnhBCfVMSPbhxznu3FiL2PW+87E7mDxXkIcTnSXAoJIith867sSdgX1NAzd87kv+wjzq74k7acXRRFVe1uWZAxOJIXthFZEcsMKkMCyqeW9Hnq9kl3OSXOrvFQ6OhVXXBrvXZoAwbODSpMH85gqU14+MOgIIHSYE5kA12vZjOnZUL0EMxEZbfWaPZtRIzAEFa7Bh+6hJUuQRMjJEZSD0pObdOPZtT9tUbxu3EebIWqHGuNvmGMZgXOVhTqkcVGQPgZEtgCxloEsQJIj2W+Uu5i1/DodhQATAjI4mhe4PqYm2p/2ojxthmj4vy1gwJA2kPSM3bc06S82MA3DGaLpVaMe+t+ivOMTfO7keB6hlTGQnwLiahvkIHlFLytLTy9czfM8LSBA7kzUUq4AMla9sBrYv4VSge+JvTTMDCJKACaLfx4J5/UI+GADDXk3VPCk0wLqlASXlI0jJ5mCOwQE2m93W9qghwoCclYSOcPubk5p9Os20JZJF0tW3zsxHi84eNVI0RiaZovlIXqbNaHtTv/b3POP69PNmVuseUMVPvt3wi0ASX+K4hi1sFAZRjV2G+NxN7Uu6vjy/t29cKT9YlmcXiuY8ylQOsSE0mpFOcdp1eR8uVIu33zzbXj6a7+AaFCW2Fg32TEAAAAAElFTkSuQmCC"> Bạn đang bật chế độ <b>Auto Load</b>, hãy tắt chế độ này nếu muốn xem Server HD nhé!`;

    title_bar.parentNode.insertBefore(message, title_bar.nextSibling);
  }

  const btnHD = document.createElement('b');
  btnHD.className = 'buttonhide-3';

  const a = document.createElement('a');
  a.href = 'javascript:;';
  a.textContent = '🔓 Server HD';
  a.onclick = () => {
    if (match[1] === '0')
      return alert('Hãy tắt chế độ Auto Load trước khi chuyển sang Server HD!');
    btnHD.classList.add('selected-server');
    getAndReplaceImgs();
    // alert('Đã chuyển sang Server HD!');
  };
  btnHD.appendChild(a);

  btnRow.insertBefore(btnHD, btnRow.firstChild);

  const server1 = document.getElementsByClassName('buttonhide-1')[0];
  const server2 = document.getElementsByClassName('buttonhide-2')[0];

  server1.onclick = () => {
    if (btnHD.classList.contains('selected-server'))
      btnHD.classList.remove('selected-server');
  };
  server2.onclick = () => {
    if (btnHD.classList.contains('selected-server'))
      btnHD.classList.remove('selected-server');
  };
}

function getAndReplaceImgs() {
  const OriginImgs = document.querySelectorAll('#image img');
  for (let img of OriginImgs) {
    let newSrc = img.src.split('?')[0];
    if (newSrc.includes('/1200/')) newSrc = newSrc.replace('/1200/', '/9999/');

    img.src = newSrc;
  }
}
