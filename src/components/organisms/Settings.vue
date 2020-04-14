<template>
  <div :class="$style.preference">
    <div :class="$style.item">
      <div :class="$style.item__head">Tuning</div>
      <div :class="$style.item__content">
        <div v-for="guitarString in guitarStrings" :key="guitarString.id" :class="$style.list">
          <div :class="$style.list__name">{{ `${guitarString.id}${guitarString.suffix}` }}</div>
          <div :class="$style.list__selectOuter">
            <select :class="$style.list__select" @change="onChangeStringTone(guitarString.id, $event)">
              <option v-for="tone in tones" :key="tone" :value="tone" :selected="tone === guitarString.tone">{{
                tone
              }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div :class="$style.item">
      <div :class="$style.item__head">Scale</div>
      <div :class="$style.item__content">
        <div :class="$style.list">
          <div :class="[$style.list__name, $style['list__name--large']]">Root note</div>
          <div :class="[$style.list__selectOuter, $style['list__selectOuter--medium']]">
            <select :class="$style.list__select" @change="onChangeRootNote($event)">
              <option value="none">none</option>
              <option v-for="tone in tones" :key="tone" :value="tone">{{ tone }}</option>
            </select>
          </div>
        </div>
        <div :class="$style.list">
          <div :class="[$style.list__name, $style['list__name--large']]">Scale type</div>
          <div :class="[$style.list__selectOuter, $style['list__selectOuter--large']]">
            <select :class="$style.list__select" @change="onChangeScaleType($event)">
              <option value="none">none</option>
              <option v-for="type in scaleTypes" :key="type.id" :value="type.id">{{ type.name }}</option>
            </select>
          </div>
        </div>
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
    scaleTypes: {
      type: Array,
      required: true,
    },
    tones: {
      type: Array,
      required: true,
    },
  },

  methods: {
    onChangeStringTone(id, { target }) {
      this.$emit('update-guitar-strings', { id, target });
    },
    onChangeRootNote({ target }) {
      this.$emit('update-root-tone', { target });
    },
    onChangeScaleType({ target }) {
      this.$emit('update-scale-type-id', { target });
    },
  },
};
</script>

<style lang="scss" module>
.preference {
  display: grid;
  grid-template-columns: 200px 1fr;
  margin-top: 30px;
}

.item {
  &:not(:first-child) {
    margin-left: 40px;
  }
}

.item__head {
  color: #333;
  font-size: 16px;
  font-weight: bold;
}

.item__content {
  margin-top: 20px;
}

.list {
  align-items: center;
  color: #333;
  display: flex;
  font-size: 13px;

  &:not(:first-child) {
    margin-top: 12px;
  }
}

.list__name {
  width: 48px;

  &--large {
    width: 90px;
  }
}

.list__selectOuter {
  border: 1px solid #ccc;
  border-radius: 3px;
  position: relative;
  width: 56px;

  &--medium {
    width: 74px;
  }

  &--large {
    width: 152px;
  }

  &::before {
    color: #333;
    font-size: 10px;
    position: absolute;
    top: 50%;
    right: 4px;
    content: '▼';
    display: block;
    height: 10px;
    margin-top: -6px;
    transform: scale(0.8);
    width: 10px;
  }
}

.list__select {
  padding: 6px 10px;
  width: 100%;
}
</style>
