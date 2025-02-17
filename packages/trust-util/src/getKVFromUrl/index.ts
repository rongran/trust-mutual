const getKVFromUrl = (url: string) => {
  const params = url.split('?')[1];
  const kvObject: any = {};
  params.split('&').map((item) => {
    kvObject[item.split('=')[0]] = item.split('=')[1];
  });
  return kvObject;
};
export default getKVFromUrl;
