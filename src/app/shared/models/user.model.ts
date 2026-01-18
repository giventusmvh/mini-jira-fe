export interface User{
    id: number;
    name: string;
    email: string;
    active: boolean;
    createdAt: string;
}

export interface LoginRequest{
    email: string;
    password: string;
}

export interface RegisterRequest{
    name: string;
    email: string;
    password: string;
}

export interface LoginResponse{
    token: string;
    user: User;
}