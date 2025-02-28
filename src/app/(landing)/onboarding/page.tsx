"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { constants } from "@/lib/constants";
import { updateProfileFields } from "@/actions/admin/userModule/update-profile-fields";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { makeOrganizationOnboardingCompleted } from "@/actions/global/onboardingModule/make-organization-onboarding-completed";
import { useEffect, useState } from "react";
import { useMembership } from "@/utils/hooks/useMembership";

export default function OnboardingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { organization } = useMembership();

  const [projectName, setProjectName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const handleSubmit = async (event: any) => {
    setIsLoading(true);
    event.preventDefault();
    await updateProfileFields([
      {
        settingName: "isTOSAccepted",
        settingValue: agreed,
      },
      {
        settingName: "name",
        settingValue: projectName,
      },
    ])
      .then(async () => {
        setShowConfetti(true);
        await makeOrganizationOnboardingCompleted();
        setTimeout(() => {
          setIsLoading(false);
          window.location.href = "/home";
        }, 4000);
      })
      .catch((e) => console.log(e.message));

    setIsLoading(false);
  };
 
  useEffect(() => {
    //set name
    if (organization) {
      setProjectName(organization.name);
    }
  }, [organization]);

  return (
    <div className="g-main fixed inset-0 z-50 flex items-center justify-center">
      {showConfetti && <Confetti width={width} height={height} />}{" "}
      <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-lg">
        <div className="mb-8 flex items-center">
          <h1 className="text-primary mx-auto text-2xl font-semibold">
            {constants.appName}
          </h1>
        </div>
        <div className="mb-8 text-center">
          <h2 className="text-primary mb-2 text-3xl font-bold">Welcome!</h2>
          <p className="text-gray-600">
            For the best experience, we recommend setting at least an
            integration. This is necessary so that we can generate reports for
            you.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="projectName"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              {constants.tanantModelName} name
            </label>
            <Input
              id="projectName"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full"
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree with the{" "}
              <Link href="/terms" className="text-blue-600 hover:underline">
                terms and conditions
              </Link>
            </label>
          </div>
          <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-gray-800"
            disabled={!agreed || !projectName}
          >
            {isLoading ? "Loading..." : "Complete Onboarding"}
          </Button>
        </form>
      </div>
    </div>
  );
}
