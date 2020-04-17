<template>
  <div :class="$style.guitar">
    <div :class="$style.guitar__openStrings">
      <div v-for="guitarString in guitarStrings" :key="guitarString.id" :class="$style.guitar__cell">
        <div :class="$style.guitar__pitch">{{ guitarString.tone }}</div>
      </div>
    </div>
    <div :class="$style.guitar__neckFrame">
      <div :class="$style.guitar__neck">
        <div v-for="(stringScale, index) in scaleForEachGuitarString" :key="index" :class="$style.guitar__strings">
          <div v-for="(tone, index) in stringScale" :key="index" :class="$style.guitar__cell">
            <div v-show="tone !== ''" :class="$style.guitar__pitch">{{ tone }}</div>
          </div>
          <div :class="$style.guitar__cell"></div>
        </div>
      </div>
      <div :class="$style.guitar__fretNumbers">
        <div v-for="(number, index) in fretNumbers" :key="index" :class="$style.guitar__cell">{{ number }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    guitarStrings: {
      type: Array,
      required: true,
    },
    scaleForEachGuitarString: {
      type: Array,
      required: true,
    },
    maxFretNumber: {
      type: Number,
      required: true,
    },
  },

  computed: {
    fretNumbers: ({ maxFretNumber }) =>
      [...Array(maxFretNumber)].map((_, i) => {
        const number = i + 1;
        return (number % 2 === 1 && number !== 1 && number !== 11 && number !== 13) || number === 12 ? number : '';
      }),
  },
};
</script>

<style lang="scss" module>
$number-of-frets: 24;
$dot-font-size: 10px;
$dot-size: 26px;
$fret-width: 50px;

.guitar {
  display: grid;
  grid-template-columns: $fret-width 1fr;
  grid-template-rows: 320px 24px;
}

.guitar__openStrings {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 0;
}

.guitar__neckFrame {
  grid-column: 2 / 3;
  grid-row: 1 / 3;
  overflow: scroll;
  padding: 20px 0;
  width: 1020px;
}

.guitar__neck {
  display: flex;
  flex-direction: column;
  height: 280px;
  justify-content: space-between;
  width: $number-of-frets * $fret-width + 2px;
}

.guitar__strings {
  display: flex;
  height: 100%;
  position: relative;

  &::before {
    background: #333;
    content: '';
    display: block;
    height: 2px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
  }

  &::after {
    background: #333;
    content: '';
    display: block;
    height: 100%;
    position: absolute;
    top: calc(50% - 1px);
    left: 0;
    width: 2px;
  }

  &:last-child::after {
    background: #333;
    content: '';
    display: block;
    height: 100%;
    position: absolute;
    top: calc(-50% + 1px);
    left: 0;
    width: 2px;
  }
}

.guitar__fretNumbers {
  color: #333;
  display: flex;
  font-size: 10px;
  font-weight: bold;
  height: 24px;
  justify-content: space-between;
}

.guitar__cell {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  position: relative;
  width: 100%;

  .guitar__strings &,
  .guitar__fretNumbers & {
    flex: 1 0 auto;
    width: $fret-width;
  }

  .guitar__strings &:last-child {
    flex: 1 0 auto;
    width: 2px;
  }

  .guitar__strings:last-child &::after {
    background: #333;
    content: '';
    display: block;
    height: 100%;
    position: absolute;
    top: calc(-50% + 1px);
    left: 0;
    width: 2px;
  }

  .guitar__strings:not(:last-child) &::before {
    background: #333;
    content: '';
    display: block;
    height: 100%;
    position: absolute;
    top: calc(50% - 1px);
    left: 0;
    width: 2px;
  }
}

.guitar__pitch {
  align-items: center;
  background: #333;
  border: 1px solid #333;
  border-radius: 16px;
  color: #fff;
  display: flex;
  font-size: $dot-font-size;
  font-weight: bold;
  height: $dot-size;
  justify-content: center;
  width: $dot-size;
}
</style>
