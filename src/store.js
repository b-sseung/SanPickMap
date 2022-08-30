const base = 'https://my-json-server.typicode.com/b-sseung/SanPickMap/'

export const requestList = async (key) => {
  try {
    const res = await fetch(`${base}${key}`);
    return await res.json();
  } catch (e) {
    new Error(e);
  }
}
