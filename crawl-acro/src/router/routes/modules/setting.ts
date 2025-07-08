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
            name: 'dbConfig',
            component: () => import('@/views/home/index.vue'),
            meta: {
                locale: 'menu.dbConfig',
                requiresAuth: true,
                roles: ['*'],
            },
        },
        {
            path: '',
            name: 'runConfig',
            component: () => import('@/views/home/index.vue'),
            meta: {
                locale: 'menu.runConfig',
                requiresAuth: true,
                roles: ['*'],
            },
        },
        {
            path: 'task',
            name: 'logConfig',
            component: () => import('@/views/home/index.vue'),
            meta: {
                locale: 'menu.logConfig',
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
