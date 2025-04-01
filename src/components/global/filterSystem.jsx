import * as React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";

export default function FilterSystem() {
    const [filters, setFilters] = React.useState({
        jobType: "",
        workMode: "",
        salaryRange: "",
        time: "",
        days: []
    });

    const handleFilterChange = (field, value) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    const handleCheckboxChange = (day) => {
        setFilters(prev => ({
            ...prev,
            days: prev.days.includes(day)
                ? prev.days.filter(d => d !== day)
                : [...prev.days, day]
        }));
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Open Filter</Button>
            </DialogTrigger>

            <DialogContent className="max-w-lg w-full p-4 rounded-lg shadow-lg">
                <h2 className="text-2xl mb-4">Filter Jobs</h2>
                
                <div className="space-y-4">
                    {/* Job Type */}
                    <Select onValueChange={(value) => handleFilterChange("jobType", value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Job Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="full-time">Full-Time</SelectItem>
                            <SelectItem value="part-time">Part-Time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="internship">Internship</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Work Mode */}
                    <Select onValueChange={(value) => handleFilterChange("workMode", value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Work Mode" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="remote">Remote</SelectItem>
                            <SelectItem value="onsite">Onsite</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Salary Range */}
                    <Input
                        type="text"
                        placeholder="Enter salary range (e.g., $40k - $80k)"
                        onChange={(e) => handleFilterChange("salaryRange", e.target.value)}
                    />

                    {/* Time Selection */}
                    <Input
                        type="time"
                        onChange={(e) => handleFilterChange("time", e.target.value)}
                    />

                    {/* Days Selection */}
                    <div className="flex flex-wrap gap-2">
                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                            <label key={day} className="flex items-center space-x-2">
                                <Checkbox
                                    checked={filters.days.includes(day)}
                                    onCheckedChange={() => handleCheckboxChange(day)}
                                />
                                <span>{day}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mt-4 flex justify-end space-x-2">
                    <Button onClick={() => console.log(filters)}>Apply Filters</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
