<template>
  <div class="row">
    <div class="col-2"></div>
      <div class="col-7">
        <instagram-card /></div>
      <div class="col-3">
        ... ovdje ide desni stupac!
      </div>
    </div>
</template>

<script>
// @ is an alias to /src
import instagramCard from '@/components/instagramCard.vue'

export default {
  name: 'Home',
  components: {
    instagramCard
  }
}
</script>
