// store/store.ts
import { axiosRequest, SaveToken } from '@/utils/axios';
import { create } from 'zustand';
export const api = import.meta.env.VITE_API

interface LogState {
    user: any | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    loginUser: (values: any) => Promise<void>;
}

export const useBeras = create<LogState>((set) => ({
    user: null,
    token: null,
    loading: false,
    error: null,

    loginUser: async (values) => {
        set({ loading: true, error: null });
        try {
            const response = await axiosRequest.post("/Account/login", values);
            const token = response.data.data;
            SaveToken(token);
            set({
                user: response.data.user || null,
                token,
                loading: false,
                error: null,
            });
        } catch (err: any) {
            let message = "Unexpected error";
            if (err.response?.data) {
                if (typeof err.response.data === "string") {
                    message = err.response.data;
                } else if (err.response.data.errors) {
                    message = JSON.stringify(err.response.data.errors);
                } else {
                    message = JSON.stringify(err.response.data);
                }
            } else if (err.message) {
                message = err.message;
            }

            set({
                loading: false,
                error: message,
            });
        }
    },
}));





export interface Product {
    id: number;
    productName: string;
    image: string;
    color: string;
    price: number;
    hasDiscount: boolean;
    discountPrice: number;
    quantity: number;
    productInMyCart: boolean;
    categoryId: number;
    categoryName: string;
    productInfoFromCart: any;
}

export interface ProductsData {
    products: Product[];
}

export interface ProductFilters {
    productName?: string;
    minPrice?: number;
    maxPrice?: number;
    brandId?: number;
    colorId?: number;
    categoryId?: number;
    subcategoryId?: number;
    pageNumber?: number;
    pageSize?: number;
}

interface ProductState {
    data: ProductsData | null;
    filters: ProductFilters;
    setFilters: (filters: Partial<ProductFilters>) => void;
    fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
    data: null,
    filters: {
        pageNumber: 1,
        pageSize: 10,
    },

    setFilters: (newFilters) =>
        set((state) => ({
            filters: { ...state.filters, ...newFilters },
        })),

    fetchProducts: async () => {
        try {
            const { filters } = get();
            const response = await axiosRequest.get<{ data: ProductsData }>(
                "/Product/get-products",
                { params: filters }
            );
            set({ data: response.data.data });
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    },
}));
interface SubCategory {
    id: number;
    subCategoryName: string;
}

interface CategoryState {
    isCategoria: SubCategory[];
    loading: boolean;
    getCategory: () => Promise<void>;
}

export const useCategory = create<CategoryState>((set) => ({
    isCategoria: [],
    loading: false,
    getCategory: async () => {
        set({ loading: true });
        try {
            const { data } = await axiosRequest.get("/SubCategory/get-sub-category");
            set({ isCategoria: data.data, loading: false });
        } catch (error) {
            console.error("Хатогӣ ҳангоми гирифтани категорияҳо:", error);
            set({ loading: false });
        }
    },
}));

interface AddUserState {
    loading: boolean;
    error: string | null;
    addUser: (newUser: any) => Promise<boolean>;
}

export const useUserStore = create<AddUserState>((set) => ({
    loading: false,
    error: null,

    addUser: async (newUser) => {
        set({ loading: true, error: null });
        try {
            const response = await axiosRequest.post("/Account/register", newUser);

            if (response.status === 200 || response.status === 201) {
                set({ loading: false });
                return true;
            }
            return false;
        } catch (error: any) {
            console.error("Registration error:", error);
            set({
                loading: false,
                error: error.response?.data?.message || "Хатогӣ ҳангоми сабт"
            });
            return false;
        }
    },
}));
interface ProductInCart {
    id: number;
    quantity: number;
    product: Product;
}


interface CardsState {
    isCards: ProductInCart[];
    loading: boolean;
    getCategory: () => Promise<void>;
}


export const useCards = create<CardsState>((set) => ({
    isCards: [],
    loading: false,

    getCategory: async () => {
        set({ loading: true });
        try {
            const { data } = await axiosRequest.get("/Cart/get-products-from-cart");

            const cartData = data?.data?.[0]?.productsInCart;
            console.log(data);


            set({
                isCards: cartData,
                loading: false,
            });

        } catch (error) {
            console.error("Хатогӣ ҳангоми гирифтани сабади маҳсулот:", error);
            set({ loading: false });
        }
    },
}));

interface AddToCardsState {
    loading: boolean;
    AddToCard: (id: number) => Promise<void>;
}

export const useAddToCards = create<AddToCardsState>((set) => ({
    loading: false,
    AddToCard: async (id: number) => {
        set({ loading: true });
        try {
            await axiosRequest.post(`/Cart/add-product-to-cart?id=${id}`);
            alert("Маҳсулот бо муваффақият илова шуд!");
            set({ loading: false });
        } catch (error) {
            const message = "Бубахшед ин алакай ба сабади шумо хаст!!";
            console.error("Хатогӣ ҳангоми илова ба сабад:", error);
            set({ loading: false });
            alert(message)
        }
    },
}));

interface DeleteToCardsState {
    loading: boolean;
    DeleteToCard: (id: number) => Promise<void>;
}

export const useDeleteToCard = create<DeleteToCardsState>((set) => ({
    loading: false,
    DeleteToCard: async (id: number) => {
        set({ loading: true });
        try {
            await axiosRequest.delete(`/Cart/delete-product-from-cart?id=${id}`);
            useCards.getState().getCategory();
            alert("Маҳсулот бо муваффақият бекор шуд");
            set({ loading: false });
        } catch (error) {
            console.error("Хатогӣ ҳангоми нест кардан:", error);
            set({ loading: false });
        }
    },
}));

const addToWishlist = (product) => {
    // 1. Гирифтани маълумотҳои кӯҳна аз localStorage
    const existingWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // 2. Санҷиш: оё ин маҳсулот аллакай дар wishlist ҳаст?
    const isExist = existingWishlist.find(item => item.id === product.id);

    if (!isExist) {
        // 3. Илова кардани маҳсулоти нав
        const updatedWishlist = [...existingWishlist, product];
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        alert("Ба рӯйхати хоҳишҳо илова шуд!");
    } else {
        alert("Ин маҳсулот аллакай илова шудааст");
    }
};