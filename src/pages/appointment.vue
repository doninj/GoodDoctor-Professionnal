<script setup>
import { supabase } from '~/superbase.js'

const value = ref()
const search = ref()
const patriciens = ref()
onMounted(async () => {
  const { data } = await supabase.from('profiles').select('*').eq('is_doctor', true)
  console.log(data)
  patriciens.value = data
})
</script>

<template>
  <div>
    <div class="flex flex-col items-center">
      <AutoComplete
        v-model="search"
        class="w-2/3"
        option-label="username"
        placeholder="Rechercher un patricien"
        :suggestions="patriciens"
      />      <Calendar v-model="value" placeholder="date" class="w-2/3" />
      <InputText v-model="search" class="w-2/3" placeholder="Adresse" disabled />
    </div>
  </div>
</template>
