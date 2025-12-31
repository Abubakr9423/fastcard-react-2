import { axiosRequest, SaveToken } from '@/utils/axios';
import { create } from 'zustand';
import { toast } from "react-toastify";

export const api = import.meta.env.VITE_API;

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

interface LogState {
    user: any | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    loginUser: (values: any) => Promise<void>;
}

interface ProductFilters {
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

interface ProductsData {
    products: Product[];
}

interface ProductState {
    data: ProductsData | null;
    filters: ProductFilters;
    setFilters: (filters: Partial<ProductFilters>) => void;
    fetchProducts: () => Promise<void>;
}

interface SubCategory {
    id: number;
    subCategoryName: string;
}

interface CategoryState {
    isCategoria: SubCategory[];
    loading: boolean;
    getCategory: () => Promise<void>;
}

interface AddUserState {
    loading: boolean;
    error: string | null;
    addUser: (newUser: any) => Promise<boolean>;
}

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

interface AddToCardsState {
    loading: boolean;
    AddToCard: (id: number) => Promise<void>;
}

interface DeleteToCardsState {
    loading: boolean;
    DeleteToCard: (id: number) => Promise<void>;
}

interface DeleteToCardsStateAll {
    loading: boolean;
    DeleteToCardAll: () => Promise<void>;
}

interface UserRole {
    id: string;
    name: string;
}

interface UserProfile {
    userName: string;
    userId: string;
    image: string;
    userRoles: UserRole[];
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dob: string;
}

interface UserProfileGet {
    data: UserProfile[];
    loading: boolean;
    getProfile: (username: string) => Promise<void>;
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
            let message = err.response?.data?.message || err.message || "Unexpected error";
            set({ loading: false, error: message });
        }
    },
}));

export const useProductStore = create<ProductState>((set, get) => ({
    data: null,
    filters: { pageNumber: 1, pageSize: 10 },
    setFilters: (newFilters) => set((state) => ({ filters: { ...state.filters, ...newFilters } })),
    fetchProducts: async () => {
        try {
            const { filters } = get();
            const response = await axiosRequest.get<{ data: ProductsData }>("/Product/get-products", { params: filters });
            set({ data: response.data.data });
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    },
}));

export const useCategory = create<CategoryState>((set) => ({
    isCategoria: [],
    loading: false,
    getCategory: async () => {
        set({ loading: true });
        try {
            const { data } = await axiosRequest.get("/SubCategory/get-sub-category");
            set({ isCategoria: data.data, loading: false });
        } catch (error) {
            set({ loading: false });
        }
    },
}));

export const useUserStore = create<AddUserState>((set) => ({
    loading: false,
    error: null,
    addUser: async (newUser) => {
        set({ loading: true, error: null });
        try {
            const response = await axiosRequest.post("/Account/register", newUser);
            set({ loading: false });
            return response.status === 200 || response.status === 201;
        } catch (error: any) {
            set({ loading: false, error: error.response?.data?.message || "Error" });
            return false;
        }
    },
}));

export const useCards = create<CardsState>((set) => ({
    isCards: [],
    loading: false,
    getCategory: async () => {
        set({ loading: true });
        try {
            const { data } = await axiosRequest.get("/Cart/get-products-from-cart");
            set({ isCards: data?.data?.[0]?.productsInCart || [], loading: false });
        } catch (error) {
            set({ loading: false });
        }
    },
}));

export const useAddToCards = create<AddToCardsState>((set) => ({
    loading: false,
    AddToCard: async (id) => {
        set({ loading: true });
        try {
            await axiosRequest.post(`/Cart/add-product-to-cart?id=${id}`);
            toast.success("Маҳсулот ба сабад илова шуд!");
            useCards.getState().getCategory();
            set({ loading: false });
        } catch (error) {
            toast.error("Маҳсулот аллакай дар сабад аст!");
            set({ loading: false });
        }
    },
}));

export const useDeleteToCard = create<DeleteToCardsState>((set) => ({
    loading: false,
    DeleteToCard: async (id) => {
        set({ loading: true });
        try {
            await axiosRequest.delete(`/Cart/delete-product-from-cart?id=${id}`);
            useCards.getState().getCategory();
            toast.info("Маҳсулот нест карда шуд");
            set({ loading: false });
        } catch (error) {
            set({ loading: false });
        }
    },
}));

export const useDeleteToCardAll = create<DeleteToCardsStateAll>((set) => ({
    loading: false,
    DeleteToCardAll: async () => {
        set({ loading: true });
        try {
            await axiosRequest.delete(`/Cart/clear-cart`);
            useCards.getState().getCategory();
            toast.success("Сабад тоза шуд");
            set({ loading: false });
        } catch (error) {
            set({ loading: false });
        }
    },
}));

export const userProfile = create<UserProfileGet>((set) => ({
    data: [],
    loading: false,
    getProfile: async (username) => {
        set({ loading: true });
        try {
            const { data } = await axiosRequest.get(`/UserProfile/get-user-profiles?UserName=${username}`);
            set({ data: data.data, loading: false });
        } catch (error) {
            set({ loading: false });
        }
    },
}));

export const addToWishlist = (product: Product): void => {
    const wishlistData = localStorage.getItem('wishlist');
    const existingWishlist: Product[] = wishlistData ? JSON.parse(wishlistData) : [];
    const isExist = existingWishlist.find((item) => item.id === product.id);

    if (!isExist) {
        const updatedWishlist = [...existingWishlist, product];
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        toast.success("Ба рӯйхати хоҳишҳо илова шуд");
    } else {
        toast.error("Ин маҳсулот аллакай илова шудааст");
    }
};




export const getProfile = async (): Promise<void> => {
    const username = localStorage.getItem("user");
    if (!username) {
        console.warn("No user found in localStorage");
        return;
    }

    try {
        const { data } = await axiosRequest.get(`/UserProfile/get-user-profiles?UserName=${username}`);
        console.log(data.data[0].userId);
    } catch (error) {
        console.error("Failed to fetch profile:", error);
    }
};


export const getProfileInfo = async (id: number): Promise<any> => {
    try {
        const { data } = await axiosRequest.get(`/UserProfile/get-user-profile-by-id?id=${id}`);
        return data.data; // ✅ return payload
    } catch (error) {
        console.error(error);
        throw error; // rethrow so caller can handle
    }
};


export const editProfile = async (edited:any): Promise<any> => {
    try {
        await axiosRequest.put(`/UserProfile/update-user-profile`,edited)
    } catch (error) {
        console.error(error);
        
    }
}