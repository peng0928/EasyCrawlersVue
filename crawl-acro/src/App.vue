<template>
  <a-config-provider :locale="locale">
      <router-view/>
    <global-setting/>
  </a-config-provider>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
import GlobalSetting from '@/components/global-setting/index.vue';
import useLocale from '@/hooks/locale';

const {currentLocale} = useLocale();
const locale = computed(() => {
  switch (currentLocale.value) {
    case 'zh-CN':
      return zhCN;
    case 'en-US':
      return enUS;
    default:
      return enUS;
  }
});
</script>

<style>
/* 隐藏垂直滚动条但仍可滚动 */
::-webkit-scrollbar {
  width: 0;  /* 隐藏垂直滚动条 */
  height: 8px;  /* 设置水平滚动条高度（可选） */
}

/* 保留水平滚动条（如果需要） */
::-webkit-scrollbar-thumb:horizontal {
  background: #888;  /* 水平滚动条颜色 */
}
::-webkit-scrollbar-thumb:vertical {
  background: #888;  /* 水平滚动条颜色 */
}
</style>