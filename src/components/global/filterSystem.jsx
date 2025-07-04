import * as React from "react";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import Recommend from "./recomendResource";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import JobFindSearch from "@/pages/jobComponents/jobFindSearch";

export default function FilterSystem() {
  const [filters, setFilters] = React.useState({
    salaryRange: "",
    time: "",
    days: [],
  });

  const [isOpen, setIsOpen] = React.useState(false); 

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (day) => {
    setFilters((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day],
    }));
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between p-4 lg:hidden">
        <h2 className="text-xl font-semibold">Filters</h2>
        <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)}>
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      <div
        className={`${
          isOpen ? "block" : "hidden"
        } flex flex-col gap-4 p-4 border-t lg:border-0 lg:p-0 lg:gap-6 lg:flex-row lg:items-center lg:justify-between lg:flex`}
      >

        <Input
          className="w-full lg:w-52"
          type="text"
          placeholder="Salary range (e.g. $40k - $80k)"
          onChange={(e) => handleFilterChange("salaryRange", e.target.value)}
        />

        <Input
          className="w-full lg:w-40"
          type="time"
          onChange={(e) => handleFilterChange("time", e.target.value)}
        />

        <div className="flex flex-wrap gap-2 lg:flex-nowrap lg:gap-1">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
            <label key={day} className="flex items-center space-x-1 text-sm">
              <Checkbox
                checked={filters.days.includes(day)}
                onCheckedChange={() => handleCheckboxChange(day)}
              />
              <span>{day}</span>
            </label>
          ))}
        </div>

        <Button onClick={() => console.log(filters)} className="w-full lg:w-auto">
          Apply Filters
        </Button>
        <Recommend />
        <JobFindSearch />

      </div>
    </div>
  );
}
