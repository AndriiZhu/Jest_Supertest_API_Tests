import { agent as request } from "supertest";
import { environment } from "../config/environment";

const baseUrl = environment.baseUrl;

export async function postRequest(apiUrl: string, bearerToken: string, body?: object) {
    const res = await request(baseUrl)
        .post(apiUrl)
        .auth(bearerToken, { type: 'bearer' })
        .send(body);
    return res;
}

export async function deleteRequest(apiUrl: string, bearerToken: string) {
    const res = await request(baseUrl)
        .delete(apiUrl)
        .auth(bearerToken, { type: 'bearer' })
    return res;
}

export async function getRequest(apiUrl: string, bearerToken: string, body?: object) {
    const res = await request(baseUrl)
        .get(apiUrl)
        .auth(bearerToken, { type: 'bearer' })
        .send(body);
    return res
}

export async function patchRequest(apiUrl: string, bearerToken: string, body?: object) {
    const res = await request(baseUrl)
        .put(apiUrl)
        .auth(bearerToken, { type: 'bearer' })
        .send(body);
    return res
}