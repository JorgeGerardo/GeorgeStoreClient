export interface PaymentMethod {
    id: number;
    userId: string;
    lastDigits: string;
    brand: string;
    expMonth: Number;
    expYear: number;
    cardHolderName: string;
    isDefault: boolean;
    createdAt: Date;
}
