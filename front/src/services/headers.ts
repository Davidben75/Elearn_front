export const headersAuthorization = `Bearer ${JSON.parse(
    localStorage.getItem("token") as string
)}`;
