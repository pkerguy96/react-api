import { useMutation } from "@tanstack/react-query";

const addGlobal = <T>(Tname: T, service: any, options: any = {}) => {
  const mutation = useMutation((data: T) => service.Postall(data, options));

  return mutation;
};
export default addGlobal;
