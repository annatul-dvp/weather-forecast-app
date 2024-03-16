<template>
  <Teleport v-if="open" to="#teleport-target">
    <div class="teleport-blackout"></div>
    <div class="teleport-modal" @click="onOutsideClick" ref="modal">
      <div ref="contentElement" class="teleport-modal__content" :class="style">
        <button type="button" class="teleport-modal__close" :class="closeBtnStyle" @click="doCloseModal"></button>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<script>
import {
  defineComponent,
  ref,
  watch,
  computed
} from 'vue'

import useModal from '@/hooks/useModal'

export default defineComponent({
  props: {
    open: { type: Boolean },
    style: { type: String, required: true } // ModalWindow style to control looks for diffent window sizes
  },
  setup (props, { emit: $emit }) {
    const contentElement = ref(null)

    const closeBtnStyle = computed(() => {
      return props.style + '__close'
    })

    const { doOpen, doClose } = useModal()

    const doCloseModal = () => {
      $emit('update:open', false)
    }

    const onOutsideClick = ($event) => {
      if ($event.target !== contentElement.value && $event.target.contains(contentElement.value)) {
        doCloseModal()
      }
    }

    watch(() => props.open, (isOpen) => {
      if (isOpen) {
        doOpen()
      } else {
        doClose()
      }
    }, { immediate: true })

    return {
      onOutsideClick,
      doCloseModal,

      contentElement,
      closeBtnStyle
    }
  }
})
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.teleport-blackout {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.75;
  background-color: $primary-color;
}
.teleport-modal {
  z-index: 1000;
  overflow: auto;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;

  &__content {
    position: relative;
    @include display-flex (column, center);
    // min-width: 500px;
    // max-width: 50%;
    // min-height: 300px;
    margin-top: auto;
    margin-bottom: auto;
    padding: 40px;
    border-radius: 6px;
    background-color: $light-primary-color;
  }

  &__close {
    position: absolute;
    top: 0;
    right: 0;
    // padding: 20px;
    // line-height: 1;
    background-color: transparent;
    border: none;
    // font-size: 20px;

    &::before {
      content: '';
      position: absolute;
      top: 25%;
      left: 0;
      // width: 30px;
      // height: 30px;
      // border-left: 4px solid $primary-color;
      transform-origin: center;
      // transform: rotate(45deg) translate(13px, -22%);
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      // width: 30px;
      // height: 30px;
      // border-bottom: 4px solid $primary-color;
      transform-origin: center;
      // transform: rotate(45deg) translate(6px, -18px);
    }
  }
}

.size-big-screen {
  min-width: 500px;
  max-width: 50%;
  min-height: 300px;

  &__close {
    padding: 20px;

    &::before {
      width: 30px;
      height: 30px;
      border-left: 4px solid $primary-color;
      transform: rotate(45deg) translate(13px, -22%);
    }

    &::after {
      width: 30px;
      height: 30px;
      border-bottom: 4px solid $primary-color;
      transform: rotate(45deg) translate(6px, -18px);
    }
  }
}

.size-small-screen {
  min-width: 150px;
  max-width: 80%;
  min-height: 150px;

  &__close {
    padding: 20px;

    &::before {
      width: 20px;
      height: 20px;
      border-left: 2px solid $primary-color;
      transform: rotate(45deg) translate(16px, -6px);
    }

    &::after {
      width: 20px;
      height: 20px;
      border-bottom: 2px solid $primary-color;
      transform: rotate(45deg) translate(13px, -11px);
    }
  }
}
</style>
