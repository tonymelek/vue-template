<template>
  <router-view />
</template>
<script >
 import { isLive } from './constants'; 
export default {
  created(){
      const script = document.createElement('script');
       script.src = isLive?'./square-sdk/live.js':'./square-sdk/sandbox.js';    
       document.head.appendChild(script);
    },
}
</script>
<style scoped>

</style>
