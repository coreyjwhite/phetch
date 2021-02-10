const apiHost = "http://192.168.13.217:5000/";

export default function setApiUrl(slug) {
  return `${apiHost}${slug}`;
}
