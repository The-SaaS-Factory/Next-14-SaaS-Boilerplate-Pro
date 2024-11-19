"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { constants } from "@/lib/constants";
import { updateProfileFields } from "@/actions/admin/userModule/update-profile-fields";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { makeOrganizationOnboardingCompleted } from "@/actions/global/onboardingModule/make-organization-onboarding-completed";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { track } from "@vercel/analytics";

export default function Component() {
  const [organizationType, setOrganizationType] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigation = useRouter();
  const { width, height } = useWindowSize();

  const handleSubmit = async (event: any) => {
    //#fix type here
    event.preventDefault();
    await updateProfileFields([
      {
        settingName: "isTOSAccepted",
        settingValue: agreed,
      },
      {
        settingName: "type",
        settingValue: organizationType,
      },
    ])
      .then(async () => {
        setShowConfetti(true);
        track("complete_onboarding", {
          organizationType,
        });
        await makeOrganizationOnboardingCompleted();
        setTimeout(() => {
          navigation.push("/home");
        }, 3000);
      })
      .catch((e) => console.log(e.message));
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-50 to-orange-50 flex items-center justify-center z-50">
      {showConfetti && <Confetti width={width} height={height} />}{" "}
      {/* Confetti */}
      <div className="max-w-xl w-full p-8 bg-white rounded-3xl shadow-lg">
        <div className="flex items-center mb-8">
          <h1 className="text-2xl mx-auto font-semibold text-primary">
            {constants.appName}
          </h1>
        </div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary mb-2">Welcome!</h2>
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
              {constants.tanantModelName} type
            </label>
            <Select
              onValueChange={(value) => setOrganizationType(value as string)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a profile type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Developer">Developer</SelectItem>
                  <SelectItem value="Entrepreneur">Entrepreneur</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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
            disabled={!agreed || !organizationType}
          >
            Complete Onboarding
          </Button>
        </form>
      </div>
    </div>
  );
}
