import {useCallback} from 'react'
import {useGoogleLogin} from '@react-oauth/google'
import {supabase} from '@/lib/supabaseClient'
import {useAuthStore} from '@/stores/useAuthStore'
import {exchangeGoogleCode} from '@/api/authApi'
import {UserEntity} from "@/entities/UserEntity";
import {showError, showSuccess} from "@/modules/react-bootstrap-modal/dialogs";

export function useStartAuth() {
    const setUser = useAuthStore((s) => s.setUser)
    const setAccessToken = useAuthStore((s) => s.setAccessToken)
    const clearAuth = useAuthStore((s) => s.clearAuth)

    const login = useGoogleLogin({
        ux_mode: 'popup',
        flow: 'auth-code',
        scope: [
            //auth
            'https://www.googleapis.com/auth/userinfo.profile',
            'openid',
            'email',
            //photos
            'https://www.googleapis.com/auth/photoslibrary.appendonly',
            'https://www.googleapis.com/auth/photoslibrary.readonly.appcreateddata',
            'https://www.googleapis.com/auth/photoslibrary.edit.appcreateddata',
        ].join(' '),
        onSuccess: async ({code}) => {
            const {error, idToken} = await exchangeGoogleCode(code)

            if (error || !idToken) {
                const msg = 'Failed to exchange code';
                console.error(msg, error)
                showError(msg, 'Log In Failed')
                return
            }

            const {data, error: supabaseError} = await supabase.auth.signInWithIdToken({
                provider: 'google',
                token: idToken,
            })

            if (supabaseError) {
                const msg = 'Supabase sign-in failed';
                console.error(msg, supabaseError)
                showError(msg, 'Log In Failed')
                return
            }

            const user = UserEntity.fromSupabaseAuthTokenResponseData(data)
            setUser(user)
            setAccessToken(data.session.access_token)
            showSuccess(`Welcome back, ${user.name}. You have logged in successfully`, 'Log In Success')
        },
        onError: (err) => {
            const msg = 'Google login failed';
            console.error(msg, err)
            showError(msg, 'Log In Failed')
        },
    })

    const startAuth = useCallback(() => {
        login()
    }, [login])

    const signOut = useCallback(async () => {
        await supabase.auth.signOut()
        clearAuth()
        showSuccess('You have logged out successfully', 'Log Out Success')
    }, [clearAuth])

    return {startAuth, signOut}
}
