import React from "react";
import { Card } from "reactstrap";

const CategorySummaryCard = ({ category }) => {
    return (
        <Card className="post-summary__card">
            <div className="row">
                <div className="col-lg-5 col-sm-12 py-3">
                    <div>
                        <h4> {category.name}</h4>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default CategorySummaryCard;
