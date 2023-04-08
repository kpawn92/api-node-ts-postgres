export enum Privilegios {
    ADMIN = 'ROOT',
    USER = 'SUBSCRIBER',
    MODERATOR = 'MODERATOR',
}

export type Roles = Array<Privilegios>;
