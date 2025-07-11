<template>
  <div :class="colorTheme.t" class="">
    <div class="flex gap-5 justify-between">
      <div
          class="flex gap-5 p-2 overflow-x-auto max-w-[62vw] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div v-for="(item, index) in tabs" :key="index" class="">
          <div class="flex gap-2 tabs pr-3">
            <div class="pl-1 pr-1">
              <div
                  class="border-b-2 border-transparent border-blue-500 text-blue-500 transition-colors duration-200 cursor-pointer flex items-center"
                  v-if="item.path===tabActive">
                <IconFont
                    :type="item.icon"
                    :size="20"
                    style="color: green"
                />
                {{ item.name }}
              </div>
              <div v-else>
                <div
                    class="border-b-2 border-transparent hover:border-blue-500 hover:text-blue-500 transition-colors duration-200 cursor-pointer flex items-center"
                    @click="changeTabActive(item.path)"
                >
                  <IconFont
                      :type="item.icon"
                      :size="20"
                  />
                  <div>
                    {{ item.name }}
                  </div>
                </div>
              </div>
            </div>
            <div class="items-center text-center  extra-content">
              <VTooltip>
                <IconFont
                    type="icon-guanbi1-2"
                    :size="15"
                    class="cursor-pointer"
                    @click="closeTab(item.path)"
                />
                <template #popper>
                  关闭
                </template>
              </VTooltip>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center items-center pr-10 pt-1">
        <span>
          自动滚动
        </span>
        <a-switch type="line" @click="scrollToBottom"/>
      </div>
    </div>
    <div></div>
  </div>
  <codemirror
      v-model="code"
      placeholder=""
      :style="{ height: props.height }"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="extensions"
      :disabled="props.disabled"
      @change="handleChange"
      @update="handleStateUpdate"
      @input="handleInput"
      @ready="handleReady"
      ref="scrollContainer"
      class="overflow-y-auto "
  />
  <div :class="colorTheme.b">
    <div class="infos">
      <a-typography-text class="item">
        <span class="">总数: </span>
        <span class="font-bold"> {{ state.length }}</span>
      </a-typography-text>
      <a-typography-text class="item">
        <span class="">行数: </span>
        <span class="font-bold"> {{ state.lines }}</span>
      </a-typography-text>
      <a-typography-text class="item">
        <span class="">当前光标: </span>
        <span class="font-bold"> {{ state.cursor }}</span>
      </a-typography-text>
      <a-typography-text class="item">
        <span class="">已选: </span>
        <span class="font-bold"> {{ state.selected }}</span>
      </a-typography-text>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {withDefaults, ref, onMounted, watch, shallowRef, nextTick, reactive} from 'vue'
import {Codemirror} from 'vue-codemirror'
import {python} from '@codemirror/lang-python'
import {oneDark} from '@codemirror/theme-one-dark'
import {useAppStore} from "@/store";

const appStore = useAppStore();

const colorTheme = ref({
      t: "",
      b: "",
    }
)

interface IProps {
  height?: string;
  disabled?: boolean;
  code?: string;
  tabs: any;
  tabActive: any;
}

const props = withDefaults(defineProps<IProps>(), {
  height: '74vh',
  disabled: false,
  code: "print('hello world')",
});
const state = reactive({
  lines: null as null | number,
  cursor: null as null | number,
  selected: null as null | number,
  length: null as null | number
})
const code = ref(props.code);
const extensions = [python(), oneDark];

const handleChange = (value: string, viewUpdate: any) => {
  console.log('Code changed:',);
}

const handleStateUpdate = (viewUpdate: any) => {
  // selected
  const ranges = viewUpdate
  const data = ranges.state.selection.ranges
  state.selected = data.reduce((plus, range) => plus + range.to - range.from, 0)
  state.cursor = data[0].anchor
  state.length = viewUpdate.state.doc.length
  state.lines = viewUpdate.state.doc.lines
}

const handleInput = (value: string) => {
  console.log('Code input:');
}
const view = shallowRef()
const handleReady = (editor: any) => {
  view.value = editor.view
}
const scrollContainer = ref<HTMLElement | null>(null)
const scrollToBottom = () => {
  nextTick(() => {
    const scrollHeight = view.value
    view.value.scrollDOM.scrollTo({
      top: scrollHeight.scrollDOM.scrollHeight,
      behavior: 'instant'
    })
  })
}


const colorConfig = {
  b: {
    light: 'bg-[#7BE188]',
    dark: 'bg-[#F76965]'
  },
  t: {
    light: 'bg-[#282c34] text-white',
    dark: 'bg-[#282c34]  text-white'
  }
}
watch(
    () => props.code,
    (newVal,) => {
      code.value = newVal
      scrollToBottom()
    }
);

watch(
    () => appStore.appCurrentSetting.theme,
    (newVal, oldVal) => {
      if (newVal === 'light') {
        colorTheme.value.t = colorConfig.t.light;
        colorTheme.value.b = colorConfig.b.light;
      } else {
        colorTheme.value.t = colorConfig.t.dark;
        colorTheme.value.b = colorConfig.b.dark;
      }
    }
);
onMounted(() => {
  if (appStore.appCurrentSetting.theme === 'light') {
    colorTheme.value.t = colorConfig.t.light;
    colorTheme.value.b = colorConfig.b.light;
  } else {
    colorTheme.value.t = colorConfig.t.dark;
    colorTheme.value.b = colorConfig.b.dark;
  }
})

const emit = defineEmits(['update:tabActive', 'update:tabs']);
const changeTabActive = (e: any) => {
  console.log(e);
  emit('update:tabActive', e);
}
const closeTab = (e: any) => {
  const index = props.tabs.findIndex(item => item.path === e) || 0;
  const tabActive = props.tabs[index - 1]
  const path = tabActive ? tabActive.path : ''
  const filteredArray = props.tabs.filter(item => item.path !== e);
  emit('update:tabs', filteredArray);
  emit('update:tabActive', path);
}
</script>


<style scoped lang='less'>

.infos {
  .item {
    margin-left: 2em;
    display: inline-block;
    font-feature-settings: 'tnum';
  }
}


.extra-content {
  display: none;
}

.tabs:hover .extra-content {
  display: flex;
}
</style>