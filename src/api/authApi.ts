import {createAxiosDateTransformer} from 'axios-date-transformer'
import {type PlainUserEntityData, UserEntity} from "@/entities/UserEntity";
import {useAuthStore} from "@/stores/useAuthStore";


type GoogleCodeResponse = {
    idToken: string
}

const axiosInstance = createAxiosDateTransformer({
    baseURL: import.meta.env.VITE_BACKEND_URL,
})

export async function exchangeGoogleCode(
    code: string
): Promise<{ error?: unknown; idToken?: string }> {
    try {
        const {data} = await axiosInstance.post<GoogleCodeResponse>('/auth/google-code', {code})

        if (!data?.idToken) {
            return {error: new Error('Missing idToken from backend'), idToken: undefined}
        }

        return {error: undefined, idToken: data.idToken}
    } catch (err: unknown) {
        console.error('Login failed:', err)
        return {error: err, idToken: undefined}
    }
}

export async function getIdentity(): Promise<{ error?: unknown; identity?: UserEntity }> {
    try {
        const jwt = useAuthStore.getState().accessToken;
        const {data} = await axiosInstance.get<PlainUserEntityData>('/auth/me', {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        if (data === null) {
            throw new Error('No user in response');
        }
        return {error: undefined, identity: new UserEntity(data)};
    } catch (err: unknown) {
        return {error: err, identity: undefined};
    }
}
