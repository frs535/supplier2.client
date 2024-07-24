
import {AuthSimpleLayout, ForgotPasswordForm} from "@frs535/react-ui-components";
import {useState} from "react";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    email
    console.log(email)
  return (
    <AuthSimpleLayout className="col-xxl-4">
      <ForgotPasswordForm onEnter={(e)=>setEmail(e)} />
    </AuthSimpleLayout>
  );
};

export default ForgotPassword;
