<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="app">
        <transition name="overlay">
          <div
            v-if="isMobile && sidebarOpen"
            class="app__overlay"
            @click="sidebarOpen = false"
          />
        </transition>

        <Sidebar :open="sidebarOpen" @close="sidebarOpen = false" />

        <main class="app__main">
          <header v-if="isMobile" class="app__mobile-header">
            <button class="app__burger" @click="sidebarOpen = !sidebarOpen">
              <span class="app__burger-line" :class="{ 'app__burger-line--open': sidebarOpen }" />
              <span class="app__burger-line" :class="{ 'app__burger-line--open': sidebarOpen }" />
              <span class="app__burger-line" :class="{ 'app__burger-line--open': sidebarOpen }" />
            </button>
            <span class="app__mobile-title">
              {{ activeChat ? activeChat.name : 'Syntx AI' }}
            </span>
            <button
              v-if="activeChat"
              class="app__fav-btn"
              :class="{ 'app__fav-btn--active': activeChat.favorite }"
              @click="store.toggleFavorite(activeChat.id)"
              title="Избранное"
            >★</button>
            <div v-else class="app__mobile-header-spacer" />
          </header>

          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" :hide-header="isMobile" />
            </transition>
          </router-view>
        </main>
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { darkTheme } from 'naive-ui'
import { useChatStore } from './stores/chatStore'
import Sidebar from './components/Sidebar/Sidebar.vue'

const sidebarOpen = ref(false)
const isMobile = ref(false)
const store = useChatStore()

const route = useRoute()

const activeChat = computed(() => {
  const id = Number(route.params.id)
  return id ? store.chats.find(c => c.id === id) : null
})

function checkMobile() {
  isMobile.value = window.innerWidth < 768
  if (!isMobile.value) sidebarOpen.value = false
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

watch(route, () => {
  if (isMobile.value) sidebarOpen.value = false
})

const themeOverrides = {
  common: {
    primaryColor: '#7c6aff',
    primaryColorHover: '#6b59ee',
    primaryColorPressed: '#5a48dd',
    bodyColor: '#0f0f13',
    cardColor: '#1a1a24',
    modalColor: '#1a1a24',
    popoverColor: '#22222f',
    borderColor: '#2e2e40',
  },
  Input: {
    color: '#22222f',
    colorFocus: '#22222f',
    border: '1px solid #2e2e40',
    borderFocus: '1px solid #7c6aff',
    borderHover: '1px solid #5a4aee',
    textColor: '#e8e8f0',
    placeholderColor: '#6b6b85',
  },
  Button: {
    colorPrimary: '#7c6aff',
    colorHoverPrimary: '#6b59ee',
    colorPressedPrimary: '#5a48dd',
    textColorPrimary: '#ffffff',
    borderPrimary: 'none',
    borderHoverPrimary: 'none',
  },
}
</script>

<style lang="scss">
.app {
  display: flex;
  height: 100vh;
  background-color: var(--color-bg);
  overflow: hidden;
  position: relative;

  &__main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  &__overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 99;
    backdrop-filter: blur(2px);
  }

  // Мобильная шапка
  &__mobile-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 16px;
    height: 56px;
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    flex-shrink: 0;
    z-index: 10;
  }

  &__mobile-title {
    font-size: 15px;
    font-weight: 600;
    color: var(--color-text);
    flex: 1;
    text-align: center;
  }

  &__mobile-header-spacer {
    width: 36px;
  }

  &__fav-btn {
    width: 36px;
    height: 36px;
    background: var(--color-surface-2);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    cursor: pointer;
    font-size: 18px;
    color: var(--color-text-muted);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: color 0.2s, background 0.2s;

    &--active {
      color: #f5a623;
      background: rgba(245, 166, 35, 0.1);
      border-color: rgba(245, 166, 35, 0.3);
    }
  }

  &__burger {
    width: 36px;
    height: 36px;
    background: var(--color-surface-2);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 0;
    flex-shrink: 0;
  }

  &__burger-line {
    width: 18px;
    height: 2px;
    background: var(--color-text);
    border-radius: 2px;
    transition: transform 0.25s ease, opacity 0.25s ease;

    &--open {
      &:nth-child(1) { transform: translateY(7px) rotate(45deg); }
      &:nth-child(2) { opacity: 0; transform: scaleX(0); }
      &:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
    }
  }
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.25s ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
