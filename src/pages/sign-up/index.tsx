import FormSignUp from "components/FormSignUp";
import Auth from "templates/Auth";

const SignUp = () => {
  return (
    //@ts-ignore
    <Auth title="Cadastrar">
      <FormSignUp />
    </Auth>
  );
};

export default SignUp;
