import { create } from "zustand";

interface UserRoles {
  can: (permissions: string[]) => boolean;
}

const useUserRoles = create<UserRoles>((set) => {
  let userData: { roles: string[] } = { roles: [] };
  let loadedFromLocalStorage = false;

  // Function to load user roles from localStorage
  const loadUserRolesFromLocalStorage = () => {
    if (!loadedFromLocalStorage) {
      console.log("not loaded");
      const userDataFromLocalStorage = localStorage.getItem("user_login");
      if (userDataFromLocalStorage) {
        userData = JSON.parse(userDataFromLocalStorage);
        loadedFromLocalStorage = true;
      }
    }
  };

  const can = (permissions: string[]) => {
    if (!loadedFromLocalStorage) {
      console.log("not loaded retrying");

      loadUserRolesFromLocalStorage();
    }
    return permissions.some((permission) =>
      userData?.roles?.includes(permission)
    );
  };

  return { can };
});

export default useUserRoles;
