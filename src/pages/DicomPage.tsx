import Uploadstable from "../components/Uploadstable";
import useUserRoles from "../zustand/UseRoles";

const DicomPage = () => {
  const { can } = useUserRoles();
  return can(["Super-Admin", "access_document"]) && <Uploadstable />;
};

export default DicomPage;
