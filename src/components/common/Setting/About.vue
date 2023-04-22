<script setup lang='ts'>
import { computed, onMounted, ref } from 'vue'
import { NSpin } from 'naive-ui'
import { fetchChatConfig } from '@/api'
import { useAuthStore } from '@/store'
interface ConfigState {
  timeoutMs?: number
  reverseProxy?: string
  apiModel?: string
  socksProxy?: string
  httpsProxy?: string
  usage?: string
}
const authStore = useAuthStore()
const loading = ref(false)
const config = ref<ConfigState>()
const isChatGPTAPI = computed<boolean>(() => !!authStore.isChatGPTAPI)
async function fetchConfig() {
  try {
    loading.value = true
    const { data } = await fetchChatConfig<ConfigState>()
    config.value = data
  }
  finally {
    loading.value = false
  }
}
onMounted(() => {
  fetchConfig()
})
</script>

<template>
  <NSpin :show="loading">
    <div class="p-4 space-y-4">
     <h3 class="text-xl font-bold">
        如果你觉得此项目对你有帮助，可以打赏我一杯冰可乐，谢谢
      </h3>
      
			 <div style="position: relative;">
       
    <button style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);border: 2px solid black;" onclick="window.location.href='http://qnyblog.lsxyyds.xyz/wx1.png'">打赏</button>

   		</div>
      
    
      <p>{{ $t("setting.api") }}：{{ config?.apiModel ?? '-' }}</p>
      <p v-if="isChatGPTAPI">
        {{ $t("setting.monthlyUsage") }}：{{ config?.usage ?? '-' }}
      </p>
      <p v-if="!isChatGPTAPI">
        {{ $t("setting.reverseProxy") }}：{{ config?.reverseProxy ?? '-' }}
      </p>
      <p>{{ $t("setting.timeout") }}：{{ config?.timeoutMs ?? '-' }}</p>
      <p>{{ $t("setting.socks") }}：{{ config?.socksProxy ?? '-' }}</p>
      <p>{{ $t("setting.httpsProxy") }}：{{ config?.httpsProxy ?? '-' }}</p>
    </div>
  </NSpin>
</template>
