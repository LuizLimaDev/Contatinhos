import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocalStorage } from "react-use";
import { notifyError } from "../utils/toast/toast";
import api from "../services/api";

export const useLogin = () => {
  const [value, setValue] = useLocalStorage('token');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!email || !senha) {
      notifyError('Todos os campos são necessários');
      return;
    }

    try {
      const response = await api.post('/login', {
        email,
        senha,
      })

      const { token } = response.data
      setValue(`${token}`);
      navigate('/home');

    } catch (error) {
      notifyError(error.response.data)
    }
  }

  useEffect(() => {
    if (value) {
      Navigate('/home');
    }
  }, [value, navigate]);

  return {
    email,
    setEmail,
    senha,
    setSenha,
    handleSubmit
  }
}

