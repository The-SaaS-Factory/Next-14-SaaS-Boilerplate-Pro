"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { constants } from "@/lib/constants";
import { updateProfileFields } from "@/actions/admin/userModule/update-profile-fields";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { makeOrganizationOnboardingCompleted } from "@/actions/global/onboardingModule/make-organization-onboarding-completed";
import { useMembership } from "@/utils/hooks/useMembership";

export default function Component() {
  const [projectName, setProjectName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigation = useRouter();
  const { width, height } = useWindowSize();

  const { organization } = useMembership();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateProfileFields([
      {
        name: "isTOSAccepted",
        value: agreed,
      },
      {
        name: "name",
        value: projectName,
      },
    ])
      .then(() => {
        setShowConfetti(true);
        makeOrganizationOnboardingCompleted();
        setTimeout(() => {
          window.location.reload();
         // navigation.push("/home", {});
        }, 5000);
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    if (organization?.isOnboardingCompleted) {
      navigation.push("/home", {});
    }
  }, [organization]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-50 to-orange-50 flex items-center justify-center z-50">
      {showConfetti && <Confetti width={width} height={height} />}{" "}
      {/* Confetti */}
      <div className="max-w-xl w-full p-8 bg-white rounded-3xl shadow-lg">
        <div className="flex items-center mb-8">
          <h1 className="text-2xl mx-auto font-semibold text-gray-900">
            {constants.appName}
          </h1>
        </div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome!</h2>
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
              className="block text-sm font-medium text-gray-700 mb-1"
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
            Complete Onboarding
          </Button>
        </form>
      </div>
    </div>
  );
}
