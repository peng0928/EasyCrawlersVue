<template>
  <div :class="colorTheme.t" class="">
    <div class="flex  gap-5 justify-between">
      <div>
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
      class="overflow-y-auto"
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
}

const props = withDefaults(defineProps<IProps>(), {
  height: '78vh',
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
  console.log('Code changed:', value);
}

const handleStateUpdate = (viewUpdate: any) => {
  // selected
  const ranges = viewUpdate
  const data = ranges.state.selection.ranges
  state.selected = data.reduce((plus, range) => plus + range.to - range.from, 0)
  state.cursor = data[0].anchor
  state.length = viewUpdate.state.doc.length
  state.lines = viewUpdate.state.doc.lines
  console.log('props', props, props.tab)

}

const handleInput = (value: string) => {
  console.log('Code input:', value);
}
const view = shallowRef()
const handleReady = (editor: any) => {
  view.value = editor.view
}
const scrollContainer = ref<HTMLElement | null>(null)

const scrollToBottom = () => {
  nextTick(() => {
    const scrollHeight = view.value
    console.log(scrollHeight.scrollDOM.scrollHeight);
    view.value.scrollDOM.scrollTo({
      top: scrollHeight.scrollDOM.scrollHeight,
      behavior: 'instant'
    })
  })
}

watch(
    () => props.code,
    (newVal,) => {
      code.value = newVal
      scrollToBottom()
    }
);

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

</script>


<style scoped lang='less'>

.infos {
  .item {
    margin-left: 2em;
    display: inline-block;
    font-feature-settings: 'tnum';
  }
}

</style>