<template>
  <div class='grid md:grid-cols-1 lg:grid-cols-3 gap-12'>
    <div class=''>
      <a-card class='rounded-xl' hoverable size='small'>
        <div class='text-xl flex justify-between'>
          <a-typography-text bold>
            CPU
          </a-typography-text>
          <IconFont type='icon-microchip' :size='26' class='text-blue-500'/>
        </div>
        <VCharts :option='option' :autoResize='true' width='150' height='150' class='h-60'/>
        <div v-for='item in systemInfo.microchip' :key='item.name' class='flex justify-between items-center'>
          <a-typography-text class='text-sm'>
            {{ item.name }}:
          </a-typography-text>
          <a-typography-text bold>
            {{ item.value }}
          </a-typography-text>
        </div>
      </a-card>
    </div>
    <div>
      <a-card class='rounded-xl' hoverable size='small'>
        <div class='text-xl flex justify-between'>
          <a-typography-text bold>
            内存
          </a-typography-text>
          <IconFont type='icon-memory' :size='26' class='text-yellow-600'/>
        </div>
        <VCharts :option='option' :autoResize='true' width='150' height='150' class='h-60'/>
        <div class='flex justify-between items-center' v-for='item in systemInfo.memory' :key='item.name'>
          <a-typography-text class='text-sm'>
            {{ item.name }}:
          </a-typography-text>
          <a-typography-text bold>
            {{ item.value }}
          </a-typography-text>
        </div>
      </a-card>
    </div>
    <div>
      <a-card class='rounded-xl' hoverable size='small'>
        <div class='text-xl flex justify-between'>
          <a-typography-text bold>
            磁盘
          </a-typography-text>
          <IconFont type='icon-a-ssddiskspace' :size='26' class='text-purple-600'/>
        </div>
        <VCharts :option='option' :autoResize='true' width='150' height='150' class='h-60'/>
        <div class='flex justify-between items-center' v-for='item in systemInfo.memory' :key='item.name'>
          <a-typography-text class='text-sm'>
            {{ item.name }}:
          </a-typography-text>
          <a-typography-text bold>
            {{ item.value }}
          </a-typography-text>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {ref} from 'vue';
import VCharts from '@/components/chart/index.vue'

import useLoading from '@/hooks/loading';
import useChartOption from '@/hooks/chart-option';

const {loading} = useLoading();
const {chartOption} = useChartOption((isDark) => {
  // echarts support https://echarts.apache.org/zh/theme-builder.html
  // It's not used here
  return {
    legend: {
      left: 'center',
      data: ['剩余', '占用'],
      bottom: 0,
      icon: 'circle',
      itemWidth: 8,
      textStyle: {
        color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#4E5969',
      },
      itemStyle: {
        borderWidth: 0,
      },
    },
    tooltip: {
      show: true,
      trigger: 'item',
    },
    graphic: {
      elements: [
        {
          type: 'text',
          left: 'center',
          top: '40%',
          style: {
            text: '剩余',
            textAlign: 'center',
            fill: isDark ? '#ffffffb3' : '#4E5969',
            fontSize: 14,
          },
        },
        {
          type: 'text',
          left: 'center',
          top: '50%',
          style: {
            text: '47.6%',
            textAlign: 'center',
            fill: isDark ? '#ffffffb3' : '#1D2129',
            fontSize: 16,
            fontWeight: 500,
          },
        },
      ],
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['50%', '50%'],
        label: {
          formatter: '{d}%',
          fontSize: 14,
          color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#4E5969',
        },
        itemStyle: {
          borderColor: isDark ? '#232324' : '#fff',
          borderWidth: 1,
        },
        data: [
          {
            value: [148564],
            name: '占用',
            itemStyle: {
              color: isDark ? '#3D72F6' : '#F53F3F',
            },
          },
          {
            value: [334271],
            name: '剩余',
            itemStyle: {
              color: isDark ? '#A079DC' : '#3491FA',
            },
          }
        ],
      },
    ],
  };
});
const systemInfo = ref(
    {
      microchip: [
        {
          name: '负载',
          value: '47.6%',
        }, {
          name: '核心数',
          value: '8',
        }, {
          name: '架构',
          value: 'x86',
        }
      ],
      memory: [
        {
          name: '已用内存',
          value: '7GB',
        },
        {
          name: '总内存',
          value: '16GB',
        }, {
          name: '可用内存',
          value: '9GB',
        }
      ]
    }
)
const option = ref(chartOption)
</script>
