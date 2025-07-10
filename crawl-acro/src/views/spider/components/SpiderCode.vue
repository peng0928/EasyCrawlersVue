<template>
  <div class='p-3 max-h-[80vh]' >
    <div class="pt-1 pb-1 flex gap-3">
      <a-button>
        新建
      </a-button>
      <a-upload action="/">
      </a-upload>
    </div>
    <div class="flex ">
      <transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="transform translate-y-4 opacity-0"
          enter-to-class="transform translate-y-0 opacity-300"
          leave-active-class="transition duration-300 ease-in"
          leave-from-class="transform translate-y-0 opacity-300"
          leave-to-class="transform translate-y-4 opacity-0"
      >
        <div
            class="resize-x direction-rtl w-1/5 max-w-2/5 pl-3 pr-3 pb-3 rounded-l-lg  overflow-x-auto  overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            :class="theme"
            v-if="menuState.leftMenu">
          <div class="sticky top-0  z-10 py-2 flex gap-3" :class="theme">
            <a-input
                style="margin-bottom: 8px; "
                v-model="searchKey"
            >
              <template #prefix>
                <icon-search/>
              </template>
            </a-input>
            <a-button type="">
              <template #icon>
                <IconFont
                    :type="icon.close"
                    :size="15"
                    @click="menuState.leftMenu=false"
                />
              </template>
            </a-button>
          </div>
          <a-tree
              :default-selected-keys="['0-0-1']"
              :data="treeData"
              class="tree-demo text-white overflow-y-auto"
              v-if="treeData.length"
              @select="menuCheck"
          >
            <template #extra="nodeData">
              <div class="extra-content absolute top-2 right-0 flex items-center gap-2">
                <a-tooltip content="新增">
                  <IconFont
                      :type="icon.a"
                      :size="15"
                      @click="() => onIconClick(nodeData)"
                  />
                </a-tooltip>
                <a-tooltip content="修改">
                  <IconFont
                      :type="icon.e"
                      :size="18"
                      @click="() => onIconClick(nodeData)"
                  />
                </a-tooltip>
                <a-tooltip content="删除">
                  <IconFont
                      :type="icon.d"
                      :size="22"
                      :style="{'--color': color}"
                      @click="() => onIconClick(nodeData)"
                  />
                </a-tooltip>
              </div>
            </template>
          </a-tree>
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
        <div v-else>
          <div class="pr-3">
            <a-button type="">
              <template #icon>
                <IconFont
                    type="icon-zhankai"
                    :size="20"
                    @click="menuState.leftMenu=true"
                />
              </template>
            </a-button>
          </div>
        </div>
      </transition>
      <div class="w-full flex-1 ">
        <codemirror :code="code" :tabs="treeMenu" :tabActive="treeMenuActive"
         @update:tabActive="treeMenuActive = $event"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {useAppStore} from '@/store';
import {ref, h, resolveComponent, watch, onMounted, reactive} from 'vue';
import codemirror from "./codemirror.vue";

const menuState = ref({
  leftMenu: true
})
const treeGetIcon = ref("")
const treeMenu = ref([])
const treeMenuActive = ref({})
const appStore = useAppStore()
const theme = ref({})
const icon = ref({})
const color = ref('#3370ff')
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
  {
    title: 'items',
    key: '0-2',
    icon: () => h(IconFont, {type: 'icon-wenjianjia'}),
    children: [
      {
        title: 'Trunk 3-0',
        key: '0-2-0',
        children: [
          {title: 'leafleafleafleafleaf', key: '0-2-0-0'},
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
        icon.value = {
          a: "icon-xinzeng",
          e: "icon-xiugai",
          d: "icon-shanchu2",
          close: "icon-suoxiao"
        }
      } else {
        theme.value = "bg-[#1d2129]";
        icon.value = {
          a: "icon-xinzeng-2",
          e: "icon-xiugai-2",
          d: "icon-shanchu2-2",
          close: "icon-suoxiao-2"
        }
      }
    }
);

onMounted(() => {
  treeData.value = OriginTreeData.value;
  if (appStore.appCurrentSetting.theme === 'light') {
    theme.value = "bg-[#BEDAFF]";
    icon.value = {
      a: "icon-xinzeng",
      e: "icon-xiugai",
      d: "icon-shanchu2",
      close: "icon-suoxiao",
    }
  } else {
    theme.value = "bg-[#1d2129]";
    icon.value = {
      a: "icon-xinzeng-2",
      e: "icon-xiugai-2",
      d: "icon-shanchu2-2",
      close: "icon-suoxiao-2"
    }
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
  }, 50000)
})


const onIconClick = (e: any) => {
  console.log(e)
}

const menuCheck = (e: any, data: any) => {
  const treeChildren = data.selectedNodes[0].children
  const treeTitle = data.selectedNodes[0].title
  const treeIcon = data.selectedNodes[0].icon
  const treePath = e[0]
  const hasPathOne = treeMenu.value.some(item => item.path === treePath);
  try {
    treeGetIcon.value = treeIcon().props?.type
  } catch {
    treeGetIcon.value = "icon-wenben_o-2"
  }
  const item = {
    name: treeTitle,
    icon: treeGetIcon.value,
    path: treePath
  }
  treeMenuActive.value = treePath
  if (!treeChildren) {
    if (!hasPathOne) {
      treeMenu.value.push(item)
    }
  }
};
</script>


<style scoped lang='less'>
.tree-demo {
  :deep(.arco-tree-node-title:hover) {
    background-color: transparent !important;
  }
}

.extra-content {
  display: none;
}

/* 当鼠标悬停在树节点上时显示extra内容 */
.arco-tree-node:hover .extra-content {
  display: flex;
}
</style>
