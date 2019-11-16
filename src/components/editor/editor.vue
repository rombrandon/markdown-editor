<template>
  <mavon-editor ref="vm" class="editor" :toolbars="toolbars" v-model="value"
                @imgAdd="handleUpload" @save="handleSave">
    <template slot="right-toolbar-before">
      <Files ref="files" v-model="value"></Files>
    </template>
  </mavon-editor>
</template>

<script>
import Files from '../files';
import toolbars from './toolbars';
import upload from './upload';

export default {
  name: 'Editor',
  props: {
  },
  data() {
    return {
      toolbars,
      value: '',
    };
  },
  computed: {
  },
  watch: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    handleUpload(pos, file) {
      upload(file).then((url) => {
        this.$refs.vm.$img2Url(pos, url);
      });
    },
    handleSave() {
      this.$refs.files.saveValue();
    },
  },
  components: {
    Files,
  },
};

</script>

<style scoped="" lang="stylus">
.editor
  width 100vw
  height 100vh
</style>
