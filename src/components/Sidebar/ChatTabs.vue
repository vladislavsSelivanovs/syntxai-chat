<template>
  <div class="chat-tabs">
    <div class="chat-tabs__nav">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="chat-tabs__btn"
        :class="{ 'chat-tabs__btn--active': activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <provide-context :tab="activeTab">
      <component :is="activeComponent" />
    </provide-context>
  </div>
</template>

<script setup>
import { ref, computed, defineComponent, provide } from 'vue'
import ChatList from './ChatList.vue'
import ChatListFavorites from './ChatListFavorites.vue'

const tabs = [
  { key: 'all', label: 'Все чаты' },
  { key: 'favorites', label: 'Избранные' },
]

const activeTab = ref('all')

const ProvideContext = defineComponent({
  props: ['tab'],
  setup(props, { slots }) {
    provide('activeTab', computed(() => props.tab))
    return () => slots.default?.()
  },
})

const activeComponent = computed(() =>
  activeTab.value === 'all' ? ChatList : ChatListFavorites
)
</script>

<style lang="scss">
.chat-tabs {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;

  &__nav {
    display: flex;
    padding: 8px 12px 0;
    gap: 4px;
    border-bottom: 1px solid var(--color-border);
  }

  &__btn {
    flex: 1;
    padding: 8px 4px;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    color: var(--color-text-muted);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.2s, border-color 0.2s;
    white-space: nowrap;

    &--active {
      color: var(--color-primary);
      border-bottom-color: var(--color-primary);
    }

    &:hover:not(&--active) {
      color: var(--color-text);
    }
  }
}
</style>
