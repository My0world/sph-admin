<template>
  <div class="dashboard">
    <HeaderCard></HeaderCard>
    <Sale></Sale>
    <Observe></Observe>
  </div>
</template>


<script>
import HeaderCard from './HeaderCard/HeaderCard';
import Sale from './Sale/Sale';
import Observe from './Observe/Observe';
export default {
  name: "dashboard",
  components: {
    HeaderCard,
    Sale,
    Observe
  },
  data() {
    return {}
  },

  methods: {
    getData() {
      this.$store.dispatch("home/getData")
    }
  },
  mounted() {
    this.getData()
  },
}
</script>


<style>
.dashboard {}
</style>

