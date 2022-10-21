import React from "react";
// import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import { LoginMenu } from "../api-authorization/LoginMenu";
import "./NavMenu.css";

export const NavMenu = () => {
	return (
		<header className="navbar">
			<nav className="flex-center nav-container">
				<div>
					 <a href="https://www.thehragency.ca/">
					   <img alt="Go Back to Home Page" src="./images/Logo.png"></img> 
					 </a>

					{/*<Link to="https://www.thehragency.ca/">
						<img src="./images/Logo.png" alt="Logo" />
					</Link>*/}
				</div>
				<div className="flex-center nav-link">
					<ul>
						<li>
							<NavLink to="/">Home</NavLink>
						</li>
						{/*<li>
							<NavLink to="/expert-solution">Expert Solutions</NavLink>
						</li>*/}
						<li>
							<NavLink to="/fileupload">Card Upload</NavLink>
						</li>
						<li>
							<NavLink to="/company">Company Info</NavLink>
						</li>
						<li>
							<LoginMenu></LoginMenu>
						</li>
					</ul>

					<ul>
						<li>
							<a href="https://ca.linkedin.com" target="_blank" rel="noreferrer">
								<img src="./images/LinkedInLogo.png" alt="Logo" />
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
};
