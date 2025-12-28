import axios from "axios";
import { create } from "zustand";
export const api = import.meta.env.VITE_API

export const useTodo = create((set, get) => ({
    Data: [],
    Categoria: [],

    AddnewUser: async (NewUser) => {
        try {
            const response = await axios.post(`${api}Account/register`, NewUser)
            if (response.status === 200 || response.status === 201) {
                return true;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    },
}))