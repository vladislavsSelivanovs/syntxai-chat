<template>
  <div class="msg-input">
    <div v-if="error" class="msg-input__error">{{ error }}</div>
    <div class="msg-input__row">
      <n-input
        v-model:value="text"
        type="textarea"
        :placeholder="placeholder"
        :autosize="{ minRows: 1, maxRows: 4 }"
        :disabled="disabled"
        class="msg-input__field"
        @keydown.enter.exact.prevent="onSend"
      />
      <n-button
        type="primary"
        :disabled="disabled || !text.trim()"
        :loading="disabled"
        class="msg-input__btn"
        @click="onSend"
      >
        <template #icon>
          <n-icon><SendOutline /></n-icon>
        </template>
      </n-button>
    </div>
    <div class="msg-input__hint">Enter - отправить</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { SendOutline } from '@vicons/ionicons5'

const props = defineProps({
  modelValue: { type: String, default: '' },
  error: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String, default: 'Напишите сообщение...' },
})

const emit = defineEmits(['update:modelValue', 'send'])

const text = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})

function onSend() {
  emit('send')
}
</script>

<style lang="scss">
.msg-input {
  padding: 12px 16px 16px;
  border-top: 1px solid var(--color-border);
  background: var(--color-surface);
  display: flex;
  flex-direction: column;
  gap: 6px;

  &__error {
    font-size: 12px;
    color: #f56c6c;
    padding: 0 2px;
  }

  &__row {
    display: flex;
    gap: 10px;
    align-items: flex-end;
  }

  &__field {
    flex: 1;

    .n-input__textarea-el {
      resize: none;
    }
  }

  &__btn {
    height: 36px;
    width: 44px;
    flex-shrink: 0;
    padding: 0;
  }

  &__hint {
    font-size: 11px;
    color: var(--color-text-muted);
  }
}
</style>
