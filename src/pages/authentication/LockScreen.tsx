import {AuthSimpleLayout, LockScreenForm} from "@frs535/react-ui-components";

const LockScreen = () => {
  return (
    <AuthSimpleLayout logo={false} className="col-xl-5 col-xxl-3">
      <LockScreenForm  />
    </AuthSimpleLayout>
  );
};

export default LockScreen;
