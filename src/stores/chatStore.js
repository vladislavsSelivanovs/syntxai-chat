import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const BOT_REPLIES = [
  'Понял! Обрабатываю ваш запрос...',
  'Интересный вопрос! Дайте подумаю.',
  'Отличная идея! Давайте разберём подробнее.',
  'Хм, это нетривиально. Но я разберусь.',
  'Отвечаю на ваш запрос прямо сейчас!',
  'Получил ваше сообщение. Обрабатываю...',
  'Спасибо за сообщение! Уже думаю над ответом.',
]

let nextChatId = 6
let nextMsgId = 100

function makeId() {
  return nextMsgId++
}

function randomBotReply() {
  return BOT_REPLIES[Math.floor(Math.random() * BOT_REPLIES.length)]
}

function randomDelay() {
  return 1000 + Math.random() * 1000
}

export const useChatStore = defineStore('chat', () => {
  const chats = ref([
    {
      id: 1,
      name: 'Aria AI',
      avatar: '🤖',
      pinned: true,
      favorite: true,
      typing: false,
      messages: [
        { id: 1, text: 'Привет! Я Aria - ваш AI-ассистент. Чем могу помочь?', sender: 'bot', ts: Date.now() - 60000 },
        { id: 2, text: 'Расскажи про Syntx AI', sender: 'user', ts: Date.now() - 50000 },
        { id: 3, text: 'Syntx AI - платформа объединяющая 90+ AI-инструментов в одном месте!', sender: 'bot', ts: Date.now() - 45000 },
      ],
    },
    {
      id: 2,
      name: 'Nova Support',
      avatar: '💬',
      pinned: false,
      favorite: true,
      typing: false,
      messages: [
        { id: 4, text: 'Здравствуйте! Служба поддержки Nova. Как вам помочь?', sender: 'bot', ts: Date.now() - 120000 },
        { id: 5, text: 'Хочу узнать о тарифах', sender: 'user', ts: Date.now() - 100000 },
        { id: 6, text: 'Конечно! Пришлю информацию о тарифах.', sender: 'bot', ts: Date.now() - 90000 },
      ],
    },
    {
      id: 3,
      name: 'Syntx Bot',
      avatar: '⚡',
      pinned: false,
      favorite: false,
      typing: false,
      messages: [
        { id: 7, text: 'Добро пожаловать! Я Syntx Bot.', sender: 'bot', ts: Date.now() - 3600000 },
      ],
    },
    {
      id: 4,
      name: 'Design Team',
      avatar: '🎨',
      pinned: false,
      favorite: false,
      typing: false,
      messages: [
        { id: 8, text: 'Мокапы готовы! Проверьте пожалуйста.', sender: 'bot', ts: Date.now() - 7200000 },
        { id: 9, text: 'Отлично, смотрю!', sender: 'user', ts: Date.now() - 7000000 },
      ],
    },
    {
      id: 5,
      name: 'Dev Chat',
      avatar: '👨‍💻',
      pinned: false,
      favorite: false,
      typing: false,
      messages: [
        { id: 10, text: 'Деплой прошёл успешно ✅', sender: 'bot', ts: Date.now() - 86400000 },
      ],
    },
  ])

  const activeChatId = ref(null)

  const activeChat = computed(() =>
    chats.value.find(c => c.id === activeChatId.value) ?? null
  )

  const allChats = computed(() => [...chats.value].sort((a, b) => b.pinned - a.pinned))

  const favoriteChats = computed(() =>
    allChats.value.filter(c => c.favorite)
  )

  function setActiveChat(id) {
    activeChatId.value = Number(id)
  }

  async function sendMessage(chatId, text) {
    const chat = chats.value.find(c => c.id === chatId)
    if (!chat) return

    // Pseudo-async: simulate sending to server
    await new Promise(res => setTimeout(res, 300))

    chat.messages.push({
      id: makeId(),
      text,
      sender: 'user',
      ts: Date.now(),
    })

    chat.typing = true

    await new Promise(res => setTimeout(res, randomDelay()))

    chat.typing = false
    chat.messages.push({
      id: makeId(),
      text: randomBotReply(),
      sender: 'bot',
      ts: Date.now(),
    })
  }

  function createChat(name) {
    if (!name.trim()) return null
    const id = nextChatId++
    chats.value.push({
      id,
      name: name.trim(),
      avatar: '💬',
      pinned: false,
      favorite: false,
      typing: false,
      messages: [
        {
          id: makeId(),
          text: `Чат "${name.trim()}" создан. Начните общение!`,
          sender: 'bot',
          ts: Date.now(),
        },
      ],
    })
    return id
  }

  function toggleFavorite(chatId) {
    const chat = chats.value.find(c => c.id === chatId)
    if (chat) chat.favorite = !chat.favorite
  }

  return {
    chats,
    activeChatId,
    activeChat,
    allChats,
    favoriteChats,
    setActiveChat,
    sendMessage,
    createChat,
    toggleFavorite,
  }
})
