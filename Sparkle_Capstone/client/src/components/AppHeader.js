import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
// import { toast } from "react-toastify";
import {
    Collapse,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
} from "reactstrap";
import { UserProfileContext } from "../providers/UserProfileProvider";

const AppHeader = () => {
    const { getCurrentUser, logout } = useContext(UserProfileContext);
    const user = getCurrentUser();
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const logoutAndReturn = () => {
        return logout().then(() => {
            alert("You are now logged out");
            history.push("/login");
        });
    };

    return (

        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                <a class="navbar-brand" href="http://localhost:3000/">
                    <img src="https://i.imgur.com/iVblKqz.png" alt="Sparkle Logo" width="130" height="50" />
                </a> <br></br>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                {user ? (
                    <NavbarText className="d-sm-none d-md-block">
                        Welcome {user.displayName}
                    </NavbarText>
                ) : null}

                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {user ? (
                            <>
                                <NavItem>
                                    <NavLink to="/explore" tag={Link}>
                                        Explore
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="/my_reviews" tag={Link}>
                                        My Reviews
                                    </NavLink>
                                </NavItem>
                                <>    <NavItem>
                                    <NavLink to="/categories" tag={Link}>
                                        Categories
                                        </NavLink>
                                </NavItem>
                                </>
                                <form class="form-inline my-9 my-lg-0 navbar-right">
                                    <input class="form-control mr-sm-2" type="text" placeholder="Search" />
                                    <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                                </form>
                                <NavItem>
                                    <NavLink onClick={logoutAndReturn} tag={Link}>
                                        Logout
                                    </NavLink>
                                </NavItem>
                            </>
                        ) : (
                                <>
                                    <NavItem>
                                        <NavLink to="/login" tag={Link}>
                                            Login
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink to="/register" tag={Link}>
                                            Register
                                        </NavLink>
                                    </NavItem>
                                </>
                            )}
                    </Nav>


                </Collapse>

            </nav>
        </div>

    );
};

export default AppHeader;
