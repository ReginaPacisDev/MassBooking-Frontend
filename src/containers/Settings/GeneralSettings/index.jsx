import FormButton from "../../../components/FormButton";
import FormInput from "../../../components/FormInput";
import Loader from "../../../components/Loader";
import { GeneralSettingsController } from "../../../controllers";

export const GeneralSettings = () => {
  const {
    openLoader,
    user,
    handleChange,
    handleSubmit,
    passwords,
    handlePasswordChange,
  } = GeneralSettingsController();

  return (
    <div>
      <Loader open={openLoader} />

      <div>
        <h3 className="mb-7">Update Details</h3>

        <div className="mb-5">
          <FormInput
            label="Name"
            error={user.name.error}
            value={user.name.value}
            inputId="name"
            addborder
            handleInputChange={handleChange}
          />
        </div>

        <div className="mb-5">
          <FormInput
            label="Email"
            error={user.email.error}
            value={user.email.value}
            inputId="email"
            addborder
            handleInputChange={handleChange}
          />
        </div>

        <FormButton
          value="Update Changes"
          handleClick={() => handleSubmit(false)}
        />
      </div>

      <div className="mt-10">
        <h3 className="mb-7">Change Password</h3>

        <div className="mb-5">
          <FormInput
            label="Password"
            error={passwords.password.error}
            value={passwords.password.value}
            inputId="password"
            addborder
            password
            handleInputChange={handlePasswordChange}
          />
        </div>

        <div className="mb-5">
          <FormInput
            label="Confirm Password"
            error={passwords.confirmPassword.error}
            value={passwords.confirmPassword.value}
            inputId="confirmPassword"
            addborder
            password
            handleInputChange={handlePasswordChange}
          />
        </div>

        <FormButton
          value="Save Changes"
          handleClick={() => handleSubmit(true)}
        />
      </div>
    </div>
  );
};

export default GeneralSettings;
