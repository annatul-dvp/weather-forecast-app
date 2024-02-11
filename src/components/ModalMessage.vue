<template>
  <Teleport v-if="!!shown" to="#msg-teleport-target">
    <div ref="contentElement" class="teleport-modal-msg">
        <slot></slot>
      </div>
  </Teleport>
</template>

<script>
import {
  defineComponent,
  ref,
  watch
} from 'vue'

import useModal from '@/hooks/useModal'

export default defineComponent({
  props: {
    shown: { type: Boolean, String }
  },
  setup (props, { emit: $emit }) {
    const contentElement = ref(null)

    const { doOpen, doClose } = useModal()

    const doCloseModal = () => {
      $emit('update:shown', false)
    }

    const onOutsideClick = ($event) => {
      if ($event.target !== contentElement.value && $event.target.contains(contentElement.value)) {
        doCloseModal()
      }
    }

    watch(() => props.shown, (isShown) => {
      if (isShown) {
        doOpen()
      } else {
        doClose()
      }
    }, { immediate: true })

    return {
      onOutsideClick,
      doCloseModal,

      contentElement
    }
  }
})
</script>

<style scoped lang="scss">
$primary-color: #22475a;
$light-primary-color: #ffffff;
$active-color: #6e4241;
$focused-color: #b96246;
$light-color: #eec583;
$middle-color: #ef8d50;

.teleport-modal-msg {
  z-index: 2;
  position: absolute;
  top: 0;
  left: calc(-120% - 5px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 120%;
  height: 70px;
  padding: 5px 40px 5px 5px;
  // border: 3px solid $primary-color;
  // border-radius: 6px;
  border-top-right-radius: 11px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  background-color: $primary-color;
  color: $light-primary-color;

  // &::before {
  //   content: '';
  //   position: absolute;
  //   top: 0px;
  //   right: 0px;
  //   padding: 8px;
  //   border-top: 3px solid red;
  //   // border-bottom-left-radius: 100%;
  //   // border-bottom-right-radius: 100%;
  //   background-color: $primary-color;
  // }

  &::after {
    content: '';
    position: absolute;
    top: 0px;
    right: 0px;
    padding: 8px;
    background-color: $primary-color;
    border-radius: 0px 3px;
    // border-top: 3px solid red;
    // border-right: 3px solid red;
    // border-top-right-radius: 100%;

    transform-origin: top right;
    transform: rotate(45deg) translateX(17px) translateY(4px);
  }
}
</style>
