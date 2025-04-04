"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components = [
    {
        title: "Colorblind Mode",
        href: "/layoutPage/homeLayout",
        description:
        "High contrast mode for good readbility and colorblind",
    },
    {
        title: "Job Find",
        href: "/layoutPage/jobFindLayout",
        description:
        "Search and find jobs from your needs to wants",
    },
    {
        title: "Resource Hub",
        href: "/layoutPage/resourceHubLayout",
        description:
        "Find tools and information for your current needs!",
    },
    {
        title: "Text to Speech",
        href: "/layoutPage/homeLayout",
        description: "TTS to accomadate readiblity",
    },
    {
        title: "Speech to text",
        href: "/layoutPage/homeLayout",
        description:
        "STT for no hands searching or browsing",
    },
    {
      title: "User Profile",
      href: "/layoutPage/userProfileLayout",
      description:
      "User profile section",
  },
];

export default function NavigationMenuDemo() {
  return (
    <NavigationMenu >
      <NavigationMenuList>
      <NavigationMenuItem>
          <Link href="/layoutPage/homeLayout" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                        Workable
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      An AI tool where you can find jobs no matter your circumstances
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="#About" title="Introduction">
                Learn more what Workable is about.
              </ListItem>
              <ListItem href="#Tutorial" title="Features">
                How do you use Workable?
              </ListItem>
              <ListItem href="#Goals" title="Goal">
                Workable goal is to reduce inequalities while increasing jobs around the world!
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                      {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  });
  
  ListItem.displayName = "ListItem";