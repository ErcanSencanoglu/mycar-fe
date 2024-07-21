export interface FilterFormData {
    item_type?: string;
    marka?: string;
    model?: string;
    price?: Range;
    year?: Range;
}

export interface Range {
    start?: number;
    end?: number;
}
