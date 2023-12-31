import axios from "./config";

import { Client,  UpdateClient } from "@/interfaces/Client";
import Cookies from "js-cookie";

export const getAllPersons = async () => {
  const response = await axios.get<Client[]>("/client", {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
};
export const createClientAPI = async (client: Client) => {
  const response = await axios.post<UpdateClient>("/person", client, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
};

export const updateClientAPI = async (client: Client) => {
  const response = await axios.put<UpdateClient>(
    `/person/${client.id}`,
    client,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
  console.log(response.data);
  
  return response.data;
}

export const getClientByIdAPI = async (id: string) => {
  const response = await axios.get<Client>(`/clients/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
};
