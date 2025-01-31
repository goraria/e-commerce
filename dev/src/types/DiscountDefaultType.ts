export interface DiscountDefaultType {
    iddiscount: number,
    discount_name: string,
    percentage_discount: number,
    value_discount: number,
    start_date: Date,
    end_date: Date,
}

export interface DiscountFormProps {
    voucher: DiscountDefaultType;
    show: boolean;
    onHide: () => void;
    onReload: () => void;
};

export interface DiscountItem {
    item: DiscountDefaultType;
    onReload: () => void;
}
