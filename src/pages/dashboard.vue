<script setup>
import { GoogleMap, Marker } from 'vue3-google-map'
import { supabase } from '~/superbase.js'
const auth = useAuthStore()
const center = ref()
const zoom = ref(13)
const appointments = ref()
const user = ref()
function logout() {
  auth.logout()
}
onMounted(async () => {
  const adresses = await supabase.from('adresses_users').select('*').eq('id', auth.user.adresses_id)
  center.value = { lat: adresses.data[0].lat, lng: adresses.data[0].long }
  const appointment = await supabase.from('appointments').select('*, practitioner_id(*, adresses_id(*))').eq('user_id', auth.user.id)
  appointments.value = appointment.data
})
</script>

<template>
  <div class="flex flex-row">
    <GoogleMap api-key="AIzaSyDny_wisQF1y9tIPCKBpyzCSqlgTHWNod4" style="width: 50%; height: 500px" :center="center" :zoom="15">
      <Marker v-for="appointment in appointments" :key="appointment.id" :options="{ position: { lat: appointment.practitioner_id.adresses_id.lat, lng: appointment.practitioner_id.adresses_id.long } }" />
    </GoogleMap>
    <DataTable class="w-2/3" :value="appointments">
      <template #header>
        <div style="text-align: left">
          <Button icon="pi pi-external-link" class="bg-blue" label="Prendre render-vous avec un autre patricien" @click="exportCSV($event)" />
        </div>
      </template>
      <Column field="practitioner_id.username" header="Patricien" />
      <Column field="date" header="Date de rendez-vous" />
    </DataTable>
  </div>
</template>

<route lang="yaml">
meta:
  needAuth: true
</route>
