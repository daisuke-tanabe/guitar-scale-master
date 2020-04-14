<template>
  <div :class="$style.wrapper">
    <div :class="$style.container">
      <slot name="guitar" />
      <slot name="settings" />
    </div>
  </div>
</template>

<style lang="scss" module>
.wrapper {
  padding: 60px 20px;
}

.container {
  margin: 0 auto;
  width: 1080px;
}
</style>
