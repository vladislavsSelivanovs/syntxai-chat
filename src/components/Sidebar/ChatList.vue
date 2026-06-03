<template>
  <div class="chat-list">
    <n-scrollbar style="flex: 1">
      <div class="chat-list__inner">
        <ChatListItem
          v-for="chat in store.allChats"
          :key="chat.id"
          :chat="chat"
        />
        <div v-if="!store.allChats.length" class="chat-list__empty">
          Нет чатов
        </div>
      </div>
    </n-scrollbar>
  </div>
</template>

<script setup>
import { useChatStore } from '../../stores/chatStore'
import ChatListItem from './ChatListItem.vue'

const store = useChatStore()
</script>

<style lang="scss">
.chat-list {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;

  &__inner {
    padding: 8px 8px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__empty {
    text-align: center;
    color: var(--color-text-muted);
    font-size: 13px;
    padding: 24px 16px;
  }
}
</style>
