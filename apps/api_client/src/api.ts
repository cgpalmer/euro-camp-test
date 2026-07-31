import axios from "axios";
import { baseURL } from "./constants";
import { ParcData } from "./types";

export const getParcById = async (userId: string) => {
  try {
    const response = await axios.get<ParcData>(`${baseURL}/api/1/parcs/${userId}`);
    return response.data;
  } catch (error) {
     if (axios.isAxiosError(error)) {
        console.log('Get parc by ID:', error.message);
        return;
    } else {
        console.log('Unexpected error:', error);
        return;
    }
  }
};


export const getAllParcs = async () => {
  try {
    const response = await axios.get<ParcData[]>(`${baseURL}/api/1/parcs`);
    return response.data;
  } catch (error) {
     if (axios.isAxiosError(error)) {
        console.log('Get all parcs:', error.message);
        return;
    } else {
        console.log('Unexpected error:', error);
        return;
    }
  }
};

getAllParcs()
