import { Icon } from "@iconify/react";

import { NavLink } from "react-router-dom";

interface LinkProps {
  to: string;
  icon: string;
  label: string;
}

export default function NavBarLink(props: LinkProps) {
  return (
    <NavLink
      to={props.to}
      className=" flex flex-row items-center gap-x-2 px-2 py-2 text-slate-200 duration-150 hover:text-tahiti-light"
    >
      <Icon
        icon={props.icon}
        height={18}
        className="float-left mr-1 inline-block"
        inline={true}
      />
      {props.label}
    </NavLink>
  );
}
