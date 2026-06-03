<template>
  <div class="typing">
    <div class="typing__avatar">🤖</div>
    <div class="typing__bubble">
      <span class="typing__dot" />
      <span class="typing__dot" />
      <span class="typing__dot" />
    </div>
  </div>
</template>

<style lang="scss">
.typing {
  display: flex;
  align-items: flex-end;
  gap: 8px;

  &__avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: var(--color-surface-2);
    border: 1px solid var(--color-border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }

  &__bubble {
    background: var(--color-bot-msg);
    border: 1px solid var(--color-border);
    border-radius: 18px 18px 18px 4px;
    padding: 12px 16px;
    display: flex;
    gap: 4px;
    align-items: center;
  }

  &__dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--color-text-muted);
    animation: blink 1.2s infinite;

    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }
}

@keyframes blink {
  0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
  40%            { opacity: 1;   transform: scale(1.1); }
}
</style>
