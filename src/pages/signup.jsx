"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    experience: "",
    disability: "",
    wants: "",
    circumstances: "",
    file: null,
  });

  const [naExperience, setNaExperience] = useState(false);
  const [naCircumstances, setNaCircumstances] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const progress = (step / 3) * 100;

  return (
    <Card className="w-[500px] h-[550px] mx-auto mt-10">
      {/* Header */}
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <Progress value={progress} className="mt-2 h-2" />
      </CardHeader>

      {/* Content */}
      <CardContent className="flex flex-col justify-between h-[380px]">
        <form onSubmit={handleSubmit} className="space-y-6 h-full">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-4">
              <Label>Name</Label>
              <Input
                name="name"
                placeholder="Full Name"
                onChange={handleInputChange}
                required
              />
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleInputChange}
                required
              />
              <Label>Password</Label>
              <Input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleInputChange}
                required
              />
              <Label>Experience</Label>
              <Textarea
                name="experience"
                placeholder="Describe your experience"
                value={naExperience ? "N/A" : formData.experience}
                onChange={handleInputChange}
                disabled={naExperience}
              />
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={naExperience}
                  onCheckedChange={(value) => {
                    setNaExperience(value);
                    setFormData((prev) => ({
                      ...prev,
                      experience: value ? "N/A" : "",
                    }));
                  }}
                />
                <span>N/A</span>
              </div>
            </div>
          )}

          {/* Step 2: Disabilities, Wants, and Circumstances */}
          {step === 2 && (
            <div className="space-y-4">
              <Label>Disability</Label>
              <Input
                name="disability"
                placeholder="Enter your disability (if any)"
                value={formData.disability}
                onChange={handleInputChange}
              />
              <Label>Wants</Label>
              <Input
                name="wants"
                placeholder="What do you want from the job?"
                value={formData.wants}
                onChange={handleInputChange}
              />
              <Label>Circumstances</Label>
              <Textarea
                name="circumstances"
                placeholder="Describe your circumstances"
                value={naCircumstances ? "N/A" : formData.circumstances}
                onChange={handleInputChange}
                disabled={naCircumstances}
              />
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={naCircumstances}
                  onCheckedChange={(value) => {
                    setNaCircumstances(value);
                    setFormData((prev) => ({
                      ...prev,
                      circumstances: value ? "N/A" : "",
                    }));
                  }}
                />
                <span>N/A</span>
              </div>
            </div>
          )}

          {/* Step 3: File Upload */}
          {step === 3 && (
            <div className="space-y-4">
              <Label>Upload Medical Certificate or PWD Card</Label>
              <Input type="file" onChange={handleFileChange} />
              {formData.file && (
                <p className="text-sm text-gray-500">
                  {formData.file.name}
                </p>
              )}
            </div>
          )}
        </form>
      </CardContent>

      {/* Navigation Buttons */}
      <CardFooter className="flex justify-between">
        {step > 1 ? (
          <Button
            type="button"
            onClick={() => setStep(step - 1)}
            className="w-1/3"
            variant="outline"
          >
            Previous
          </Button>
        ) : (
          <div className="w-1/3" />
        )}
        {step < 3 ? (
          <Button
            type="button"
            onClick={() => setStep(step + 1)}
            className="w-1/3"
          >
            Next
          </Button>
        ) : (
          <Button type="submit" className="w-1/3" onClick={handleSubmit}>
            Complete
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
