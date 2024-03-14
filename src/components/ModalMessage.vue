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
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.teleport-modal-msg {
  z-index: 2;
  position: absolute;
  top: 0;
  left: calc(-120% - 5px);
  @include display-flex (column, center);
  width: 120%;
  height: 70px;
  padding: 5px 40px 5px 5px;
  border-top-right-radius: 11px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  background-color: $primary-color;
  color: $light-primary-color;

  &::after {
    content: '';
    position: absolute;
    top: 0px;
    right: 0px;
    padding: 8px;
    background-color: $primary-color;
    border-radius: 0px 3px;
    transform-origin: top right;
    transform: rotate(45deg) translateX(17px) translateY(4px);
  }
}
</style>
