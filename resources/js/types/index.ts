export interface Car {
    id: number;
    brand: string;
    model: string;
    transmission: string;
    seats: number;
    airbags: number;
    rating: number;
    price_per_day: number;
    image_url: string;
    vendor_id: number;
    created_at: string;
    updated_at: string;
}

export interface Vendor {
    id: number;
    name: string;
    email: string;
    company: string | null;
    phone: string | null;
    cars: Car[];
} 