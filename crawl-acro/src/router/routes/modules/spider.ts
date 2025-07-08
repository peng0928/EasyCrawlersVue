import {DEFAULT_LAYOUT} from '../base';
import {AppRouteRecordRaw} from '../types';

const DASHBOARD: AppRouteRecordRaw = {
    path: '/spider',
    name: 'spider',
    component: DEFAULT_LAYOUT,
    meta: {
        locale: 'menu.spider',
        requiresAuth: true,
        icon2: 'icon-Spider',
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
                icon2: 'icon-xiangmu',
            },
        },
        {
            path: '',
            name: 'spiderSpider',
            component: () => import('@/views/spider/components/Spider.vue'),
            meta: {
                locale: 'menu.spider',
                requiresAuth: true,
                roles: ['*'],
                icon2: 'icon-Spider',
            },
        },
        {
            path: '/spider/add',
            name: 'spiderSpiderAdd',
            component: () => import('@/views/spider/components/SpiderAdd.vue'),
            meta: {
                locale: 'menu.spiderAdd',
                requiresAuth: true,
                roles: ['*'],
                hideInMenu: true
            },
        },
        {
            path: '/spider/code',
            name: 'spiderSpiderCode',
            component: () => import('@/views/spider/components/SpiderCode.vue'),
            meta: {
                locale: 'menu.spiderCode',
                requiresAuth: true,
                roles: ['*'],
                hideInMenu: true
            },
        },
        {
            path: 'task',
            name: 'spiderTask',
            component: () => import('@/views/spider/components/Spider.vue'),
            meta: {
                locale: 'menu.task',
                requiresAuth: true,
                roles: ['*'],
                icon2: 'icon-tasks',
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
                icon2: 'icon-tiaoduguanli',
            },
        },
    ],
};

export default DASHBOARD;
