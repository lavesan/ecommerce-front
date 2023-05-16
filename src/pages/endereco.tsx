import ChooseAddress from "@/containers/ChooseAddress";

import { ReturnStepLayout } from "@/components/ReturnStepLayout";
import { useGoBack } from "@/hooks/useGoBack";

const AddressPage = () => {
  const { goBack } = useGoBack();

  return (
    <ReturnStepLayout>
      <ChooseAddress onChoose={goBack} />
    </ReturnStepLayout>
  );
};

export default AddressPage;
