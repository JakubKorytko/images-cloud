// //========================================\\
// ||           DOWNLOAD FILE UTIL           ||
// |]========================================[|
// || Creates temporary "a" element,         ||
// || sets link and name, appends it to DOM, ||
// || clicks it and then removes it from DOM ||
// \\========================================//

export default async function downloadFile(link: string, name: string): Promise<boolean> {
  if (!link || !name) return false;
  let tmpLink: HTMLAnchorElement | null = document.createElement('a');
  tmpLink.href = link;
  tmpLink.download = name;
  document.body.appendChild(tmpLink);
  tmpLink.click();
  document.body.removeChild(tmpLink);
  tmpLink = null;
  return true;
}
