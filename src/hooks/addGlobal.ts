import { useMutation } from "@tanstack/react-query";

const addGlobal = <T>(Tname: T, service: any) => {
  const mutation = useMutation((data: T) => service.Postall(data));

  return mutation;
};
export default addGlobal;
