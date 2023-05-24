import AddUserModal from "../../../modals/UserModal/AddUser/AddUserModal";

const AddUser: React.FC = () => {
  return (
    <div>
      <button
        type="button"
        className="btn btn-success mr-1 mb-3"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Add User
      </button>

      <AddUserModal />
    </div>
  );
};

export default AddUser;
