<script setup>
import { useRouter } from 'vue-router'
import { supabase } from '~/superbase.js'

const appointments = ref()
const route = useRouter()
const auth = useAuthStore()

async function acceptRdv(rdv) {
  await supabase.from('appointments').update([
    {
      validate_appointment: 'accept',
    },
  ]).eq('id', rdv.data.id)
}

async function refuseRdv(rdv) {
  await supabase.from('appointments').update([
    {
      validate_appointment: 'refuse',
    },
  ]).eq('id', rdv.data.id)
}

onMounted(async () => {
  const { data } = await supabase.from('appointments').select('*, user_id(*), practitioner_id(*, adresses_id(*))').eq('practitioner_id', auth.user.id)
  appointments.value = data
})
</script>

<template>
  <div>
    <DataTable class="w-2/3" :value="appointments">
      <template #header>
        <div style="text-align: left"/>
      </template>
      <Column field="date" header="Date du rendez-vous"/>
      <Column field="user_id.username" header="Nom du patient"/>
      <Column :exportable="false" style="min-width:8rem">
        <template #body="slotProps">
          <div class="flex flex-row">
            <Button label="Accepter le rendez-vous" class="text-blue" @click="acceptRdv(slotProps)"></Button>
            <Button label="Refusez le rendez-vous" class="text-red" @click="refuseRdv(slotProps)"></Button>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<route lang="yaml">
meta:
  needAuth: true
</route>
