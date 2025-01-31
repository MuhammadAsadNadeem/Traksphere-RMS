import { MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";

interface ItemProps {
  title: string;
  path: string;
  icon: React.ReactNode;
  colors: string;
}

const Item: React.FC<ItemProps> = ({ title, path, icon, colors }) => {
  const location = useLocation();

  return (
    <MenuItem
      icon={icon}
      style={{
        color: path === location.pathname ? colors : "",
      }}
    >
      <Link to={path} style={{ textDecoration: "none", color: "inherit" }}>
        {title}
      </Link>
    </MenuItem>
  );
};

export default Item;
