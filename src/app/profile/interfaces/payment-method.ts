export interface PaymentMethod {
    id: number;
    userId: string;
    lastDigits: string;
    brand: string;
    expMonth: number;
    expYear: number;
    cardHolderName: string;
    isDefault: boolean;
    createdAt: Date;
}
