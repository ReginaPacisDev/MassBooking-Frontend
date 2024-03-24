import FormButton from "../../../components/FormButton";
import FormInput from "../../../components/FormInput";
import Loader from "../../../components/Loader";
import { SuperAdminController } from "../../../controllers";

export const SuperAdmin = () => {
  const { openLoader, info, handleChange, handleSubmit } =
    SuperAdminController();

  return (
    <div>
      <Loader open={openLoader} />
      <div>
        <h3 className="mb-7">Send invite to a sub-admin</h3>

        <div className="mb-5">
          <FormInput
            label="Email"
            error={info.email.error}
            value={info.email.value}
            inputId="email"
            addborder
            handleInputChange={handleChange}
          />
        </div>

        <FormButton value="Send Invite" handleClick={handleSubmit} />
      </div>
    </div>
  );
};

export default SuperAdmin;
