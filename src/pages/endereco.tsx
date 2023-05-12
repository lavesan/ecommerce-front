import { ReturnStepLayout } from "@/components/ReturnStepLayout";
import ChooseAddress from "@/containers/ChooseAddress";
import { useGoBack } from "@/hooks/useGoBack";

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default () => {
  const { goBack } = useGoBack();

  return (
    <ReturnStepLayout>
      <ChooseAddress onChoose={goBack} />
    </ReturnStepLayout>
  );
};
