import { computed, ref } from 'vue'
import { useChatStore } from '../stores/chatStore'

export function useMessages(chatId) {
  const store = useChatStore()

  const inputText = ref('')
  const inputError = ref('')
  const isSending = ref(false)
  const messagesEl = ref(null)

  const messages = computed(() => {
    const chat = store.chats.find(c => c.id === chatId.value)
    return chat?.messages ?? []
  })

  const isTyping = computed(() => {
    const chat = store.chats.find(c => c.id === chatId.value)
    return chat?.typing ?? false
  })

  function validate() {
    if (!inputText.value.trim()) {
      inputError.value = 'Нельзя отправить пустое сообщение'
      return false
    }
    inputError.value = ''
    return true
  }

  async function sendMessage() {
    if (!validate() || isSending.value) return

    const text = inputText.value.trim()
    inputText.value = ''
    isSending.value = true

    try {
      await store.sendMessage(chatId.value, text)
    } finally {
      isSending.value = false
    }
  }

  function scrollToBottom() {
    if (messagesEl.value) {
      messagesEl.value.scrollTop = messagesEl.value.scrollHeight
    }
  }

  return {
    inputText,
    inputError,
    isSending,
    messagesEl,
    messages,
    isTyping,
    validate,
    sendMessage,
    scrollToBottom,
  }
}
