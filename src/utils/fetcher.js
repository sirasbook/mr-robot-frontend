// NMAP
export const fetchNMAPData = async ({ queryKey: key }) => {
  const urls = key[1];

  if (!urls?.length) {
    return [];
  }

  const res = await Promise.all(
    urls.map(async (url) =>
      fetch("http://localhost/api/service/nmap/scan", {
        headers: {
          Accept: "appliclation/json",
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          url: `${url}`,
        }),
      })
    )
  );

  if (!res.every((r) => r.ok)) {
    throw new Error("Fetching Port Data Failed");
  }

  return Promise.all(res.map((r) => r.json()));
};

// WAPP
export const fetchWAPPData = async ({ queryKey: key }) => {
  const url = key[key.length - 1];
  const res = await fetch(`http://localhost/api/service/wapp/scan?url=${url}`);

  if (!res.ok) {
    throw new Error("WAPP running error!!!");
  }

  return res.json();
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
        timeout: 10,
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
  const res = await fetch(`http://localhost/api/service/zap/scan`, {
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

  if (!res.ok) {
    throw new Error("ZAP Error");
  }

  return res.json();
};

// FFUF
export const fetchFFUFData = async ({ queryKey: key }) => {
  const url = key[1];
  const res = await fetch("http://localhost:8000/api/service/ffuf/scan", {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      url: `${url}`,
    }),
  });

  if (!res.ok) {
    throw new Error("ffuf-service error!!");
  }

  return res.json();
};
