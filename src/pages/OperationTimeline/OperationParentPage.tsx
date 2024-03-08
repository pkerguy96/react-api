import { useState } from "react";
import StepperComponant from "../../components/StepperComponant";
import PatientOperation from "../PatientOperation";
import AppointmentStepPage from "../../components/AppointmentStepPage";
import useGlobalStore from "../../zustand/useGlobalStore";
import AddOrdonance from "../AddOrdonance";

const OperationParentPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { id, ordonanceId, operationId } = useGlobalStore();
  console.log(id, ordonanceId, operationId);

  const handleStepChange = (newStep: any) => {
    setActiveStep(newStep);
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <StepperComponant activeStep={activeStep} />
      {activeStep === 0 && (
        <PatientOperation
          onNext={() => {
            handleStepChange(1);
          }}
        />
      )}

      {activeStep === 1 && (
        <AppointmentStepPage onNext={() => handleStepChange(2)} />
      )}
      {activeStep === 2 && <AddOrdonance onNext={() => handleStepChange(3)} />}
    </div>
  );
};

export default OperationParentPage;
