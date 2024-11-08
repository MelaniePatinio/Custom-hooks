import { useState } from "react";

export const useForm = (initialForm = {}) => {
  const [formState, setformState] = useState(initialForm);

  const onIpuntChange = ({ target }) => {
    const { name, value } = target;
    setformState({ ...formState, [name]: value });
  };

  const onResetForm = () => {
    setformState(initialForm);
  };

  return {
    // my useForm retorna las partes del state
    //asi que desestructuro el usestate
    ...formState,
    onIpuntChange,
    onResetForm,
  };
};
