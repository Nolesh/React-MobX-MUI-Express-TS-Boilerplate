import { IError, TResponse } from "../../../shared/types";

type TMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';
type TData = Record<string, any> | string | null;

function request<T = TResponse>(url: string, method: TMethod = 'GET', data?: TData) {

    url = url.startsWith("http") ? url : "/rest/" + url;

    const headers: Record<string, string> = {};

    if (data) {
        headers["Content-Type"] = "application/json";
        data = JSON.stringify(data);
    }

    const init: RequestInit = {
        method,
        headers,
        body: data,
    }

    return (
        fetch(url, init)
            .then(async resp => {
                const json = await resp.json();
                if (!resp.ok) {                    
                    // throw Error(`Status: ${(json as IError).status}. Message: ${(json as IError).message}`);
                    const err = json as IError;
                    throw Error(`Status: ${err.status}. Message: ${err.message}`);
                }
                return json;
            }) as Promise<T>
    )
}

export {
    request
}