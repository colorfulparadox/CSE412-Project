const API_BASE = "http://localhost:5001";

export async function pokeapi(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return await res.json();
}

export function pokepostrequest(path, userdatadict) {
    let authid = 0;

    return fetch(API_BASE + path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userdatadict),
    }).then((response) => {
        if (!response.ok) {
            throw new Error ("API error");
        }
        return response.json();
    }
    ).then((data) => {
        console.log(data)
        return data;
    }).catch((error) => {
        console.log(error);
    });
}