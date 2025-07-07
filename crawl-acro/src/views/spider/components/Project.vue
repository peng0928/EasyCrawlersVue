<template>
  <div class='p-3'>
    <div class=''>
      <a-card class='rounded-xl' hoverable size='small'>
        <div class="p-2">
          <div class="text-xl font-bold">
            <a-typography-text>
              项目
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
                  <a-form-item field="name" tooltip="" label="时间">
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
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];
const data = ref([{
  key: '1',
  name: 'Jane Doe',
  salary: 23000,
  address: '32 Park Road, London',
  email: 'jane.doe@example.com'
}, {
  key: '2',
  name: 'Alisa Ross',
  salary: 25000,
  address: '35 Park Road, London',
  email: 'alisa.ross@example.com'
}, {
  key: '3',
  name: 'Kevin Sandra',
  salary: 22000,
  address: '31 Park Road, London',
  email: 'kevin.sandra@example.com'
}, {
  key: '4',
  name: 'Ed Hellen',
  salary: 17000,
  address: '42 Park Road, London',
  email: 'ed.hellen@example.com'
}, {
  key: '5',
  name: 'William Smith',
  salary: 27000,
  address: '62 Park Road, London',
  email: 'william.smith@example.com'
}]);

</script>
