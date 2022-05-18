import { useEffect, useState } from "react";
import { useQueries } from "react-query";
import { client } from "../utils/axios-util";

import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";

const fetchNmapData = async ({ queryKey }) => {
  const url = queryKey[1];
  return client.post(
    "/api/service/nmap/scan",
    { url },
    {
      baseURL: "http://localhost:8000",
    }
  );
};

export const useNmapData = (urls, queryOptions) => {
  return useQueries(
    urls.map((url) => ({
      queryKey: ["nmap", url],
      queryFn: fetchNmapData,
      ...queryOptions,
      retry: 2,
      retryDelay: (attempIndex) => Math.min(1000 * 2 ** attempIndex, 30000),
      staleTime: 10 * 60 * 1000, // stale (read from cache) by this 10 mins
      cacheTime: 10 * 60 * 1000, // cache 10 mins
    }))
  );
};

// const URL = `ws://localhost/api/ws/service/nmap/scan`;
const WS_URL = `ws://localhost:8000/api/ws/scan`;

const initialState = {
  hostnames: [],
  address: null,
  ports: [],
  nmaprun: null,
};

export const useNmapWebSocket = (url) => {
  const [data, setData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const {
    sendJsonMessage,
    getWebSocket,
    lastJsonMessage,
    readyState,
  } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("connection on open");
      setIsLoading(true);
    },
    shouldReconnect: (event) => event.code !== 1000,
    reconnectAttempts: 3,
    reconnectInterval: 1000,
    onReconnectStop: () => {
      setIsError(true);
    },
  });

  useEffect(() => {
    if (!getWebSocket()) return;
    setData(initialState);
    sendJsonMessage({ url });
  }, [getWebSocket()]);

  useEffect(() => {
    if (!lastJsonMessage) return;
    switch (lastJsonMessage.type) {
      case "address":
        setData((d) => ({ ...d, ...lastJsonMessage.data }));
        break;
      case "hostname":
        setData((d) => ({
          ...d,
          hostnames: [...d.hostnames, lastJsonMessage.data],
        }));
        break;
      case "port":
        setData((d) => ({ ...d, ports: [...d.ports, lastJsonMessage.data] }));
        setIsLoading(false);
        break;
      case "final":
        setData((d) => ({ ...d, ...lastJsonMessage.data }));
        break;
      default:
        break;
    }
  }, [lastJsonMessage]);

  return { data, isLoading, isError };
};

// export const useNmapWebSocket = (url) => {
//   let timeout = 250;
//   const [state, setState] = useState(initialState);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [retryCount, setRetry] = useState(0);

//   const connect = () => {
//     const websocket = new WebSocket(TEST_URL);
//     websocket.onopen = () => {
//       console.log("websocket on open");
//       setIsLoading(true);
//       setError(null);
//       websocket.send(JSON.stringify({ url }));
//     };

//     websocket.onerror = (event) => {
//       console.log("websocket on error");
//       console.error(event);
//       setError(event);
//       setIsLoading(false);
//     };

//     websocket.onmessage = (event) => {
//       console.log("websocket on message");
//       const data = JSON.parse(event.data);
//       switch (data.type) {
//         case "address":
//           setState((old) => ({ ...old, address: data.data }));
//           break;
//         case "hostname":
//           setState((old) => ({ ...old, hostname: data.data }));
//           break;
//         case "port":
//           setState((old) => ({ ...old, ports: [...old.ports.x, data.data] }));
//           break;
//         case "final":
//           setState((old) => ({ ...old, result: data.data }));
//           break;
//         default:
//           break;
//       }
//     };

//     websocket.onclose = (event) => {
//       console.log("websocket on close");
//       if (retryCount < 3 && event.code !== 1000) {
//         setRetry((cnt) => cnt + 1);
//       }
//       setIsLoading(false);
//     };

//     return websocket;
//   };

//   useEffect(() => {
//     const websocket = connect();
//     return () => {
//       console.log("from return use effect");
//       websocket.close();
//     };
//   }, [url]);

//   return { data: state, isLoading, error, retry: retryCount };
// };
