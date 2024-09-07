export function FixAdvancedSearch() {
  if (!window.location.href.includes('search-plus.php?name')) return;

  const pagination = document.getElementsByClassName('pagination')[0];
  for (let i = 0; i < pagination.children.length; i++) {
    const page = pagination.children[i].firstChild;
    if (!page.href) continue;

    const url = new URL(page.href);
    const domain = url.hostname;

    if (domain !== 'hentaihvn.tv') {
      url.hostname = 'hentaihvn.tv';
      page.href = url.href;
    }
  }
}
