import { btnHandler, isAutoLoadOn } from './modules';

export function Reader() {
  if (!window.location.href.includes('-xem-truyen-')) return;

  const btnRow = document.getElementsByClassName('buttonhide')[0];

  const singlePageBtn = document.createElement('b');
  singlePageBtn.className = 'buttonhide-4';
  singlePageBtn.style.marginRight = '13px';

  const a = document.createElement('a');
  a.href = 'javascript:;';
  a.textContent = '📄 Single Page';
  a.onclick = () => {
    if (isAutoLoadOn())
      return alert(
        'Hãy tắt chế độ Auto Load trước khi chuyển sang Single Page!'
      );

    if (document.getElementById('single-page')) return;

    singlePageBtn.classList.add('selected-server');
    SwitchToSinglePage();
  };

  singlePageBtn.appendChild(a);
  btnRow.insertBefore(singlePageBtn, btnRow.firstChild);

  btnHandler(singlePageBtn);
}

function SwitchToSinglePage() {
  const imagesFeild = document.getElementById('image');
  const allImgs = [...document.querySelectorAll('#image img')].map(
    (img) => img.src
  );
  let currentPage = 0;
  const totalPages = allImgs.length;

  const singlePage = document.createElement('div');
  singlePage.id = 'single-page';

  const btnGroup = document.createElement('div');
  btnGroup.className = 'buttonhide';
  btnGroup.style.display = 'flex';
  btnGroup.style.justifyContent = 'center';
  btnGroup.style.marginBottom = '10px';
  btnGroup.style.gap = '10px';

  // First button
  const firstBtn = document.createElement('a');
  firstBtn.href = 'javascript:;';
  firstBtn.textContent = '⏪ First';
  firstBtn.style.backgroundColor = 'transparent';
  firstBtn.onclick = () => {
    if (currentPage > 0) {
      currentPage = 0;
      img.src = allImgs[currentPage];
      pageNum.textContent = `${currentPage + 1}/${totalPages}`;
      pageNum2.textContent = `${currentPage + 1}/${totalPages}`;
    }
  };

  // Previous button
  const prevBtn = document.createElement('a');
  prevBtn.href = 'javascript:;';
  prevBtn.textContent = '⬅️ Prev';
  prevBtn.style.backgroundColor = 'transparent';
  prevBtn.onclick = () => {
    if (currentPage > 0) {
      currentPage--;
      img.src = allImgs[currentPage];
      pageNum.textContent = `${currentPage + 1}/${totalPages}`;
      pageNum2.textContent = `${currentPage + 1}/${totalPages}`;
    }
  };

  // Page number display
  const pageNum = document.createElement('span');
  pageNum.textContent = `${currentPage + 1}/${totalPages}`;
  pageNum.style.marginTop = '8px';

  // Next button
  const nextBtn = document.createElement('a');
  nextBtn.href = 'javascript:;';
  nextBtn.textContent = 'Next ➡️';
  nextBtn.style.backgroundColor = 'transparent';
  nextBtn.onclick = () => {
    if (currentPage < totalPages - 1) {
      currentPage++;
      img.src = allImgs[currentPage];
      pageNum.textContent = `${currentPage + 1}/${totalPages}`;
      pageNum2.textContent = `${currentPage + 1}/${totalPages}`;
    }
  };

  // Last button
  const lastBtn = document.createElement('a');
  lastBtn.href = 'javascript:;';
  lastBtn.textContent = 'Last ⏩';
  lastBtn.style.backgroundColor = 'transparent';
  lastBtn.onclick = () => {
    if (currentPage < totalPages - 1) {
      currentPage = totalPages - 1;
      img.src = allImgs[currentPage];
      pageNum.textContent = `${currentPage + 1}/${totalPages}`;
      pageNum2.textContent = `${currentPage + 1}/${totalPages}`;
    }
  };

  btnGroup.appendChild(firstBtn);
  btnGroup.appendChild(prevBtn);
  btnGroup.appendChild(pageNum);
  btnGroup.appendChild(nextBtn);
  btnGroup.appendChild(lastBtn);

  singlePage.appendChild(btnGroup);

  const img = document.createElement('img');
  img.src = allImgs[currentPage];

  singlePage.appendChild(img);

  // New button group
  const btnGroup2 = document.createElement('div');
  btnGroup2.className = 'buttonhide';
  btnGroup2.style.display = 'flex';
  btnGroup2.style.justifyContent = 'center';
  btnGroup2.style.marginBottom = '10px';
  btnGroup2.style.gap = '10px';

  // Clone buttons and page number display
  const firstBtn2 = firstBtn.cloneNode(true);
  const prevBtn2 = prevBtn.cloneNode(true);
  const pageNum2 = pageNum.cloneNode(true);
  const nextBtn2 = nextBtn.cloneNode(true);
  const lastBtn2 = lastBtn.cloneNode(true);

  // Add event listeners to cloned buttons
  firstBtn2.onclick = firstBtn.onclick;
  prevBtn2.onclick = prevBtn.onclick;
  nextBtn2.onclick = nextBtn.onclick;
  lastBtn2.onclick = lastBtn.onclick;

  // Append cloned buttons to new button group
  btnGroup2.appendChild(firstBtn2);
  btnGroup2.appendChild(prevBtn2);
  btnGroup2.appendChild(pageNum2);
  btnGroup2.appendChild(nextBtn2);
  btnGroup2.appendChild(lastBtn2);

  singlePage.appendChild(btnGroup2);

  // replace images field with single page
  imagesFeild.innerHTML = '';
  imagesFeild.appendChild(singlePage);

  document.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowLeft':
        if (currentPage > 0) {
          currentPage--;
          img.src = allImgs[currentPage];
          pageNum.textContent = `${currentPage + 1}/${totalPages}`;
          pageNum2.textContent = `${currentPage + 1}/${totalPages}`;
        }
        break;
      case 'ArrowRight':
        if (currentPage < totalPages - 1) {
          currentPage++;
          img.src = allImgs[currentPage];
          pageNum.textContent = `${currentPage + 1}/${totalPages}`;
          pageNum2.textContent = `${currentPage + 1}/${totalPages}`;
        }
        break;
    }
  });

  img.addEventListener('click', (event) => {
    const imgWidth = img.clientWidth;
    const clickX = event.offsetX;

    if (clickX < imgWidth / 2) {
      // Clicked on the left half
      if (currentPage > 0) {
        currentPage--;
        img.src = allImgs[currentPage];
        pageNum.textContent = `${currentPage + 1} / ${totalPages}`;
        pageNum2.textContent = `${currentPage + 1} / ${totalPages}`;
      }
    } else {
      // Clicked on the right half
      if (currentPage < totalPages - 1) {
        currentPage++;
        img.src = allImgs[currentPage];
        pageNum.textContent = `${currentPage + 1} / ${totalPages}`;
        pageNum2.textContent = `${currentPage + 1} / ${totalPages}`;
      }
    }
  });
}
