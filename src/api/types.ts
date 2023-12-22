// apiTypes.ts
export type Tournament = {
    id: string;
    name: string;
};

export type Match = {
    id: string;
    startDate: string;
    tournament: {
        id: string;
    };
    matchMaps: MatchMap[];
};

export enum Role{
    ADMIN = "ROLE_ADMIN",
    USER = "ROLE_USER",
    MANAGER = "ROLE_MANAGER"
}

export type EditCreateMatch = {
    startDate: string;
}

// apiTypes.ts
export type MatchMap = {
    resultTeamOne: number;
    resultTeamTwo: number;
    ctOne: number;
    ctTwo: number;
    rankOne: number;
    rankTwo: number;
    mapWinsOne: number;
    mapWinsTwo: number;
    mapWinner: number;
    id: string;
    tOne: number;
    tTwo: number;
};

export type User = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    username: string;
};

export type AuthData = {
    email: string;
    password: string;
};