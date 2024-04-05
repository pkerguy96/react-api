import { create } from "zustand";

interface UserRoles {
  can: (permission: string) => boolean;
}
const useUserRoles = create<UserRoles>((set) => {
  // Retrieve user roles from localStorage or initialize them
  const userDataFromLocalStorage = localStorage.getItem("user_login");
  const userData = userDataFromLocalStorage
    ? JSON.parse(userDataFromLocalStorage)
    : { roles: [] };

  const can = (permission: string) => userData.roles.includes(permission);

  return { can };
});

export default useUserRoles;
