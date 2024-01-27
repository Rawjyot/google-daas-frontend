import { useState } from "react";
import { Link } from "react-router-dom";

export default function SidebarItem({ item }) {
  const [open, setOpen] = useState(false);
  // console.log(item);

  if (item.childrens) {
    return (
      <div className={open ? "sidebar-item open" : "sidebar-item"}>
        <div className="sidebar-title">
          <span>
            <Link to={item.path || "&"} className="flex justify-between">
              {item.icon && <i className={item.icon}></i>}
              {item.title}
            </Link>
          </span>

          <i
            className="bi-chevron-down toggle-btn"
            onClick={() => setOpen(!open)}
          ></i>
        </div>
        <div className="sidebar-content">
          {item.childrens.map((child, index) => (
            <SidebarItem key={index} item={child} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <Link
        to={item.path}
        className="sidebar-item plain underline-offset-0 decoration-0"
      >
        {item.icon && <i className={item.icon}></i>}
        {item.title}
      </Link>
    );
  }
}
