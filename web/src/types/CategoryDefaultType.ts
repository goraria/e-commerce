export interface CategoryDefaultType {
    idcategory: number,
    category_name: string,
    category_description: string,
    category_image: string,
}

export interface CategoryFormProps {
    category: CategoryDefaultType;
    show: boolean;
    onHide: () => void;
    onReload: () => void;
};

export interface CategoryItem {
    item: CategoryDefaultType;
    onReload: () => void;
}
