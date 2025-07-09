<template>
  <div class='p-3'>
    <div class="flex">
      <div class="w-1/6 p-3 rounded-l-lg" :class="theme">
        <a-input-search
            style="margin-bottom: 8px; max-width: 240px"
            v-model="searchKey"
        />

        <a-tree
            :default-selected-keys="['0-0-1']"
            :data="treeData"
            class="tree-demo text-white"
            v-if="treeData.length"
        />
        <div v-else>
          <div class="text-center">
            <IconFont type='icon-zanwushuju' :size="150"/>
            <div>
              <a-typography-text>
                暂无数据
              </a-typography-text>
            </div>
          </div>
        </div>
      </div>
      <div class="w-5/6 ">
        <codemirror :code="code"/>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {useAppStore} from '@/store';
import {ref, h, resolveComponent, watch, onMounted, reactive} from 'vue';
import codemirror from "./codemirror.vue";

const appStore = useAppStore();
const theme = ref();

const IconFont = resolveComponent('IconFont')
const searchKey = ref('')
const code = ref(`print('111')`)
const treeData = ref([])
const OriginTreeData = ref([
  {
    title: 'Prspider',
    key: '0-0',
    icon: () => h(IconFont, {type: 'icon-wenjianjia'}),
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
        icon: () => h(IconFont, {type: 'icon-wenjianjia'}),
      },
      {
        title: 'item.py',
        key: '0-0-1',
        icon: () => h(IconFont, {type: 'icon-Python'}),
      },
      {
        title: 'Trunk 1-2',
        key: '0-0-2',
        children: [
          {title: 'leaf', key: '0-0-2-0', icon: () => h(IconFont, {type: 'icon-weibiaoti--'}),},
          {
            title: '1.java',
            key: '0-0-2-1',
            icon: () => h(IconFont, {type: 'icon-java'})
          },
        ],
      },
    ],
  },
  {
    title: 'spider.py',
    key: '0-1',
    icon: () => h(IconFont, {type: 'icon-Python'})
  },
  {
    title: 'items',
    key: '0-2',
    icon: () => h(IconFont, {type: 'icon-wenjianjia'}),
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
])

const loop = (data: any) => {
  const result = [];
  data.forEach(item => {
    if (item.title.toLowerCase().indexOf(searchKey.value.toLowerCase()) > -1) {
      result.push({...item});
    } else if (item.children) {
      const filterData = loop(item.children);
      if (filterData.length) {
        const val = {
          ...item,
          children: filterData
        }
        result.push(val)
      }
    }
  })
  return result;
}

watch(searchKey, (newVal, oldVal) => {
  const val = loop(OriginTreeData.value)
  if (newVal) {
    treeData.value = val;
  } else {
    treeData.value = OriginTreeData.value;
  }
});
watch(
    () => appStore.appCurrentSetting.theme,
    (newVal, oldVal) => {
      if (newVal === 'light') {
        theme.value = "bg-[#BEDAFF]";
      } else {
        theme.value = "bg-[#1d2129]";
      }
    }
);

onMounted(() => {
  treeData.value = OriginTreeData.value;
  if (appStore.appCurrentSetting.theme === 'light') {
    theme.value = "bg-[#BEDAFF]";
  } else {
    theme.value = "bg-[#1d2129]";
  }
  setInterval(() => {
    code.value += `
    ${new Date().getTime()} | INFO     | 92110115MA00EC452G | beijing_34944833_1 | 4 | beijing | Response (200)
    ${new Date().getTime()} | WARNING     | 92110115MA00EC452G | beijing_34944833_1 | 4 | beijing | Response (200)
    ${new Date().getTime()} | ERROR     | 92110115MA00EC452G | beijing_34944833_1 | 4 | beijing | Response (200)
    ${new Date().getTime()} | ERROR     | 92110115MA00EC452G | beijing_34944833_1 | 4 | beijing | Response (200)
    ${new Date().getTime()} | ERROR     | 92110115MA00EC452G | beijing_34944833_1 | 4 | beijing | Response (200)
    ${new Date().getTime()} | ERROR     | 92110115MA00EC452G | beijing_34944833_1 | 4 | beijing | Response (200)
    ${new Date().getTime()} | ERROR     | 92110115MA00EC452G | beijing_34944833_1 | 4 | beijing | Response (200)
    `
  }, 111500)
})

</script>


<style scoped lang='less'>
.tree-demo {
  :deep(.arco-tree-node-title:hover) {
    background-color: transparent !important;
  }
}
</style>
