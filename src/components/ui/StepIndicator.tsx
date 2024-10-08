/* eslint-disable no-unused-vars */
import { ReactNode, useState } from "react";

interface Step {
  name: string;
  id: number;
}

interface Props {
  currentStep?: number;
  children: ReactNode;
  steps: Step[];
  onStepChange?: (step: number) => void;
}

export function StepIndicator({
  currentStep = 1,
  children,
  steps,
  onStepChange,
}: Props) {
  const [activeStep, setActiveStep] = useState(currentStep);

  const handleNextStep = () => {
    setActiveStep((prev) => {
      const nextStep = prev < steps.length ? prev + 1 : prev;
      onStepChange?.(nextStep);
      return nextStep;
    });
  };

  const handlePrevStep = () => {
    setActiveStep((prev) => {
      const prevStep = prev > 1 ? prev - 1 : prev;
      onStepChange?.(prevStep);
      return prevStep;
    });
  };

  return (
    <div className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-44 ">
      <div className="mb-6">
        <div className="flex flex-wrap items-center">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div className="relative flex items-center">
                <div
                  className={`rounded-full flex items-center justify-center transition-all ${
                    activeStep >= step.id
                      ? "bg-indigo-500 text-white h-10 w-10"
                      : "bg-gray-300  text-primary h-8 w-8"
                  }`}
                >
                  {step.id}
                </div>

                {index < steps.length - 1 && (
                  <div className="flex-1 h-1 transition-all delay-200">
                    <div
                      className={`h-1 transition-all ${
                        activeStep > step.id
                          ? "bg-indigo-500 w-full"
                          : "bg-gray-300 w-0"
                      }`}
                    ></div>
                  </div>
                )}
              </div>

              <div
                className={`text-center text-xs mt-2 text-gray-700 ${
                  activeStep !== step.id && "portrait:hidden"
                }`}
              >
                {step.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {children}

      <div className="flex justify-between mt-6">
        <button
          name="Anterior"
          title="Anterior"
          type="button"
          onClick={handlePrevStep}
          className={`px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 ${
            activeStep === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={activeStep === 1}
        >
          Anterior
        </button>

        {currentStep !== steps.length && (
          <button
            name="Siguiente"
            title="Siguiente"
            type="button"
            onClick={handleNextStep}
            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
}
