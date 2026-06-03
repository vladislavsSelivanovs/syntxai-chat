<template>
  <div class="home">
    <div class="home__content">
      <div class="home__icon">⚡</div>
      <h1 class="home__title">Syntx AI Chat</h1>
      <p class="home__subtitle">Выберите чат из списка или создайте новый</p>
      <div class="home__hints">
        <div class="home__hint">
          <span>💬</span> Выберите чат слева
        </div>
        <div class="home__hint">
          <span>➕</span> Создайте новый чат
        </div>
        <div class="home__hint">
          <span>★</span> Добавляйте в избранное
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.home {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);

  &__content {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    @media (max-width: 767px) {
      width: calc(100vw - 30px);
    }
  }

  &__icon {
    font-size: 56px;
    filter: drop-shadow(0 0 24px rgba(124, 106, 255, 0.5));
  }

  &__title {
    font-size: 34px;
    font-weight: 700;
    color: var(--color-text);
    letter-spacing: -0.5px;
  }

  &__subtitle {
    font-size: 18px;
    font-weight: 500;
    color: var(--color-text-muted);
  }

  &__hints {
    display: flex;
    gap: 30px;
    margin-top: 10px;
    
    @media (max-width: 767px) {
      flex-direction: column;
      gap: 12px;
    }
  }

  &__hint {
    font-size: 15px;
    color: var(--color-text-muted);
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
  }
}
</style>
