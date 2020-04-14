<template>
  <Page>
    <template #guitar>
      <Guitar
        :guitar-strings="guitarStrings"
        :scale-for-each-guitar-string="scaleForEachGuitarString"
        :max-fret-number="maxFretNumber"
      />
    </template>

    <template #settings>
      <Settings
        :guitar-strings="guitarStrings"
        :scale-types="scaleTypes"
        :tones="tones"
        @update-root-tone="updateRootTone"
        @update-scale-type-id="updateScaleTypeId"
        @update-guitar-strings="updateGuitarStrings"
      />
    </template>
  </Page>
</template>

<script>
import Guitar from '../organisms/Guitar.vue';
import Page from '../templates/Page.vue';
import Settings from '../organisms/Settings.vue';

export default {
  components: {
    Guitar,
    Page,
    Settings,
  },

  data: () => ({
    // static
    scaleTypes: [
      {
        id: '1',
        name: 'Major',
        scale: [0, 2, 4, 5, 7, 9, 11],
      },
      {
        id: '2',
        name: 'Major pentatonic',
        scale: [0, 2, 4, 7, 9],
      },
      {
        id: '3',
        name: 'Natural minor',
        scale: [0, 2, 3, 5, 7, 8, 10],
      },
      {
        id: '4',
        name: 'Minor pentatonic',
        scale: [0, 3, 5, 7, 10],
      },
    ],
    tones: ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B'],
    maxFretNumber: 24,

    // dynamic
    guitarStrings: [
      { id: '1', suffix: 'st', tone: 'E' },
      { id: '2', suffix: 'nd', tone: 'B' },
      { id: '3', suffix: 'rd', tone: 'G' },
      { id: '4', suffix: 'th', tone: 'D' },
      { id: '5', suffix: 'th', tone: 'A' },
      { id: '6', suffix: 'th', tone: 'E' },
    ],
    rootTone: 'none',
    scaleTypeId: '',
  }),

  computed: {
    scaleType: ({ scaleTypes, scaleTypeId }) => scaleTypes.find(({ id }) => id === scaleTypeId),
    canApplyScale: ({ rootTone, scaleType }) => rootTone !== 'none' && !!scaleType,
    scaleTones: ({ canApplyScale, scaleType, tones, rootTone }) => {
      if (!canApplyScale) return [];
      const startTonesIndex = tones.findIndex(tone => tone === rootTone);
      const prefixTones = tones.slice(startTonesIndex);
      const suffixTones = tones.slice(0, startTonesIndex);
      return [...prefixTones, ...suffixTones].map((tone, index) =>
        scaleType.scale.some(s => s === index) ? tone : '',
      );
    },
    scaleForEachGuitarString: ({ maxFretNumber, tones, guitarStrings, scaleTones }) => {
      return guitarStrings.map(({ tone: guitarStringTone }) => {
        const startTonesIndex = tones.findIndex(tone => tone === guitarStringTone);
        const prefixTones = tones.slice(startTonesIndex);
        const suffixTones = tones.slice(0, startTonesIndex);
        const concatTones = [...prefixTones, ...suffixTones];
        const stringTones = [...concatTones, ...concatTones, ...concatTones].slice(1, maxFretNumber + 1);
        return scaleTones.length > 0
          ? stringTones.map(tone => (scaleTones.some(scaleTone => scaleTone === tone) ? tone : ''))
          : stringTones;
      });
    },
  },

  methods: {
    updateRootTone({ target }) {
      this.rootTone = target.value;
    },
    updateScaleTypeId({ target }) {
      this.scaleTypeId = target.value;
    },
    updateGuitarStrings({ id, target }) {
      this.guitarStrings = this.guitarStrings.map(guitarString => ({
        ...guitarString,
        tone: guitarString.id === id ? target.value : guitarString.tone,
      }));
    },
  },
};
</script>
