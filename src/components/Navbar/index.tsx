import "./navbar.css";
import { useRouter } from "../../hooks/useRouter";
import { NavElement } from "../../types/Navbar";

interface NavbarProps {
  navbarContent: NavElement[];
}

const getUserInfoFuc = () => {
  const user = localStorage.getItem("userInfo");
  if (user) {
    return JSON.parse(user).id;
  }
  return "fail";
};

const Navbar: React.FC<NavbarProps> = ({ navbarContent }) => {
  const { currentPath, routeTo } = useRouter();

  const user = getUserInfoFuc();

  console.log(user);

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
