<template>
  <div v-if="chat" class="chat-view">
    <div v-if="!hideHeader" class="chat-view__header">
      <div class="chat-view__header-info">
        <span class="chat-view__avatar">{{ chat.avatar }}</span>
        <div>
          <div class="chat-view__name">{{ chat.name }}</div>
          <div class="chat-view__status">
            <template v-if="isTyping">
              <span class="chat-view__status--typing">печатает...</span>
            </template>
            <template v-else>
              <span class="chat-view__status-dot" />
              онлайн
            </template>
          </div>
        </div>
      </div>
      <n-button
        quaternary
        circle
        size="small"
        :type="chat.favorite ? 'warning' : 'default'"
        @click="store.toggleFavorite(chat.id)"
        :title="chat.favorite ? 'Убрать из избранного' : 'В избранное'"
      >
        ★
      </n-button>
    </div>

    <div ref="messagesEl" class="chat-view__messages">
      <MessageItem
        v-for="msg in messages"
        :key="msg.id"
        :message="msg"
        :chat-avatar="chat.avatar"
      />
      <TypingIndicator v-if="isTyping" />
    </div>

    <MessageInput
      v-model="inputText"
      :error="inputError"
      :disabled="isSending"
      @send="sendMessage"
    />
  </div>

  <div v-else class="chat-view chat-view--not-found">
    <p>Чат не найден</p>
    <router-link to="/">На главную</router-link>
  </div>
</template>

<script setup>
import { computed, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useChatStore } from '../stores/chatStore'
import { useMessages } from '../composables/useMessages'
import MessageItem from '../components/Chat/MessageItem.vue'
import MessageInput from '../components/Chat/MessageInput.vue'
import TypingIndicator from '../components/Chat/TypingIndicator.vue'

defineProps({
  hideHeader: { type: Boolean, default: false },
})

const route = useRoute()
const store = useChatStore()

const chatId = computed(() => Number(route.params.id))
const chat = computed(() => store.chats.find(c => c.id === chatId.value) ?? null)

const {
  inputText,
  inputError,
  isSending,
  messagesEl,
  messages,
  isTyping,
  sendMessage,
  scrollToBottom,
} = useMessages(chatId)

watch(
  [messages, isTyping],
  () => nextTick(scrollToBottom),
  { deep: true }
)

watch(chatId, () => nextTick(scrollToBottom))
</script>

<style lang="scss">
.chat-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--color-bg);

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px;
    border-bottom: 1px solid var(--color-border);
    background: var(--color-surface);
    flex-shrink: 0;
    min-height: 74px;
  }

  &__header-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__avatar {
    font-size: 28px;
  }

  &__name {
    font-size: 15px;
    font-weight: 600;
    color: var(--color-text);
  }

  &__status {
    font-size: 12px;
    color: var(--color-text-muted);
    display: flex;
    align-items: center;
    gap: 5px;

    &--typing {
      color: var(--color-primary);
      font-style: italic;
    }
  }

  &__status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #4ade80;
    flex-shrink: 0;
  }

  &__messages {
    flex: 1;
    overflow-y: auto;
    padding: 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: var(--color-border);
      border-radius: 2px;
    }
  }

  &--not-found {
    align-items: center;
    justify-content: center;
    gap: 12px;
    color: var(--color-text-muted);

    a {
      color: var(--color-primary);
    }
  }
}
</style>
