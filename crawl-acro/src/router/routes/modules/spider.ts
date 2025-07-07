import {DEFAULT_LAYOUT} from '../base';
import {AppRouteRecordRaw} from '../types';

const DASHBOARD: AppRouteRecordRaw = {
    path: '/spider',
    name: 'spider',
    component: DEFAULT_LAYOUT,
    meta: {
        locale: 'menu.spider',
        requiresAuth: true,
        icon: 'icon-apps',
        order: 0,
    },
    children: [
        {
            path: 'project',
            name: 'spiderProject',
            component: () => import('@/views/spider/components/Project.vue'),
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
