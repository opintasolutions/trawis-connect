export default req => {
  const {host} = req.headers;
  console.log(host);
  return host.startsWith('localhost')
    ? `http://${host}/api/graphql`
    : `https://${host}/api/graphql`;
};
