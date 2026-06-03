<template>
  <aside class="sidebar" :class="{ 'sidebar--open': open }">
    <div class="sidebar__header">
      <router-link to="/" class="sidebar__logo">
        <span class="sidebar__logo-icon">⚡</span>
        <span class="sidebar__logo-text">Syntx AI</span>
      </router-link>
      <div class="sidebar__header-actions">
        <n-button
          circle
          size="small"
          type="primary"
          @click="showNewChatModal = true"
          title="Новый чат"
        >
          <template #icon>
            <n-icon><AddOutline /></n-icon>
          </template>
        </n-button>
        <button class="sidebar__close" @click="$emit('close')" title="Закрыть">
          <n-icon><CloseOutline /></n-icon>
        </button>
      </div>
    </div>

    <ChatTabs />

    <div class="sidebar__footer">
      <div class="sidebar__user">
        <div class="sidebar__user-avatar">V</div>
        <div class="sidebar__user-info">
          <span class="sidebar__user-name">Vladislavs</span>
          <span class="sidebar__user-role">Developer</span>
        </div>
      </div>
    </div>

    <n-modal v-model:show="showNewChatModal" preset="dialog" title="Новый чат">
      <n-form @submit.prevent="handleCreateChat">
        <n-form-item
          label="Название чата"
          :feedback="newChatError"
          :validation-status="newChatError ? 'error' : undefined"
        >
          <n-input
            v-model:value="newChatName"
            placeholder="Введите название..."
            @keydown.enter.prevent="handleCreateChat"
          />
        </n-form-item>
      </n-form>
      <template #action>
        <n-button @click="showNewChatModal = false">Отмена</n-button>
        <n-button type="primary" @click="handleCreateChat">Создать</n-button>
      </template>
    </n-modal>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AddOutline, CloseOutline } from '@vicons/ionicons5'
import { useChatStore } from '../../stores/chatStore'
import ChatTabs from './ChatTabs.vue'

defineProps({
  open: { type: Boolean, default: false },
})

defineEmits(['close'])

const store = useChatStore()
const router = useRouter()

const showNewChatModal = ref(false)
const newChatName = ref('')
const newChatError = ref('')

function handleCreateChat() {
  if (!newChatName.value.trim()) {
    newChatError.value = 'Введите название чата'
    return
  }
  const id = store.createChat(newChatName.value)
  newChatName.value = ''
  newChatError.value = ''
  showNewChatModal.value = false
  router.push(`/chat/${id}`)
}
</script>

<style lang="scss">
.sidebar {
  width: var(--sidebar-width);
  background-color: var(--color-surface);
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;

  @media (max-width: 767px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 100;
    transform: translateX(-100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.4);

    &--open {
      transform: translateX(0);
    }
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid var(--color-border);
    height: 74px;
  }

  &__header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__close {
    display: none;
    width: 32px;
    height: 32px;
    background: var(--color-surface-2);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    cursor: pointer;
    color: var(--color-text-muted);
    align-items: center;
    justify-content: center;
    font-size: 16px;
    transition: color 0.2s, background 0.2s;

    &:hover {
      color: var(--color-text);
      background: var(--color-border);
    }

    @media (max-width: 767px) {
      display: flex;
    }
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
  }

  &__logo-icon {
    font-size: 20px;
  }

  &__logo-text {
    font-size: 16px;
    font-weight: 700;
    color: var(--color-text);
    letter-spacing: -0.3px;
  }

  &__footer {
    margin-top: auto;
    padding: 12px 16px;
    border-top: 1px solid var(--color-border);
  }

  &__user {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__user-avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: linear-gradient(135deg, #7c6aff, #a855f7);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 700;
    font-size: 13px;
    flex-shrink: 0;
  }

  &__user-info {
    display: flex;
    flex-direction: column;
  }

  &__user-name {
    font-size: 13px;
    font-weight: 600;
    color: var(--color-text);
  }

  &__user-role {
    font-size: 11px;
    color: var(--color-text-muted);
  }
}
</style>
