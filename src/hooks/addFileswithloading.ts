import { useMutation } from "@tanstack/react-query";
import React from "react";
import axiosInstance from "../services/Http";

const addFileswithloading = <T>(Tname: T, service: any) => {
  const mutation = useMutation((data: T) =>
    axiosInstance.post<T>(service.endpoint, data, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(percentCompleted); // Log the progress or use it as needed
      },
    })
  );

  return mutation;
};

export default addFileswithloading;
