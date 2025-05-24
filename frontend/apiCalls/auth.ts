import { addNewNoteType } from "@/lib/zod-schemas";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  withCredentials: true,
});

type AuthPayload = {
  email: string;
  password: string;
};

type SignUpPayload = AuthPayload & {
  name?: string;
};

type ApiCallProps<T> = {
  url: string;
  data: T;
};

type AddNewNote = {
  data: addNewNoteType;
};

type UpdateNotePayload = {
  slug: string;
  data: Partial<addNewNoteType>;
};

const handleApiError = (error: any) => {
  if (error?.response?.data) {
    throw new Error(error.response.data.detail || "Something went wrong");
  }
  throw new Error("Something went wrong. Try again.");
};

export const signUpApiCall = async ({
  url,
  data,
}: ApiCallProps<SignUpPayload>) => {
  try {
    const response = await api.post(url, data);
    return response.data.user;
  } catch (error) {
    handleApiError(error);
  }
};

export const signInApiCall = async ({
  url,
  data,
}: ApiCallProps<AuthPayload>) => {
  try {
    const response = await api.post(url, data);
    return response.data.user;
  } catch (error) {
    handleApiError(error);
  }
};

export const getProfileApiCall = async () => {
  try {
    const response = await api.get("profile/");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getUserNotes = async () => {
  try {
    const response = await api.get("notes/");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const logoutApiCall = async () => {
  try {
    const response = await api.post("logout/");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const addNewNoteApiCall = async ({ data }: AddNewNote) => {
  try {
    const response = await api.post("notes/", data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchNotesByQuery = async (query: string) => {
  try {
    const response = await api.get(`notes/search/?q=${query}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const featchNoteDeatailApiCall = async (slug: string) => {
  try {
    const response = await api.get(`notes/${slug}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteNoteApiCall = async (slug: string) => {
  try {
    const response = await api.delete(`notes/delete/${slug}/`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateNoteApiCall = async ({ slug, data }: UpdateNotePayload) => {
  try {
    const response = await api.patch(`notes/update/${slug}/`, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
