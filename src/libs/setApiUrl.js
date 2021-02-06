const apiHost = "http://192.168.1.77:5000/";

export default function setApiUrl(slug) {
  return `${apiHost}${slug}`;
}
