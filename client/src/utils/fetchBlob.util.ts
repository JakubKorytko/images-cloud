import Token from "./token.util";

// //===================================================\\
// ||                  FETCH FILE UTIL                  ||
// |]===================================================[|
// || Fetches file from server with authorization       ||
// || and returns generated link for blob version of it ||
// \\===================================================//


export async function fetchBlob(src: string): Promise<string> {

    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Authorization', `Bearer ${Token.value}`);

    const response = await fetch(src, { headers: requestHeaders })
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    return url;
}