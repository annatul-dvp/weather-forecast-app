<template>
  <Teleport v-if="!!shown" to="#msg-teleport-target">
    <div ref="contentElement" class="teleport-modal-msg" :class="style">
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
    shown: { type: Boolean, String },
    style: { type: String }
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
  @include display-flex (column, center);
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  background-color: $primary-color;
  color: $light-primary-color;

  &_big-screen {
    top: 0;
    left: calc(-120% - 5px);
    padding: 5px 40px 5px 5px;
    height: 70px;
    width: 120%;
    border-top-right-radius: 11px;

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

  &_small-screen {
    top: calc(100% + 12px);
    left: auto;
    right: 0;
    padding: 5px 5px 5px 5px;
    height: 40px;
    width: 100%;
    font-size: .8rem;
    border-top-right-radius: 6px;

    &::after {
      content: '';
      position: absolute;
      top: -5px;
      right: 50%;
      padding: 8px;
      background-color: $primary-color;
      border-radius: 0 3px;
      transform-origin: top right;
      transform: rotate(-45deg) translateX(50%);
    }
  }
}
</style>
