import Navbar from "../components/Navbar";
import { NavbarContent } from "../router";

interface GeneralLayoutProps {
  children: React.ReactNode;
}

const GeneralLayout: React.FC<GeneralLayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar navbarContent={NavbarContent} />
      <div>{children}</div>
    </div>
  );
};

export default GeneralLayout;
