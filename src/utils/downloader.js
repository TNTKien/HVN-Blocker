import JSZip from 'jszip';

export async function Downloader() {
  if (!window.location.href.includes('doc-truyen')) return;
  const table = document.getElementsByClassName('listing')[0];
  const rows = table.getElementsByTagName('tr');
  const proxyUrl = 'https://cors.iamneyk.workers.dev/?url=';
  let title = document
    .querySelectorAll('span[itemprop="name"]')[2]
    .textContent.replace(/[/\\?%*:|"<>]/g, '-');

  for (let row of rows) {
    const link = row.querySelector('a');
    const chapter = row
      .querySelector('h2')
      .textContent.replace(/[/\\?%*:|"<>]/g, '-');
    if (link) {
      const href = link.getAttribute('href');
      const id = href.split('/')[1].split('-').slice(0, 2).join('-');

      const downloadButton = document.createElement('button');
      downloadButton.innerHTML = 'Download';
      downloadButton.id = id;
      downloadButton.title = chapter;

      const progressBar = document.createElement('progress');
      progressBar.id = `progress-${id}`;
      progressBar.max = 100;
      progressBar.value = 0;
      progressBar.style.display = 'none'; // Hide initially

      const newCell = document.createElement('td');
      newCell.appendChild(downloadButton);
      newCell.appendChild(progressBar);

      row.insertBefore(newCell, row.children[1]);
    }
  }

  // Add event listener to download button
  table.addEventListener('click', async function (e) {
    if (e.target.tagName === 'BUTTON') {
      const id = e.target.id;
      const chapterTitle = e.target.title;
      const url = `https://hentaihvn.tv/${id}-xem-truyen-id-id.html`;

      const response = await fetch(url);
      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');

      const images = doc.querySelectorAll('#image img');
      const zip = new JSZip();
      const folder = zip.folder(id);

      // Show and configure progress bar
      const progressBar = document.getElementById(`progress-${id}`);
      const downloadButton = e.target;
      progressBar.max = images.length;
      progressBar.value = 0;
      progressBar.style.display = 'inline'; // Show progress bar
      downloadButton.style.display = 'none'; // Hide download button

      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        let src = image.getAttribute('src').split('?')[0];
        if (src.includes('/1200/')) {
          src = src.replace('/1200/', '/9999/');
        }

        const filename = src.split('/').pop();

        const response = await fetch(proxyUrl + encodeURIComponent(src), {
          headers: {
            referer: 'https://hentaihvn.tv/',
          },
        });
        const blob = await response.blob();
        console.log(blob);
        folder.file(filename, blob);

        // Update progress bar
        progressBar.value = i + 1;
      }

      const content = await folder.generateAsync({ type: 'blob' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(content);
      a.download = `${title}-${chapterTitle}.zip`;
      a.click();

      zip.remove(id);
      URL.revokeObjectURL(a.href);

      // Hide progress bar and show download button
      progressBar.style.display = 'none';
      downloadButton.style.display = 'inline';
      downloadButton.textContent = '✅';
      downloadButton.style.backgroundColor = '#27ae60';
    }
  });
}
