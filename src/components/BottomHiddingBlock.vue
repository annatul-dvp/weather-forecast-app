<template>
  <div class="hidding-block" :class="[ isHidden, theme ]">
    <button class="hidding-block__btn close-block-btn" @click="doClose"></button>
    <slot></slot>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  watch
} from 'vue'

export default defineComponent({
  props: {
    isChanged: { type: Boolean },
    open: { type: Boolean },
    theme: { type: String, required: true }
  },
  setup (props, { emit: $emit }) {
    const isHidden = ref('')
    const blockStyle = ref('dark-theme')

    const doOpen = () => {
      $emit('update:open', true)
      $emit('update:isChanged', true)
      isHidden.value = ''
    }

    const doClose = () => {
      $emit('update:open', false)
      $emit('update:isChanged', true)
      isHidden.value = 'hidding-block_hidden'
    }

    watch(() => props.open, (isOpen) => {
      if (isOpen) {
        doOpen()
      } else {
        doClose()
      }
    }, { immediate: true })

    return {
      doOpen,
      doClose,
      isHidden,
      blockStyle
    }
  }
})
</script>

<style lang="scss">
  $primary-color: #22475a;
  $light-primary-color: #ffffff;
  $active-color: #6e4241;
  $focused-color: #b96246;
  $light-color: #eec583;
  $middle-color: #ef8d50;

  .hidding-block {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    row-gap: 20px;
    padding-top: 50px;
    padding-bottom: 40px;
    height: 100%;
    transition: all 1s ease-in-out;

    &__btn {
      position:absolute;
      top: 10px;
      left: calc(50% - 14px);
      right: calc(50% - 14px);
      bottom: calc(100% - 10px - 20px);
      background-color: transparent;
      border: none;
      width: 28px;
      transition: all .6s ease-in-out;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 4px;
        right: 4px;
        bottom: 0;
        border-left: 2px solid;
        border-bottom: 2px solid;
        transform-origin: left bottom;
        transform: rotate(-45deg) translateX(8px) translateY(6px);
        transition: all .6s ease-in-out;
      }

      &:hover {
        cursor: pointer;
        transform-origin: center;
        transform: scale(1.2);
      }

      &:active {
        // border: 1px solid $light-primary-color;
        transform: scale(1.0);

        &::before {
          border-color: #b96246;
        }
      }
    }
  }

  .hidding-block_hidden {
    // background-color: red;
    transform: translateY(100%);
  }
</style>
