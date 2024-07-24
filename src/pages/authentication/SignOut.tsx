import {AuthSimpleLayout, SignOutForm} from "@frs535/react-ui-components";

const SignOut = () => {
  return (
    <AuthSimpleLayout logo={false}>
      <SignOutForm layout="simple" />
    </AuthSimpleLayout>
  );
};

export default SignOut;
