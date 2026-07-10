import type { ReactNode } from "react";

interface NavItemProps {
  href: string;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  active?: boolean;
}

const NavItem = ({ href, children, onClick, className = "", active = false }: NavItemProps) => {
  const baseClasses = "transition font-medium";
  const activeClasses = active
    ? "bg-yellow-400 text-gray-900"
    : "text-white hover:bg-white/10";
  
  return (
    <a
      href={href}
      onClick={onClick}
      className={`${baseClasses} ${activeClasses} ${className}`}
    >
      {children}
    </a>
  );
};

export default NavItem;