import {HiOutlineUsers} from "react-icons/hi2";
import {MdOutlineWorkOutline} from "react-icons/md";
import {GrLineChart} from "react-icons/gr";

export const sidebarItems = [
    {
        id: 1,
        label: "Orders",
        href: "/",
        icon: <MdOutlineWorkOutline/>,
    },
    {
        id: 2,
        label: "Staff",
        href: "/staff/workers",
        icon: <HiOutlineUsers/>,
    },
    {
        id: 4,
        label: "Statistics",
        href: '/statistics/expenses',
        icon: <GrLineChart className={" text-base"}/>,
    }
];

export const PermissionsData = [
    {
        id: 1,
        name: "DASHBOARD",
        allowedAccesses: [
            "WRITE",
            "READ",
        ]
    },
    {
        id: 2,
        name: "WORK_ORDER",
        allowedAccesses: [
            "READ",
            "EDIT"
        ]
    },
    {
        id: 3,
        name: "ADMINS_MANAGEMENT",
        allowedAccesses: [
            "WRITE",
            "READ",
            "EDIT",
            "DELETE"
        ]
    },
    {
        id: 4,
        name: "WORKERS_MANAGEMENT",
        allowedAccesses: [
            "WRITE",
            "READ",
            "EDIT",
            "DELETE"
        ]
    },
    {
        id: 5,
        name: "PRICE",
        allowedAccesses: [
            "READ"
        ]
    },
    {
        id: 6,
        name: "TASK",
        allowedAccesses: [
            "READ",
            "EDIT"
        ]
    }
];
