<template>
  <div class='p-3'>
    <div class=''>
      <a-card class='rounded-xl' hoverable size='small'>
        <div class="flex">
          <div class="w-1/6 ">
            <a-tree
                :default-selected-keys="['0-0-1']"
                :data="treeData"
                :show-line="showLine"
            />
          </div>
          <div class="w-5/6">
            <codemirror/>
          </div>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {IconStar, IconDriveFile} from '@arco-design/web-vue/es/icon';
import {ref, h} from 'vue';
import codemirror from "./codemirror.vue";


const showLine = ref(false);
const treeData = [
  {
    title: 'Prspider',
    key: '0-0',
    icon: () => h(IconDriveFile),
    children: [
      {
        title: 'task',
        key: '0-0-0',
        children: [
          {title: 'leaf', key: '0-0-0-0'},
          {
            title: 'leaf',
            key: '0-0-0-1',
            children: [{title: 'leaf', key: '0-0-0-1-0'}],
          },
          {title: 'leaf', key: '0-0-0-2'},
        ],
        icon: () => h(IconStar),
      },
      {
        title: 'Trunk 1-1',
        key: '0-0-1',
      },
      {
        title: 'Trunk 1-2',
        key: '0-0-2',
        children: [
          {title: 'leaf', key: '0-0-2-0'},
          {
            title: 'leaf',
            key: '0-0-2-1',
          },
        ],
      },
    ],
  },
  {
    title: 'spider.py',
    key: '0-1',

  },
  {
    title: 'items',
    key: '0-2',
    children: [
      {
        title: 'Trunk 3-0',
        key: '0-2-0',
        children: [
          {title: 'leaf', key: '0-2-0-0'},
          {title: 'leaf', key: '0-2-0-1'},
        ],
      },
    ],
  },
];
</script>


<style scoped lang='less'>

</style>
