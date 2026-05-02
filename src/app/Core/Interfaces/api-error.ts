export interface ApiError {
    type: string;
    title: string;
    status: number;
    detail: string;
    code: string;
    errors?: Record<string, string>
}