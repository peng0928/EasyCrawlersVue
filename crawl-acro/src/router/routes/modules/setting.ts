import {DEFAULT_LAYOUT} from '../base';
import {AppRouteRecordRaw} from '../types';

const DASHBOARD: AppRouteRecordRaw = {
    path: '/setting',
    name: 'setting',
    component: DEFAULT_LAYOUT,
    meta: {
        locale: 'menu.setting',
        requiresAuth: true,
        icon: 'icon-settings',
        order: 2,
    },
    children: [
        {
            path: 'project',
            name: 'spiderProject',
            component: () => import('@/views/home/index.vue'),
            meta: {
                locale: 'menu.project',
                requiresAuth: true,
                roles: ['*'],
            },
        },
        {
            path: '',
            name: 'spiderSpider',
            component: () => import('@/views/home/index.vue'),
            meta: {
                locale: 'menu.spider',
                requiresAuth: true,
                roles: ['*'],
            },
        },
        {
            path: 'task',
            name: 'spiderTask',
            component: () => import('@/views/home/index.vue'),
            meta: {
                locale: 'menu.task',
                requiresAuth: true,
                roles: ['*'],
            },
        },
        {
            path: 'schedule',
            name: 'spiderSchedule',
            component: () => import('@/views/home/index.vue'),
            meta: {
                locale: 'menu.schedule',
                requiresAuth: true,
                roles: ['*'],
            },
        },
    ],
};

export default DASHBOARD;
