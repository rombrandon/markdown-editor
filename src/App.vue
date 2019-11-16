<template>
  <div id="app">
    <Editor></Editor>
  </div>
</template>

<script>
import Editor from './components/editor';

export default {
  name: 'app',
  created() {
  },
  components: {
    Editor,
  },
};
</script>

<style lang="stylus">
@import "./index.styl"
html,body
  width 100%
  height 100%
  padding 0
  margin 0
</style>
