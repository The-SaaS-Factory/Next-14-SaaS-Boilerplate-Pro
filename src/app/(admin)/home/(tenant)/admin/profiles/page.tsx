"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PageName from "@/components/ui/commons/PageName";
import { Profile, ProfileType } from "@prisma/client";
import { toast } from "sonner";
import { track } from "@vercel/analytics";
import ProfileCard from "./ui/ProfileCard";
import { getOrganizationProfiles } from "@/actions/global/profilesModule/get-organization-profiles";
import { createProfile } from "@/actions/global/profilesModule/create-profile";

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState<Profile[]>([] as Profile[]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProfile, setNewProfile] = useState<{
    name: string;
    type: ProfileType;
  }>({ name: "", type: ProfileType.MARKETPLACE });

  const handleCreateProfile = async () => {
    await createProfile(newProfile.name, newProfile.type)
      .then(() => {
        track("new_profile_created", {
          type: newProfile.type,
        });
        toast.success("Profile created successfully");
        setIsDialogOpen(false);
        getAllProfiles();
        setNewProfile({ name: "", type: ProfileType.MARKETPLACE });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const getAllProfiles = async () => {
    const profiles: Profile[] = await getOrganizationProfiles();
    setProfiles(profiles as Profile[]);
  };

  useEffect(() => {
    getAllProfiles();
  }, []);

  return (
    <div>
      <PageName name="My Profiles" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Card className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
              <CardContent className="flex flex-col items-center justify-center h-full">
                <Plus className="h-12 w-12 text mb-2" />
                <p className="text-lg font-semibold"> Create new profile</p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                <h2 className="text-lg text font-semibold">
                  Create new profile
                </h2>
              </DialogTitle>
            </DialogHeader>
            <div className="grid text gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name">Public Name</label>
                <Input
                  id="name"
                  value={newProfile.name}
                  onChange={(e) =>
                    setNewProfile({ ...newProfile, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="status">Profile for</label>
                <Select
                  value={newProfile.type}
                  onValueChange={(value) =>
                    setNewProfile({
                      ...newProfile,
                      type: value as Profile["type"],
                    })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Type Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MARKETPLACE">Marketplace</SelectItem>
                    <SelectItem value="DIRECTORYDEVELOPER">
                      Developer
                    </SelectItem>
                    <SelectItem value="DIRECTORYPROJECT">Project</SelectItem>
                    <SelectItem value="DIRECTORYTOOLS">Tools</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleCreateProfile}>Create</Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
