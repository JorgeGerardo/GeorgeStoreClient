export interface PaymentMethodCreateDto {
    CardNumber: string;
    Brand: string;
    ExpMonth: number;
    ExpYear: number;
    CardHolderName: string;
    IsDefault: boolean;
}
