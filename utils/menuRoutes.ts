interface routes {
    title: string;
    submenuItems: subRouteItems[]
}

interface subRouteItems {
    title: string;
    icon: string;
    path: string;
}

const Routes: routes[] = [
    {
        title: "Projects",
        submenuItems: [
            {
                title: "All automations",
                icon: "",
                path:'/'
            },
            {
                title: "Starred automations",
                icon: "",
                path:'/'
            },
            {
                title: "Community",
                icon: "",
                path:'/'
            },
        ],
    },
    {
        title: "Configures",
        submenuItems: [
            {
                title: "Configured nodes",
                icon: "",
                path:'/'
            },
            {
                title: "Add custom node",
                icon: "",
                path:'/'
            },
        ],
    },
    {
        title: "Team",
        submenuItems: [
            {
                title: "Members",
                icon: "",
                path:'/'
            },
            {
                title: "Team setting",
                icon: "",
                path:'/'
            },
        ],
    },
];

export { Routes };
