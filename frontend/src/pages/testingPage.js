import React from "react";
import GenericBox from "components/GenericComponents/GenericBox";
import Modal from "components/Modals/Modal";
import ReviewModal from "components/Modals/ReviewModal/ReviewModal"

const TestingPage = () => {
    return (
      <div>
       <Modal
          initialModal={"Add Review"}
        />
      </div>
    );
};

export default TestingPage;