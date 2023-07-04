import FormSignIn from "components/FormSignIn";
import Auth from "templates/Auth";

const SignIn = () => {
  return (
    //@ts-ignore
    <Auth title="Login">
      <FormSignIn />
    </Auth>
  );
};

export default SignIn;
