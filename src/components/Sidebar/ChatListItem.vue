<template>
  <router-link
    :to="`/chat/${chat.id}`"
    class="chat-item"
    :class="{ 'chat-item--active': isActive }"
  >
    <div class="chat-item__avatar">{{ chat.avatar }}</div>
    <div class="chat-item__content">
      <div class="chat-item__header">
        <span class="chat-item__name">{{ chat.name }}</span>
        <span class="chat-item__time">{{ lastTime }}</span>
      </div>
      <div class="chat-item__preview">
        <span class="chat-item__last-msg">{{ lastMessage }}</span>
        <button
          class="chat-item__fav"
          :class="{ 'chat-item__fav--active': chat.favorite }"
          @click.prevent="store.toggleFavorite(chat.id)"
          title="Избранное"
        >★</button>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useChatStore } from '../../stores/chatStore'

const props = defineProps({
  chat: { type: Object, required: true },
})

const route = useRoute()
const store = useChatStore()

const isActive = computed(() => Number(route.params.id) === props.chat.id)

const lastMessage = computed(() => {
  const msgs = props.chat.messages
  if (!msgs.length) return 'Нет сообщений'
  const last = msgs[msgs.length - 1]
  const prefix = last.sender === 'user' ? 'Вы: ' : ''
  return prefix + last.text
})

const lastTime = computed(() => {
  const msgs = props.chat.messages
  if (!msgs.length) return ''
  const ts = msgs[msgs.length - 1].ts
  const d = new Date(ts)
  const now = new Date()
  if (d.toDateString() === now.toDateString()) {
    return d.toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })
  }
  return d.toLocaleDateString('ru', { day: '2-digit', month: '2-digit' })
})
</script>

<style lang="scss">
.chat-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 8px;
  border-radius: 10px;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: var(--color-surface-2);
  }

  &--active {
    background: rgba(124, 106, 255, 0.15) !important;

    .chat-item__name {
      color: var(--color-primary);
    }
  }

  &__avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--color-surface-2);
    border: 1px solid var(--color-border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
  }

  &__content {
    flex: 1;
    min-width: 0;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 4px;
    margin-bottom: 2px;
  }

  &__name {
    font-size: 13px;
    font-weight: 600;
    color: var(--color-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__time {
    font-size: 11px;
    color: var(--color-text-muted);
    flex-shrink: 0;
  }

  &__preview {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
  }

  &__last-msg {
    font-size: 12px;
    color: var(--color-text-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
  }

  &__fav {
    background: none;
    border: none;
    color: var(--color-text-muted);
    font-size: 14px;
    cursor: pointer;
    padding: 0 2px;
    opacity: 0;
    transition: opacity 0.2s, color 0.2s;

    &--active {
      color: #f5a623;
      opacity: 1 !important;
    }
  }

  &:hover &__fav {
    opacity: 1;
  }
}
</style>
