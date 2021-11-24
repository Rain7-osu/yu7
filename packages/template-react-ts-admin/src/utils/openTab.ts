export function openTab(url: string) {
  const popup = window.open();
  popup && (popup.window.location.href = url);
}
