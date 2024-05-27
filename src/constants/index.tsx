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
