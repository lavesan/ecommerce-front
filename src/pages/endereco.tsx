import { ReturnStepLayout } from "@/components/ReturnStepLayout";
import ChooseAddress from "@/containers/ChooseAddress";
import { useRouter } from "next/router";

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default () => {
  const router = useRouter();

  return (
    <ReturnStepLayout>
      <ChooseAddress onChoose={() => router.back()} />
    </ReturnStepLayout>
  );
};
