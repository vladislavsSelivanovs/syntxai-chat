<template>
  <div class="chat-list">
    <n-scrollbar style="flex: 1">
      <div class="chat-list__inner">
        <ChatListItem
          v-for="chat in store.favoriteChats"
          :key="chat.id"
          :chat="chat"
        />
        <div v-if="!store.favoriteChats.length" class="chat-list__empty">
          Нет избранных чатов.<br />
          <small>Нажмите ★ в чате чтобы добавить.</small>
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
