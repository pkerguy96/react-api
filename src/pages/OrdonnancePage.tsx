import OrdonanceTable from "../components/OrdonanceTable";
import useUserRoles from "../zustand/UseRoles";

const OrdonnancePage = () => {
  const { can } = useUserRoles();
  return can(["Super-Admin", "access_ordonance"]) && <OrdonanceTable />;
};

export default OrdonnancePage;
