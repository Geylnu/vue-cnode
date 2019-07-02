<template>
  <div :class="['wrapper',{active:show}]" @click="scrollToTop()">
    <svg
      t="1562073303567"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2387"
      width="200"
      height="200"
    >
      <path
        d="M511.3 349.1l395.44 392.72a32 32 0 0 0 45.1-45.41L533.7 281.14a32 32 0 0 0-45.25 0.16L76 696.57a32 32 0 1 0 45.41 45.1z"
        p-id="2388"
      />
    </svg>
  </div>
</template>

<script>
import TWEEN from "@tweenjs/tween.js";

export default {
  name: "cReturnTop",
  data() {
    return {
      show: false,
      time: 500 //ms
    };
  },
  methods: {
    handScroll() {
      let scrollTop = window.scrollY;
      this.show = scrollTop > 300;
    },
    scrollToTop() {
      function animate(time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
      }
      requestAnimationFrame(animate);

      const coords = { x: window.scrollX, y: window.scrollY };
      const tween = new TWEEN.Tween(coords)
        .to({ x: 0, y: 0 }, this.time)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
          window.scrollTo(coords.x, coords.y);
        })
        .start();
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handScroll, true);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handScroll, true);
  }
};
</script>

<style>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 100px;
  bottom: 10%;
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s;
  width: 50px;
  height: 50px;
  background-color: rgb(61, 61, 61);
  border-radius: 50%;
  transform: scale(0.75);
}

.wrapper svg {
  fill: #80bd01;
  width: 30px;
  height: 30px;
}

.wrapper.active {
  visibility: visible;
  opacity: 1;
}
@media (max-width: 961px){
    .wrapper{
        right: 10px;
    }
}
</style>
