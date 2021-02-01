import React, { useEffect, useState, useContext } from "react";
import {
    ListGroup,
    ListGroupItem
} from "reactstrap";
import CategorySummaryCard from "../components/CategorySummaryCard";
// import { Category } from "../components/Category.js";
import { UserProfileContext } from "../providers/UserProfileProvider";

const CategoryManager = () => {
    const { getToken } = useContext(UserProfileContext);
    const [categories, setCategories] = useState([]);


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
                    console.log(categories); setCategories(categories);
                })
        );
    };


    return (
        <div className="container mt-5">
            <h1>Categories</h1>
            <div>
                <div>
                    <ListGroup>
                        {categories.map((category) => (
                            <ListGroupItem key={category.id}>
                                <CategorySummaryCard category={category} />
                            </ListGroupItem>
                        ))}
                    </ListGroup>

                </div>
            </div>
        </div>
    );
};

export default CategoryManager;
