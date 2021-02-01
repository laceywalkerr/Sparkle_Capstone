import React, { useEffect, useState, useContext } from "react";
import {
    ListGroup,
    ListGroupItem
} from "reactstrap";
import Category from "../components/Category";
import { UserProfileContext } from "../providers/UserProfileProvider";

const CategoryManager = () => {
    const { getToken } = useContext(UserProfileContext);


    useEffect(() => {
        getCategories();

    }, []);

    const getCategories = () => {
        getToken().then((token) =>
            fetch(`/api/category`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((categories) => {
                    setCategories(categories);
                })
        );
    };


    return (
        <div className="container mt-5">
            {/* <img
        height="100"
        src="/photo.png"
        alt="Sparkle Logo"
        className="bg-danger rounded-circle"
      /> */}
            <h1>Categories</h1>
            <div>
                <div>
                    <ListGroup>
                        {categories.map((category) => (
                            <ListGroupItem key={category.id}>
                                <Category category={category} />
                            </ListGroupItem>
                        ))}
                    </ListGroup>

                </div>
            </div>
        </div>
    );
};

export default CategoryManager;
