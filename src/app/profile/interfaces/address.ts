
export interface Address {
    id: number,
    alias: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
    externalNumber: string;
    internalNumber: string;
    references: string;
}

export type AddressCreateDto = Omit<Address, 'id'>;
