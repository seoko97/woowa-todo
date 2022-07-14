export const request = (url, method, body) => {
  const config = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  if (body) config.body = JSON.stringify(body);

  return fetch(`/api${url}`, config)
    .then((res) => {
      if (!res.ok) throw new Error("알 수 없는 에러가 발생하였습니다.");

      return res.json();
    })
    .catch((e) => e);
};
