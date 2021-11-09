<template>
  <div id="app">
    <!-- <button>
      <h1>
        <router-link class="links" to="topoindex">topo</router-link>
      </h1>
    </button>
    &nbsp;
    <button>
      <h1>
        <router-link class="links" to="treetopo">treetopo</router-link>
      </h1>
    </button>

    <br />
    <br />
    <br />
    <router-view></router-view> -->
    <div class="topoArea">
      <v-topo></v-topo>
    </div>
  </div>
</template>

<script>
import vTopo from "./components/vTopo/vTopo";
export default {
  name: "App",
  components: {
    vTopo,
  },
};
</script>

<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.topoArea {
  height: 100%;
  min-height: 800px;
  box-sizing: border-box;
}
</style>
