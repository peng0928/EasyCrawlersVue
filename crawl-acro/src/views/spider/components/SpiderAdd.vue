<template>
  <div class='p-3 h-full '>
    <div class='overflow-auto h-full'>
      <a-card class='rounded-xl h-full ' hoverable size='small'>
        <div class="p-5">
          <div class="flex-1">
            <a-button @click="handleDelete(index)" type="primary" class="sticky-button">
              <template #icon>
                <icon-check/>
              </template>
              提交
            </a-button>
          </div>
          <a-divider orientation="center">开始采集</a-divider>
          <div class="">
            <div class="w-2/3 mx-auto">
              <div class="text-center  items-center">
                <div class="">
                  <a-form ref="formRef" :model="form">
                    <a-form-item field="name" label="请求网站" :rules="rules">
                      <a-input v-model="form.name" :placeholder="t('spider.input.url')"/>
                    </a-form-item>
                    <a-form-item field="post" label="请求参数">
                      <a-input v-model="form.post" placeholder="请输入参数"/>
                    </a-form-item>
                    <a-form-item v-for="(post,index) of form.posts" :field="`posts[${index}].value`"
                                 :key="index">
                      <template #label>
                        <a-select placeholder="请输入解析规则" allow-create :options="Options.parse">
                        </a-select>
                      </template>
                      <a-input v-model="post.value" placeholder="请输入解析规则"/>
                      <a-button @click="handleAdd(index)" class="ml-[10px]">
                        <template #icon>
                          <icon-plus/>
                        </template>
                      </a-button>
                      <a-button @click="handleDelete(index)" class="ml-[10px]">
                        <template #icon>
                          <icon-delete/>
                        </template>
                      </a-button>
                    </a-form-item>
                    <div class=" items-center text-center">
                      <a-button @click="handleClick" type="primary">下一步</a-button>
                    </div>
                  </a-form>
                </div>
              </div>
            </div>
            <!--            <a-divider orientation="center">下一步</a-divider>-->
          </div>
        </div>
      </a-card>
    </div>

    <a-modal v-model:visible="addVisible" @ok="handleOk" @cancel="addVisible=false">
      <div>You can customize modal body text by the current situation. This modal will be closed immediately once you
        press the OK button.
      </div>
    </a-modal>
  </div>
</template>

<script setup lang='ts'>
import {ref} from 'vue';
import {useI18n} from 'vue-i18n';
import {Message} from '@arco-design/web-vue';

const {t} = useI18n();
const form = ref({
  name: '',
  post: '',
  posts: [{value: ''}],
  isRead: false,
});
const Options = ref({
  parse: [
    '时间', '标题', '正文', '作者'
  ]
})
const addVisible = ref(false)
const handleAdd = (index: any) => {
  form.value.posts.splice(index + 1, 0, {value: ''})
};
const handleDelete = (index: any) => {
  if (form.value.posts.length === 1) {
    Message.warning('请至少保留一个参数')
    return
  }
  form.value.posts.splice(index, 1)
}


</script>


<style scoped lang='less'>

</style>
