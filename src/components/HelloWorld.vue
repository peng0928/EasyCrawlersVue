<template>
  <div style="height: 1000px">
    <a-button>Add</a-button>
  </div>
</template>
<script>
import {Button} from 'ant-design-vue';

const ButtonGroup = Button.Group;

export default {
  components: {
    AButton: Button,
    AButtonGroup: ButtonGroup,
  },
};
</script>