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
          <div class="flex justify-between">
            <div>
              <a-button type="primary" @click="addVisible=true">
                <template #icon>
                  <IconFont type='icon-xinzeng1-copy'/>
                </template>
                新增
              </a-button>
            </div>
            <div>
              <a-button type="primary" @click="PostProjectList">
                <template #icon>
                  <icon-refresh/>
                </template>
              </a-button>
            </div>
          </div>
          <a-divider/>
          <div class="h-[60vh]">
            <a-table :columns="columns" :data="data" :bordered="{cell:true}"
                     :loading="tableConfig.loading" :pagination="false"
                     :scroll="scrollPercent" :scrollbar="true"
            >
              <template #columns>
                <a-table-column title="序号">
                  <template #cell="{ record }">
                    <a-typography-text bold>
                      {{ record.index }}
                    </a-typography-text>
                  </template>
                </a-table-column>
                <a-table-column title="项目" data-index="projectName">
                  <template #cell="{ record }">
                    <a-typography-text type="primary" bold>
                      {{ record.projectName }}
                    </a-typography-text>
                  </template>
                </a-table-column>
                <a-table-column title="标签" data-index="tags">
                  <template #cell="{ record }">
                    <div class="flex gap-3">
                      <a-tag v-for="(name, index) of record.tags" :key="index" :color="colors[index]" bordered>
                        {{ name }}
                      </a-tag>
                    </div>
                  </template>
                </a-table-column>
                <a-table-column title="备注" data-index="remarks">
                  <template #cell="{ record }">
                    <a-typography-text bold>
                      {{ record.remarks }}
                    </a-typography-text>
                  </template>
                </a-table-column>
                <a-table-column title="爬虫数" data-index="salary"></a-table-column>
                <a-table-column title="创建时间" data-index="create_time">
                  <template #cell="{ record }">
                    <a-typography-text bold>
                      {{ record.create_time }}
                    </a-typography-text>
                  </template>
                </a-table-column>
                <a-table-column title="操作">
                  <template #cell="{ record }">
                    <div class="flex gap-3">
                      <a-button type="primary">
                        <template #icon>
                          <icon-plus/>
                        </template>
                      </a-button>
                         <a-button type="primary" status="warning">
                        <template #icon>
                          <icon-edit/>
                        </template>
                      </a-button>
                      <a-button type="primary" status="danger">
                        <template #icon>
                          <icon-delete/>
                        </template>
                      </a-button>
                    </div>
                  </template>
                </a-table-column>
              </template>
            </a-table>
          </div>
          <div class="p-3 flex justify-end pr-16">
            <a-pagination :total="pagination.total" show-total show-jumper show-page-size
                          v-model:current="pagination.current" v-model:page-size="pagination.pageSize"
                          @change="paginationChange" @page-size-change="paginationSizeChange"
            />
          </div>
        </div>
      </a-card>
    </div>

    <a-modal v-model:visible="addVisible" @ok="handleOk" @cancel="addVisible=false" :hide-title="true">
      <a-form :model="ProjectForm" @submit="handleSubmit" class="pt-8">
        <a-form-item field="name" label="项目名">
          <a-input
              v-model="ProjectForm.title"
              placeholder="请输入项目名称"
          />
        </a-form-item>
        <a-form-item field="post" label="标签">
          <a-input-tag v-model:model-value="ProjectForm.tag" placeholder="请输入内容进行回车" allow-clear/>
        </a-form-item>
        <a-form-item field="post" label="备注">
          <a-input v-model="ProjectForm.remarks" placeholder="备注"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang='ts'>
import {ref, onMounted} from 'vue';
import {createProject, getProjectList} from "@/api/spider";
import {Message} from '@arco-design/web-vue';

const colors = [
  'arcoblue',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta',
  'gray'
];
const form = ref({
  name: '',
  tag: [],
  isRead: false,
});

const ProjectForm = ref({
  title: '',
  tag: [],
  remarks: '',
});

const handleSubmit = (data: any) => {
  console.log(data);
};

const scrollPercent = {
  x: '100%',
  y: '100%'
};
const columns = [
  {
    title: '序号',
    dataIndex: 'index',
  },
  {
    title: '名称',
    dataIndex: 'projectName',
  },
  {
    title: '标签',
    dataIndex: 'tags',
  },
  {
    title: '备注',
    dataIndex: 'remarks',
  },
  {
    title: '爬虫数',
    dataIndex: 'salary',
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
  },
  {
    title: '操作',
    dataIndex: 'option',
  },
];
const data = ref([]);
const tableConfig = ref({
  loading: false,
})
const pagination = ref({
  total: 0,
  pageSize: 10,
  current: 1,
})

const addVisible = ref(false)
const handleOk = () => {
  PostCreateProject()
}
const PostCreateProject = async () => {
  const projectName = ProjectForm.value.title
  const tag = ProjectForm.value.tag
  const remarks = ProjectForm.value.remarks
  const response = createProject({projectName: projectName, tags: tag, remarks: remarks})
  response.then(res => {
    Message.success(`${res.data.projectName} 项目创建成功`)
  })
}
const PostProjectList = async () => {
  tableConfig.value.loading = true
  const response = getProjectList({page: pagination.value.current, size: pagination.value.pageSize})
  response.then(res => {
    data.value = res.data.data
    tableConfig.value.loading = false
    pagination.value.total = res.data.total
  })
  response.catch(err => {
    tableConfig.value.loading = false
  })
}

const paginationChange = (current: number) => {
  pagination.value.current = current
  PostProjectList()
}
const paginationSizeChange = (size: number) => {
  pagination.value.pageSize = size
  PostProjectList()
}

onMounted(() => {
  PostProjectList()
})

</script>
