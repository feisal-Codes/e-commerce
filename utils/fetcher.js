export default async function fetcher(url, requestOptions = undefined) {
  try {
    if (requestOptions !== undefined) {
      const response = await fetch(url, requestOptions);
      const result = await response.json();
      return result;
    } else if (requestOptions === undefined) {
      const response = await fetch(url);
      const result = await response.json();
      return result;
    }
  } catch (error) {
    return error;
  }
}
