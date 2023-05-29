import "./navbar.css";
import { useRouter } from "../../hooks/useRouter";
import { NavElement } from "../../types/Navbar";

interface NavbarProps {
  navbarContent: NavElement[];
}

const Navbar: React.FC<NavbarProps> = ({ navbarContent }) => {
  const { currentPath, routeTo } = useRouter();
  console.log(navbarContent);

  const navbarMenuClickHandler = (path: string) => {
    routeTo(path);
  };
  return (
    <nav className="navbar">
      <ul>
        {navbarContent.map((element) => {
          return (
            <li
              key={element.path}
              className={
                currentPath === element.path
                  ? "navbar-menu selected"
                  : "navbar-menu"
              }
              onClick={() => navbarMenuClickHandler(element.path)}
            >
              {element.label}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
