
// import React, { useState } from "react";
// import {
//     Button,
//     ButtonGroup,
//     Form,
//     Input,
//     InputGroup,
//     Modal,
//     ModalBody,
//     ModalFooter,
//     ModalHeader,
// } from "reactstrap";

// const Review = ({ review }) => {
//     const [isEditing, setIsEditing] = useState(false);
//     const [pendingDelete, setPendingDelete] = useState(false);
//     const [reviewEdits, setReviewEdits] = useState("");

//     const showEditForm = () => {
//         setIsEditing(true);
//         setReviewEdits(review.NameOfProduct);
//     };

//     const hideEditForm = () => {
//         setIsEditing(false);
//         setReviewEdits("");
//     };
//     category
//     post
//     return (
//         <div className="justify-content-between row">
//             {isEditing ? (
//                 <Form className="w-100">
//                     <InputGroup>
//                         <Input
//                             size="sm"
//                             onChange={(e) => setReviewEdits(e.target.value)}
//                             value={reviewEdits}
//                         />
//                         <ButtonGroup size="sm">
//                             <Button onClick={showEditForm}>Save</Button>
//                             <Button outline color="danger" onClick={hideEditForm}>
//                                 Cancel
//                         </Button>
//                         </ButtonGroup>
//                     </InputGroup>
//                 </Form>
//             ) : (
//                     <>
//                         <div className="p-1">{Review.NameOfProduct}</div>
//                         <ButtonGroup size="sm">
//                             <Button className="btn btn-primary" onClick={showEditForm}>
//                                 Edit
//                             </Button>
//                             <Button
//                                 className="btn btn-danger"
//                                 onClick={(e) => setPendingDelete(true)}
//                             >
//                                 Delete
//                             </Button>
//                         </ButtonGroup>
//                     </>
//                 )}
//             <Modal isOpen={pendingDelete}>
//                 <ModalHeader>Delete {review.NameOfProduct} Review?</ModalHeader>
//                 <ModalBody>
//                     Are you sure you want to delete this Review?
//             </ModalBody>
//                 <ModalFooter>
//                     <Button onClick={(e) => setPendingDelete(false)}>No, Cancel</Button>
//                     <Button className="btn btn-outline-danger">Yes, Delete</Button>
//                 </ModalFooter>
//             </Modal>
//         </div>
//     );
// };

// export default Review;