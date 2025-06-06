"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function UserProfile() {
  const [userData, setUserData] = useState({
    name: "Jess Lee Dassan",
    email: "DassanJess@example.com",
    password: "********",
    experience: "5 years in software development.",
    disability: "Dyslexic",
    wants: "Remote job with flexible hours.",
    circumstances: "Living in a rural area with limited job opportunities.",
    file: "resume.pdf",
    profilePicture: "/placeholder.jpg",
    capabilities: {
      readingWriting: 7,
      vision: 6,
      hearing: 6,
      speechCommunication: 6,
      physicalAbility: 7,
      mentalFocus: 6,
      financialWorkBarriers: 5,
      legalSocialBarriers: 7,
      caregiversDependents: 6,
      techSkills: 6,
    },
  });

  return (
    <div className="w-full h-min-screen flex flex-col items-center justify-center">
    <Card className="w-full mx-auto mt-28 mb-8 p-6">
      <CardHeader className="flex flex-col items-center">
        <Avatar className="w-24 h-24">
          <AvatarImage src={userData.profilePicture} alt="Profile Picture" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <CardTitle className="mt-4">{userData.name}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input value={userData.email} readOnly />
          </div>
          <div>
            <Label>Password</Label>
            <Input value={userData.password} type="password" readOnly />
          </div>
          <div>
            <Label>Experience</Label>
            <Input value={userData.experience} readOnly />
          </div>
          <div>
            <Label>Disability</Label>
            <Input value={userData.disability} readOnly />
          </div>
          <div>
            <Label>Wants</Label>
            <Input value={userData.wants} readOnly />
          </div>
          <div>
            <Label>Circumstances</Label>
            <Input value={userData.circumstances} readOnly />
          </div>
        </div>

        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Capability</TableHead>
                <TableHead>Scale</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(userData.capabilities).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell>{key.replace(/([A-Z])/g, ' $1').trim()}</TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <Button className="w-full mt-4">Edit Profile</Button>
    </Card>
    </div>
   
  );
}