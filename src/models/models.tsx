export interface IJoke {
    category: string,
    type: string,
    id: number,
    safe: boolean,
    joke?: string,
    setup?: string;
    delivery?: string;
    error: boolean;
}