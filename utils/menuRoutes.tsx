import {
    WatchStatus,
    Star1,
    Building,
    Cpu,
    AddSquare,
    People,
    Setting2,
} from "iconsax-react";

interface routes {
    title: string;
    submenuItems: subRouteItems[];
}

interface subRouteItems {
    title: string;
    icon: JSX.Element;
    path: string;
}

const Routes: routes[] = [
    {
        title: "Projects",
        submenuItems: [
            {
                title: "All automations",
                icon: <WatchStatus />,
                path: "/dashbord/allAutomations",
            },
            {
                title: "Starred automations",
                icon: <Star1 />,
                path: "/dashbord/starredAutomations",
            },
            {
                title: "Community",
                icon: <Building />,
                path: "/",
            },
        ],
    },
    {
        title: "Configures",
        submenuItems: [
            {
                title: "Configured nodes",
                icon: <Cpu />,
                path: "/",
            },
            {
                title: "Add custom node",
                icon: <AddSquare />,
                path: "/",
            },
        ],
    },
    {
        title: "Team",
        submenuItems: [
            {
                title: "Members",
                icon: <People />,
                path: "/",
            },
            {
                title: "Team setting",
                icon: <Setting2 />,
                path: "/",
            },
        ],
    },
];

export { Routes };
