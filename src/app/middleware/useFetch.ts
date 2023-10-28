"use server";

import { NextRequest } from "next/server";

async function useFetch(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");
  const url = `/api/upload/?filename=${filename}`;

  const combinedOptions = {
    method: "POST",
    data: request.body,
  };

  return fetch(url, combinedOptions)
    .then(async (res) => {
      let data = null;
      try {
        data = await res.json();
      } catch {
        console.error("Unable to parse response from fetch call to", url, {
          url,
          ok: res.ok,
          status: res.status,
        });
      }

      return {
        data,
        status: res.status,
        ok: res.ok,
        headers: res.headers,
      };
    })
    .catch((err) => {
      console.error("Fetch call failed:", { url, err });
      throw err;
    });
}

export default useFetch;
