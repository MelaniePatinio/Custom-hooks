import { useEffect, useState } from "react";

const localCache = {};
//como estoy fuera del scoop se queda como variabel en memoria, que solo este hook tiene acceso a ella
//mas manejo de cache en tanstack query (libreria)

//pido el url como afgumento porque no quiero que este en duro en mi custom hook
export const useFetch = (url) => {
  const [state, setstate] = useState({
    data: null,
    isLoading: true,
    hasError: false,
    error: null,
  });

  useEffect(() => {
    getFethc();
  }, [url]);

  //Creamos un estado para cuando la data esta cargando porque cambia el url

  const setLoadingState = () => {
    setstate({
      data: null,
      isLoading: true,
      hasError: false,
      error: null,
    });
  };

  const getFethc = async () => {
    if (localCache[url]) {
      console.log("usando Cache");
      setstate({
        data: localCache[url],
        isLoading: false,
        hasError: false,
        error: null,
      });
      return;
    }
    setLoadingState();
    const resp = await fetch(url);

    //await new Promise((resolve) => setTimeout(resolve, 1500));

    if (!resp.ok) {
      setstate({
        data: null,
        isLoading: false,
        hasError: true,
        error: {
          code: resp.status,
          message: resp.statusText,
        },
      });
      return;
    }

    const data = await resp.json();
    setstate({ data: data, isLoading: false, hasError: false, error: null });

    //manejo del chache
    localCache[url] = data;
  };

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: setstate.hasError,
  };
};
