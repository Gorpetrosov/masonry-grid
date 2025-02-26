import { HTTP_METHODS, HttpMethod} from "../constants/api.ts";
import config from "../config";

export interface SearchParams {
    page?: number;
    per_page?: number;
    query?: string;
}

const BASE_URL = config.API_URL;
const API_KEY = config.API_KEY ;

export async function getPexelData<T>(
    endpoint: string,
    params: SearchParams = {}
): Promise<T> {
    try {
        if(params.page && params.page < 1){
            params.page = 1;
        }
        const url = new URL(`${BASE_URL}/${endpoint}`);
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined) url.searchParams.append(key, value.toString());
        });
        return fetchData<T>({
            url,
            method: HTTP_METHODS.GET,
            headers : {
                Accept: "application/json",
                "Content-Type": "application/json",
                "User-Agent": "Pexels/JavaScript",
                Authorization: API_KEY,
            }
        });
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}

export interface ApiRequestOptions {
    url: URL;
    method: HttpMethod;
    headers: HeadersInit;
    payload?: BodyInit | null | undefined;
}

async function fetchData<T>({
        url,
        headers,
        method,
        payload,
    } : ApiRequestOptions): Promise<T> {
    const response = await fetch(url.toString(), {
        method,
        headers,
        body: payload
    });
    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return await response.json() as T;
}