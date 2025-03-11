import axios, { AxiosResponse, Method } from "axios";
import { protectedResources } from "@/msal.config";
import { ApiRoutes, ApiMethods } from "@/enums/ApiEnums";

/**
 * Generic API request function.
 * @param {Method} method - The HTTP method ('GET', 'POST', 'PUT', 'DELETE').
 * @param {ApiRoutes} route - The API route (use ApiRoutes enum).
 * @param {Object} [data] - Optional request payload (for POST, PUT).
 * @param {Record<string, string>} [params] - Optional params to replace placeholders like ":id".
 * @param {string | null} token - The access token for authentication.
 * @returns {Promise<T | null>} - The API response data or null on error.
 */
export default async function apiRequest<T>(
    method: ApiMethods,
    route: ApiRoutes,
    data: object | null = null,
    params: Record<string, string> = {},
    token: string | null = null
): Promise<T | null> {
    if (!token) {
        console.warn("No access token available, authentication required.");
        return null;
    }

    let endpoint = route;
    Object.entries(params).forEach(([key, value]) => {
        endpoint = endpoint.replace(`:${key}`, value) as ApiRoutes;
    });

    try {
        const response: AxiosResponse<T> = await axios({
            method,
            url: `${protectedResources.backend.endpoint}${endpoint}`,
            data,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error: any) {
        console.error(`API ${method} request to ${endpoint} failed:`, error.response?.data || error.message);
        return null;
    }
}