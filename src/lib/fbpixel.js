export function fbTrack(event, params) {
  if (typeof window.fbq === "function") window.fbq("track", event, params);
}
