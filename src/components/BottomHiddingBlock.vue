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
  @import '@/styles/variables.scss';

  .hidding-block {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding-top: $hb-padding-top-l-size;
    padding-bottom: $hb-padding-bottop-l-size;
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
        transform: scale(1.0);

        &::before {
          border-color: #b96246;
        }
      }
    }
  }

  .hidding-block_hidden {
    transform: translateY(100%);
  }

  @media screen and (max-width: 1280px) {
    .hidding-block {
      padding-top: $hb-padding-top-m-size;
      padding-bottom: $hb-padding-bottop-m-size;

      &__btn {
        top: 8px;
        left: calc(50% - 14px);
        right: calc(50% - 14px);
        bottom: calc(100% - 8px - 16px);
        width: 24px;
      }
    }
  }

  @media screen and (max-width: 960px) {
      .hidding-block {
        padding-top: $hb-padding-top-s-size;
        padding-bottom: $hb-padding-bottop-s-size;

        &__btn {
          top: 6px;
          left: calc(50% - 14px);
          right: calc(50% - 14px);
          bottom: calc(100% - 6px - 12px);
          width: 20px;
        }
      }
  }

  @media screen and (max-width: 620px) {
      .hidding-block {
        padding-top: $hb-padding-top-xs-size;
        padding-bottom: $hb-padding-bottop-xs-size;

        &__btn {
          top: 5px;
          left: calc(50% - 14px);
          right: calc(50% - 14px);
          bottom: calc(100% - 5px - 8px);
          width: 16px;
        }
      }
  }

  @media screen and (orientation: $orient-portrait) and (max-width: 960px) {
    .hidding-block {
      padding-top: $hb-padding-top-l-size;
      padding-bottom: $hb-padding-bottop-l-size;

      &__btn {
        top: 10px;
        left: calc(50% - 14px);
        right: calc(50% - 14px);
        bottom: calc(100% - 10px - 20px);
        width: 28px;
      }
    }
  }

  @media screen and (orientation: $orient-portrait) and (max-width: 640px) {
    .hidding-block {
      padding-top: $hb-padding-top-m-size;
      padding-bottom: $hb-padding-bottop-m-size;

      &__btn {
        top: 10px;
        left: calc(50% - 14px);
        right: calc(50% - 14px);
        bottom: calc(100% - 10px - 12px);
        width: 20px;
      }
    }
  }
</style>
