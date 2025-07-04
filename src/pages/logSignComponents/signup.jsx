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
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

const capabilityQuestions = [
  { key: "readingWriting", question: "How well can you read and write?" },
  { key: "vision", question: "How well can you see?" },
  { key: "hearing", question: "How well can you hear?" },
  { key: "speechCommunication", question: "How well can you communicate verbally?" },
  { key: "physicalAbility", question: "How physically capable are you?" },
  { key: "mentalFocus", question: "How well can you stay focused?" },
  { key: "financialWorkBarriers", question: "How financially stable are you for work?" },
  { key: "legalSocialBarriers", question: "Do you have legal or social barriers to work?" },
  { key: "caregiversDependents", question: "Do you have caregiving responsibilities?" },
  { key: "techSkills", question: "How well do you handle technology?" },
];

const totalSections = 3;

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
    capabilities: capabilityQuestions.reduce((acc, item) => {
      acc[item.key] = 4; 
      return acc;
    }, {}),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCapabilityChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      capabilities: { ...prev.capabilities, [key]: value },
    }));
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

  const [naExperience, setNaExperience] = useState(false);
  const [naCircumstances, setNaCircumstances] = useState(false);

  const progress = (step / (totalSections + 2)) * 100;

  return (
    <Card className="w-[500px] h-[600px] mx-auto mt-10">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <Progress value={progress} className="mt-2 h-2" />
      </CardHeader>

      <CardContent className="flex flex-col justify-between h-[450px]">
        <form onSubmit={handleSubmit} className="space-y-6 h-full">
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

        {step === 3 && (
          <div className="space-y-4">
            <Label>Capability Assessment (Part 1)</Label>
            {capabilityQuestions.slice(0, 5).map(({ key, question }) => (
              <div key={key} className="space-y-1">
                <Label>{question}</Label>
                <input
                  type="range"
                  min="1"
                  max="7"
                  value={formData.capabilities[key] || 1} // Default to 1 if undefined
                  onChange={(e) => handleCapabilityChange(key, parseInt(e.target.value))}
                  className="w-full"
                />
                <p className="text-sm text-gray-600">{formData.capabilities[key] || 1}</p>
              </div>
            ))}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <Label>Capability Assessment (Part 2)</Label>
            {capabilityQuestions.slice(5, 10).map(({ key, question }) => (
              <div key={key} className="space-y-1">
                <Label>{question}</Label>
                <input
                  type="range"
                  min="1"
                  max="7"
                  value={formData.capabilities[key] || 1}
                  onChange={(e) => handleCapabilityChange(key, parseInt(e.target.value))}
                  className="w-full"
                />
                <p className="text-sm text-gray-600">{formData.capabilities[key] || 1}</p>
              </div>
            ))}
          </div>
        )}



          {step === 5 && (
            <div className="space-y-4">
              <Label>Upload Medical Certificate or PWD Card</Label>
              <Input type="file" onChange={handleFileChange} />
              {formData.file && <p className="text-sm text-gray-500">{formData.file.name}</p>}
            </div>
          )}
        </form>
      </CardContent>

      <CardFooter className="flex justify-between">
        {step > 1 ? (
          <Button type="button" onClick={() => setStep(step - 1)} className="w-1/3" variant="outline">
            Previous
          </Button>
        ) : (
          <div className="w-1/3" />
        )}
        {step < totalSections + 2 ? (
          <Button type="button" onClick={() => setStep(step + 1)} className="w-1/3">
            Next
          </Button>
        ) : (
          <Button type="submit" className="w-1/3" onClick={handleSubmit}>
            <Link href="/homepage">Complete</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
