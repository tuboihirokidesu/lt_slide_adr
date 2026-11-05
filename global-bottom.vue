<!-- 図の SVG の線をわずかに揺らすフィルター。styles/index.css の .slidev-layout svg[aria-hidden] から参照する -->
<template>
  <svg class="sketch-defs" width="0" height="0" aria-hidden="true" focusable="false">
    <filter id="sk-wobble" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="7" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.4" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </svg>
</template>

<style scoped>
.sketch-defs {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}
</style>
