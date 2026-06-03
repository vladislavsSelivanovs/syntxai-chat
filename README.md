# Syntx AI Chat

Тестовое задание - SPA-чат на Vue 3.

## Стек

- **Vue 3** + Composition API
- **Vue Router 4** - навигация `/chat/:id`
- **Pinia** - state management
- **Naive UI** - UI-компоненты
- **SCSS + BEM** - стилизация
- **Vite** - сборка
- **ESLint + Prettier** - линтинг и форматирование

## Реализовано

### Основное
- Сайдбар со списком 5 чатов, активный чат выделяется
- Маршрутизация `/chat/:id` через Vue Router
- Отправка сообщений, хранение в Pinia
- Псевдо-асинхронность через `setTimeout` (симуляция запросов к серверу)
- Валидация - нельзя отправить пустое сообщение

### Бонусы
- **Создание новых чатов** - кнопка `+` в сайдбаре
- **Бот-ответы** - автоматический ответ через 1-2 секунды с индикатором "печатает..."
- **Composable `useMessages`** - вся логика сообщений вынесена в composable
- **Табы "Все / Избранные"** - `provide/inject` + dynamic components
- **Избранное** - звёздочка в сайдбаре и в заголовке чата
- **CI/CD** - GitHub Actions: lint → build → deploy на Vercel
- **Code splitting** - vendor chunks для оптимизации бандла

## Запуск

```bash
npm install
npm run dev      # dev-сервер на localhost:5173
npm run build    # production сборка
npm run lint     # ESLint проверка
npm run format   # Prettier форматирование
```

## Структура

```
src/
├── assets/scss/        # глобальные стили, CSS-переменные
├── components/
│   ├── Chat/           # MessageItem, MessageInput, TypingIndicator
│   └── Sidebar/        # Sidebar, ChatTabs, ChatList, ChatListItem
├── composables/
│   └── useMessages.js  # логика сообщений (composable)
├── router/             # Vue Router конфигурация
├── stores/
│   └── chatStore.js    # Pinia store
└── views/
    ├── HomeView.vue    # стартовый экран
    └── ChatView.vue    # экран чата
```

## CI/CD

`.github/workflows/ci.yml`:
1. **lint-and-build** - ESLint + Vite build на каждый push/PR
2. **deploy** - автодеплой на Vercel при merge в `main`

Для деплоя нужно добавить секреты в GitHub: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.
