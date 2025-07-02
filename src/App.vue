<template>
  <a-config-provider
      :theme="{
      algorithm: theme.darkAlgorithm,
    }"
  >
    <div class="min-h-[calc(100vh)]">
      <a-layout>
        <a-layout-sider
            v-model:collapsed="collapsed" collapsible
            class="min-h-[calc(100vh)]"
            theme="light"
        >
          <div class="logo"/>
          <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="inline">
            <a-menu-item key="1">
              <user-outlined/>
              <span class="nav-text">nav 1</span>
            </a-menu-item>
            <a-menu-item key="2">
              <user-outlined/>
              <span class="nav-text">nav 2</span>
            </a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout>
          <a-layout-header >
            <div class="p-0.5">
<!--              <menu-unfold-outlined-->
<!--                  v-if="collapsed"-->
<!--                  class="trigger"-->
<!--                  @click="() => (collapsed = !collapsed)"-->
<!--              />-->
<!--              <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)"/>-->
            </div>
          </a-layout-header>
          <a-layout-content>
            <div class="h-[calc(86vh)] overflow-y-auto scrollbar-hide">
              <div class="p-5">
                <router-view/>
              </div>
            </div>
          </a-layout-content>
          <a-layout-footer :style="{ textAlign: 'center' }">
            Ant Design ©2018 Created by Ant UED
          </a-layout-footer>
        </a-layout>
      </a-layout>
    </div>
  </a-config-provider>
</template>
<script lang="ts" setup>
import {ref} from 'vue';
import {theme} from 'ant-design-vue';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';

const selectedKeys = ref<string[]>(['1']);
const collapsed = ref<boolean>(false);
</script>
<style scoped>
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}


.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

</style>
