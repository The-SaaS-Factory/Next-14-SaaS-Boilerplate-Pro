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
    <div className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-44">
      <div className="mb-6">
        <div className="flex flex-wrap items-center">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-1 flex-col items-center">
              <div className="relative flex items-center">
                <div
                  className={`flex items-center justify-center rounded-full transition-all ${
                    activeStep >= step.id
                      ? "h-10 w-10 bg-indigo-500 text-white"
                      : "text-primary h-8 w-8 bg-gray-300"
                  }`}
                >
                  {step.id}
                </div>

                {index < steps.length - 1 && (
                  <div className="h-1 flex-1 transition-all delay-200">
                    <div
                      className={`h-1 transition-all ${
                        activeStep > step.id
                          ? "w-full bg-indigo-500"
                          : "w-0 bg-gray-300"
                      }`}
                    ></div>
                  </div>
                )}
              </div>

              <div
                className={`mt-2 text-center text-xs text-gray-700 ${
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

      <div className="mt-6 flex justify-between">
        <button
          name="Anterior"
          title="Anterior"
          type="button"
          onClick={handlePrevStep}
          className={`rounded-md bg-gray-400 px-4 py-2 text-white hover:bg-gray-500 ${
            activeStep === 1 ? "cursor-not-allowed opacity-50" : ""
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
            className="rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600"
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
}
