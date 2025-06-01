import type {AuthTokenResponse} from "@supabase/auth-js/src/lib/types";

export interface PlainUserEntityData {
    id: string;
    name: string;
    email?: string;
    picture: string;
}

export class UserEntity implements PlainUserEntityData {
    readonly id: string;
    readonly name: string;
    readonly email?: string;
    readonly picture: string;

    static fromSupabaseAuthTokenResponseData(data: AuthTokenResponse['data']) {
        const user = data.user;
        if (!user) {
            throw new Error('No user in token response');
        }
        return new UserEntity({
            id: user.id,
            name: user.user_metadata.full_name,
            email: user.email,
            picture: user.user_metadata.picture
        });
    }

    constructor({id, name, email, picture}: PlainUserEntityData) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.picture = picture;
    }
}