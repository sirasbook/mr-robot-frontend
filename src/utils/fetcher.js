import enumTempData from "../data/enum_result.json";

// WAPP
export const fetchWAPPData = async ({ queryKey: key }) => {
  const url = key[key.length - 1];
  return fetch(`http://localhost/api/service/wapp/scan?url=${url}`).then(
    (res) => res.json()
  );

  // TODO: use code above to fetch instead
  // return tempData;
};

// Amass
export const fetchEnumData = async ({ queryKey: key }) => {
  const url = key[1];
  const res = await fetch(`http://localhost/api/service/amass/enum`, {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      domain: `${url}`,
      config: {
        mode: 0,
        timeout: 5,
      },
    }),
  });

  if (!res.ok) throw new Error("Fail to enumerate the url");

  return res.json();

  // return enumTempData;
};

export const fetchLatestEnumData = async ({ queryKey: key }) => {
  const domain = key[1];
  const res = await fetch(
    `http://localhost/api/service/amass/db?domain=${domain}`
  );
  if (!res.ok) throw new Error("Fail to fetch Enumeration Result Data");

  return res.json();
};

export const fetchGraphEnumData = async ({ queryKey: key }) => {
  const domain = key[1];
  const res = await fetch(
    `http://localhost/api/service/amass/viz/graphistry?domain=${domain}`
  );
  if (!res.ok) throw new Error("Fail to fetch Subdomain Result Data");

  return res.json();
};

// ZAP
export const fetchZAPData = async ({ queryKey: key }) => {
  const url = key[1];
  const option = key[2];
  return fetch(`http://localhost/api/service/zap/scan`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      url,
      option,
    }),
  });
};
