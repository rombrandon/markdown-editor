<template>
  <Poptip v-model="visible">
    <button title="文件" :class="classes" class="op-icon fa fa-mavon-bars"></button>
    <div slot="content" class="files-content">
      <input class="files-input" type="text" placeholder="重命名"
             v-model="data.name" @change="handleInput">
      <button class="files-add" @click="handleAdd">添加</button>
      <div class="files-others">
        <p class="files-item" v-for="item in others" :key="item.id">
          <span class="files-item-text" @click="handleChange(item.id)">{{item.name}}</span>
          <span class="files-item-close" @click="handleRemove(item.id)">x</span>
        </p>
      </div>
    </div>
  </Poptip>
</template>

<script>
import store from 'store';
import Poptip from 'uif/src/components/poptip';

export default {
  name: 'Files',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      visible: false,
      files: store.get('FILES', []),
    };
  },
  computed: {
    classes() {
      return { selected: this.visible };
    },
    data() {
      return this.files.find(({ active }) => active);
    },
    others() {
      return this.files.filter(({ active }) => !active);
    },
  },
  watch: {
    data: {
      immediate: true,
      handler(data, old) {
        if (old) store.set(`file-${old.id}`, this.value);
        if (data) {
          const value = store.get(`file-${data.id}`, '');
          this.$emit('input', value);
        }
      },
    },
    value() {
      this.saveValue();
    },
  },
  created() {
    this.dataInit();
  },
  mounted() {
  },
  methods: {
    dataInit() {
      if (this.files.length <= 0) {
        this.handleAdd();
      }
    },
    handleInput() {
      this.saveFiles();
    },
    handleChange(id) {
      this.files.forEach((item, index) => {
        this.files[index].active = item.id === id;
      });
      this.saveFiles();
    },
    handleRemove(id) {
      store.remove(`file-${id}`);
      this.files = this.files.filter(item => item.id !== id);
      this.saveFiles();
    },
    handleAdd() {
      this.files.forEach((item, index) => {
        this.files[index].active = false;
      });
      this.files.push({ name: '新文档', id: +new Date(), active: true });
      this.saveFiles();
    },
    saveFiles() {
      store.set('FILES', this.files);
    },
    saveValue() {
      store.set(`file-${this.data.id}`, this.value);
    },
  },
  components: {
    Poptip,
  },
};

</script>

<style scoped="" lang="stylus">
.op-icon
  font-size 17px
  padding 5px 6px 5px 3px
.files-content
  padding 5px
  text-align left
.files-input
  outline none
  font-size 12px
  line-height 22px
  border 1px solid transparent
  border-bottom-color #BFBFBF
  padding 0 5px
  display inline-block
.files-others
  padding 5px
  .files-item
    margin 0
    display flex
    align-items center
    cursor pointer
    &-text
      flex auto
      color #999
      font-size 12px
      line-height 22px
      &:hover
        color #000
    &-close
      flex-shrink 0
      font-size 12px
      width 20px
      line-height 20px
      text-align center
      border-radius 50%
      &:hover
        color #000
        background-color #f5f5f5
.files-add
  outline none
  border 1px solid #BFBFBF
  background-color transparent
  border-radius 2px
  color #666
  font-size 12px
  line-height 22px
  padding 0 10px
  cursor pointer
  &:hover
    background-color #f5f5f5
</style>
