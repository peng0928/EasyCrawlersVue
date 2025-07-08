<template>
  <div class='p-3'>
    <div class=''>
      <a-card class='rounded-xl' hoverable size='small'>
        <div class="p-2">
          <div class="text-xl font-bold">
            <a-typography-text>
              爬虫
            </a-typography-text>
          </div>
          <div class="grid md:grid-cols-1 lg:grid-cols-12 gap-6">
            <div class="col-span-11">
              <a-form :model="form" @submit="handleSubmit">
                <div class="grid md:grid-cols-1 lg:grid-cols-3 gap-1">
                  <a-form-item field="name" tooltip="" label="项目名">
                    <a-input
                        v-model="form.name"
                        placeholder="please enter your username..."
                    />
                  </a-form-item>
                  <a-form-item field="name" tooltip="" label="标签">
                    <a-input
                        v-model="form.name"
                        placeholder="please enter your username..."
                    />
                  </a-form-item>
                  <a-form-item field="name" tooltip="" label="时间">
                    <a-input
                        v-model="form.name"
                        placeholder="please enter your username..."
                    />
                  </a-form-item>
                  <a-form-item field="name" tooltip="" label="内容">
                    <a-input
                        v-model="form.name"
                        placeholder="please enter your username..."
                    />
                  </a-form-item>
                </div>
              </a-form>
            </div>
            <div class="lg:col-span-1 lg:grid gap-1 lg:text-center md:text-left md:flex">
              <div>
                <a-button type="primary">查询</a-button>
              </div>
              <div>
                <a-button>重置</a-button>
              </div>
            </div>
          </div>
          <div class="flex gap-3">
            <a-button type="primary">
              <template #icon>
                <IconFont type='icon-xinzeng1-copy'/>
              </template>
              新增
            </a-button>
            <a-button type="primary">
              <template #icon>
                <IconFont type='icon-daoru-copy'/>
              </template>
              导入
            </a-button>
          </div>

          <a-divider/>

          <a-table :columns="columns" :data="data" :bordered="false"/>

        </div>
      </a-card>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {ref} from 'vue';

const form = ref({
  name: '',
  post: '',
  isRead: false,
});
const handleSubmit = (data: any) => {
  console.log(data);
};

const columns = [
  {
    title: '项目',
    dataIndex: 'name',
  },
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '类型',
    dataIndex: 'name',
  },
  {
    title: '运行命令',
    dataIndex: 'salary',
  },
  {
    title: '创建时间',
    dataIndex: 'address',
  },
  {
    title: '操作',
    dataIndex: 'email',
  },
];
const data = ref([]);

</script>
