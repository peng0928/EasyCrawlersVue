<template>
  <codemirror
      v-model="code"
      placeholder="Code goes here..."
      :style="{ height: props.height }"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="extensions"
      :disabled="true"
      @change="handleChange"
      @input="handleInput"
      @ready="handleReady"
  />
</template>

<script setup lang='ts'>
import {ref} from 'vue'
import {Codemirror} from 'vue-codemirror'
import {python} from '@codemirror/lang-python'
import {oneDark} from '@codemirror/theme-one-dark'


interface IProps {
  height?: string;
}

const props = withDefaults(defineProps<IProps>(), {height: '80vh'});


const code = ref(`print('hello world')`)
const extensions = [python(), oneDark]


const handleChange = (value: string, viewUpdate: any) => {
  console.log('Code changed:', value);
}

const handleInput = (value: string) => {
  console.log('Code input:', value);
}

const handleReady = (editor: any) => {
  console.log('Editor is ready:', editor);
}
</script>


<style scoped lang='less'>

</style>
