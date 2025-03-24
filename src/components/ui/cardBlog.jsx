import { BellRing, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const CardBlog = ({ notifications, image, className, ...props }) => {
  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle>Notice</CardTitle>
        <CardDescription>
          Check this {notifications.length} Out!
        </CardDescription>
        <CardContent>
            <div className="relative w-full h-[150px] rounded-lg overflow-hidden">
            <img
              src={image}
              alt="Image"
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
            </div>
        </CardContent>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <BellRing />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Push Notifications
            </p>
            <p className="text-sm text-muted-foreground">
              Send notifications to device.
            </p>
          </div>
          <Switch />
        </div>
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Check /> Explore
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function App() {
  const data1 = [
    { title: "For dyslexia", description: "45 minutes ago" },
    { title: "Tool for dyslexia", description: "2 hours ago" },
  ];

  const data2 = [
    { title: "For colorblind", description: "10 minutes ago" },
    { title: "Tool for colorblind", description: "1 hour ago" },
  ];

  const data3 = [
    { title: "Hard Time Reading?", description: "10 minutes ago" },
    { title: "Read this article now", description: "1 hour ago" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 justify-center items-center">
      <CardBlog notifications={data1} image="/images/temp.jpg" />
      <CardBlog notifications={data2} image="/images/temp.jpg" />
      <CardBlog notifications={data3} image="/images/temp.jpg" />
    </div>
  );
  
}
