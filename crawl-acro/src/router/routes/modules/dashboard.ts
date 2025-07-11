import {DEFAULT_LAYOUT} from '../base';
import {AppRouteRecordRaw} from '../types';

const DASHBOARD: AppRouteRecordRaw = {
    path: '/dashboard',
    name: 'dashboard',
    component: DEFAULT_LAYOUT,
    meta: {
        locale: 'menu.dashboard',
        requiresAuth: true,
        icon: 'icon-dashboard',
        order: 0,
    },
    children: [
        {
            path: 'system',
            name: 'homeIndex',
            component: () => import('@/views/home/index.vue'),
            meta: {
                locale: 'menu.system',
                requiresAuth: true,
                roles: ['*'],
                icon2: 'icon-shujushangbao',
            },
        },
        {
            path: 'workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/workplace/index.vue'),
            meta: {
                locale: 'menu.dashboard.workplace',
                requiresAuth: true,
                roles: ['*'],
                icon2: 'icon-gongzuotai',
            },
        },
    ],
};

export default DASHBOARD;
