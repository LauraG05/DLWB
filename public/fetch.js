
export const inserisciEs = async () => {
    const response = await fetch("/inserisciEs", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  };

  
export const estraiNominativiConNumeri = async () => {
  const response = await fetch("/estraiNominativiConNumeri", {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const verificaToken = async (password) => {
  const response = await fetch("/verificaToken", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return await response.json();
};
