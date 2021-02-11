import React from "react";
import { Card } from "reactstrap";

const CategorySummaryCard = ({ category }) => {
    return (
        <Card>
            <div >
                <div className=" py-3 ">
                    <div>
                        <h4 > {category.name}</h4>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default CategorySummaryCard;
