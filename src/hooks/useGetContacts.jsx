import { useLocalStorage } from "react-use";
import api from "../services/api";
import { notifyError } from "../utils/toast/toast";

export default function useGetContacts() {
  const [value] = useLocalStorage('token');

  async function getContacts() {
    try {
      const response = await api.get('/contatos', {
        headers: {
          'Authorization': `${value}`
        }
      })

      return response.data;

    } catch (error) {
      notifyError(error.response)
    }
  }

  return {
    getContacts
  }
}