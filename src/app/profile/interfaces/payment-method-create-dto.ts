export interface PaymentMethodCreateDto {
    UserId: string;
    CardNumber: string;
    Brand: string;
    ExpMonth: number;
    ExpYear: number;
    CardHolderName: string;
    IsDefault: boolean;

}
