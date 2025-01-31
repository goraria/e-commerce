export interface AddressDefaultType {
    idaddress: number;
    type: string;
    tower: string;
    street: string;
    district: string;
    city: string;
    state: string;
    country: string;
}

export interface AddressFormProps {
    address: AddressDefaultType;
    show: boolean;
    onHide: () => void;
    onReload: () => void;
};

export interface AddressItem {
    item: AddressDefaultType;
    onReload: () => void;
}
