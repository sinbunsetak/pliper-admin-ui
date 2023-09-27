export const addHttp = (url: string) => {
  if (!/^http:\/\//i.test(url)) {
    return 'http://' + url;
  }

  if (!/^https:\/\//i.test(url)) {
    return 'https://' + url;
  }
  return url;
}