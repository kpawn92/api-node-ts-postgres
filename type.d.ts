interface ProfileType {
    user: {
        firstname: string;
        lastname: string;
    };
    email: string;
    role: string;
}

declare namespace Express {
    export interface Request {
        userID: string;
        rol: string;
        profile: ProfileType;
    }
}
