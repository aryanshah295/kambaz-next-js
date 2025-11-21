import React from 'react';
 
import { Modal, Button} from "react-bootstrap";

export default function AssignmentDeleteModal({show, dialogTitle, assignmentId, deleteAssignment, handleClose}: {
    show: boolean; dialogTitle: string; assignmentId: string; deleteAssignment: (assignmentId: string) => void; handleClose: () => void;
}
) {
  return (
    <Modal show={show} >
        <Modal.Header> {dialogTitle} </Modal.Header>
        <Modal.Body> Do you want to delete Assignment? </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={() => {
                deleteAssignment(assignmentId);
                handleClose();
            }} >Yes</Button>
            
            <Button variant="secondary" onClick={handleClose} > No </Button>

        </Modal.Footer>
    </Modal>
  )
}
