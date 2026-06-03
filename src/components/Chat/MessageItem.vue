<template>
  <div class="message" :class="`message--${message.sender}`">
    <div v-if="message.sender === 'bot'" class="message__avatar">
      {{ chatAvatar }}
    </div>
    <div class="message__bubble">
      <p class="message__text">{{ message.text }}</p>
      <span class="message__time">{{ formattedTime }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  message: { type: Object, required: true },
  chatAvatar: { type: String, default: '🤖' },
})

const formattedTime = computed(() => {
  return new Date(props.message.ts).toLocaleTimeString('ru', {
    hour: '2-digit',
    minute: '2-digit',
  })
})
</script>

<style lang="scss">
.message {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  animation: msg-in 0.2s ease;

  &--user {
    flex-direction: row-reverse;

    .message__bubble {
      background: var(--color-user-msg);
      border-radius: 18px 18px 4px 18px;
      color: #fff;
    }

    .message__time {
      color: rgba(255,255,255,0.6);
      text-align: right;
    }
  }

  &--bot {
    flex-direction: row;

    .message__bubble {
      background: var(--color-bot-msg);
      border-radius: 18px 18px 18px 4px;
      border: 1px solid var(--color-border);
      color: var(--color-text);
    }
  }

  &__avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: var(--color-surface-2);
    border: 1px solid var(--color-border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
    margin-bottom: 2px;
  }

  &__bubble {
    max-width: 65%;
    padding: 10px 14px 6px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__text {
    font-size: 14px;
    line-height: 1.5;
    word-break: break-word;
  }

  &__time {
    font-size: 11px;
    color: var(--color-text-muted);
    align-self: flex-end;
  }
}

@keyframes msg-in {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
