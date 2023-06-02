import Navbar from "../components/Navbar";
import { NavbarContent } from "../router";

interface GeneralLayoutProps {
  children: React.ReactNode;
}

const GeneralLayout: React.FC<GeneralLayoutProps> = ({ children }) => {
  return (
    <div className="general-layout">
      <Navbar navbarContent={NavbarContent} />
      <div className="general-layout-body">{children}</div>
    </div>
  );
};

export default GeneralLayout;
