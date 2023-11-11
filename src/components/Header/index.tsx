import React, { useState } from "react";

import { BsFillLightbulbFill } from "react-icons/bs";
import { MdDarkMode } from "react-icons/md";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import LokiIcon from '../../assets/loki_icon.svg'
import { useTheme } from "../../hooks/useTheme";

import SideBar from "../Sidebar";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, toggleTheme  } = useTheme();

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return(
        
        <div className="flex justify-between dark:bg-slate-950 dark:bg-opacity-50 bg-white mb-10 p-10 ">
            
            <div>
                <FontAwesomeIcon icon={faBars} onClick={handleMenuToggle} />
                {isMenuOpen && <div className="fixed inset-0 bg-black opacity-50" onClick={handleMenuToggle}></div>}
                {isMenuOpen && <SideBar isOpen={isMenuOpen} />}
            </div>

            <img src={LokiIcon} alt="Icone Loki" width={200} height={200} />


            <div>
                {
                    theme === "light" ? (
                        <MdDarkMode
                        onClick={toggleTheme}
                        size={30}
                        className="cursor-pointer"
                        />
                    ) : (
                        <BsFillLightbulbFill
                        onClick={toggleTheme}
                        size={30}
                        className="cursor-pointer"
                        />
                    )
                }
            </div>
        </div>
    )   
}