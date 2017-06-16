<template>
  <div class="mint-search">
    <div class="mint-searchbar">
      <div class="mint-searchbar-inner">
        <i class="mintui mintui-search"></i>
        <input
        ref="input"
        @click="visible = true"
        type="search"
        v-model="currentValue"
        :placeholder="placeholder"
        class="mint-searchbar-core">
      </div>
      <a
        class="mint-searchbar-cancel"
        @click="visible = false, currentValue = ''"
        v-show="visible"
        v-text="cancelText">
      </a>
    </div>
    <div class="mint-search-list" v-show="visible">
      <div class="mint-search-list-warp">
        <slot>
          <x-cell v-for="(item, index) in result" :key="index" :title="item"></x-cell>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import XCell from 'mint-ui/packages/cell/index.js';
if (process.env.NODE_ENV === 'component') {
  require('mint-ui/packages/cell/style.css');
}

/**
 *  这里需要重写一下Mini-ui的Search组件 原因是原有的子组件与父组件之间通过.sync来实现
 *  双向绑定的方法从Vue 2.3+ 开始已经修改成了语法糖，因此原有的通信方式已经无法使用
 *  这里已经在github 上提出了 详情可以查看 https://github.com/ElemeFE/mint-ui/issues/888
 */
export default {
  name: 'mt-search',
  data() {
    return {
      visible: false,
      currentValue: this.value
    };
  },

  components: { XCell },

  watch: {
    currentValue(val) {
      this.$emit('input', val);
    },
    value(val) {
      this.currentValue = val;
    },
    visible() {
      this.$emit('update:visible', this.visible);
    }
  },

  props: {
    value: String,
    autofocus: Boolean,
    show: Boolean,
    cancelText: {
      default: '取消'
    },
    placeholder: {
      default: '搜索'
    },
    result: Array
  },

  mounted() {
    this.autofocus && this.$refs.input.focus();
  }
};
</script>

<style lang="scss" scoped>
$white-base: #ffffff;
$primary-color: #31c27c;

.mint-search {
  position: fixed;
  z-index: 2;
  left: 0;
  right: 0;
  top: 0;
  height: auto;
  transition: top .5s ease;
  margin-top: 40px;
  .mint-search-list {
    background-color: $white-base;
  }
  .mint-searchbar {
    background-color: $primary-color;
    .mintui-search {
      margin-left: 5px;
      font-size: 14px;
      color: $white-base;
    }
    &-inner {
      height: 30px;
      padding: 0;
      border-radius: 4px;
    }
    &-inner, input {
      color: $white-base;
      background-color: #55a772;
    }
    input {
      -webkit-appearance: textfield;
      user-select: auto;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
    }
    input::-webkit-input-placeholder {
      font-size: 14px;
      color: $white-base;
    }
    &-cancel {
      font-size: 14px;
      color: $white-base;
    }
  }
}

.mint-indicator-wrapper {
  z-index: 3;
  top: 30%;
}
</style>
