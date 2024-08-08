import {RouteItems} from "@frs535/react-ui-components";
// @ts-ignore
import { UilChartPie } from '@iconscout/react-unicons';


export const sitemap: RouteItems[] = [
    {
        label: 'dashboard',
        horizontalNavLabel: 'home',
        active: true,
        icon: UilChartPie,
        labelDisabled: true,
        pages:[
            {
                name: 'home',
                icon: 'pie-chart',
                active: true,
                flat: true,
                pages: [
                    {
                        name: 'e-commerce',
                        path: '/',
                        pathName: 'default-dashboard',
                        topNavIcon: 'shopping-cart',
                        active: true
                    },
                    {
                        name: 'project-management',
                        path: '/dashboard/project-management',
                        pathName: 'project-management-dashbaord',
                        topNavIcon: 'clipboard',
                        active: true
                    }]
            },
        ]
    }
]

export default sitemap;