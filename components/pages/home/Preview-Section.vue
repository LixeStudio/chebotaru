<template>
  <section class="preview">
    <div class="preview__container">
      <h1 class="preview__title">
        <span class="visually-hidden">{{
          t("pages.home.previewSection.titleSpan")
        }}</span>
        <NuxtImg
          src="/images/pages/home/logo.svg"
          :alt="t('pages.home.previewSection.titleImgAlt')"
          width="969"
          height="201"
          fetchpriority="high"
          preload
        />
      </h1>
    </div>
    <!--
      Playback starts from script after hydration (not the autoplay attribute) so the video does not
      compete with the first render, and is skipped for prefers-reduced-motion and Save-Data.
      Phones get a 720p copy of the same clip; the poster is its first frame.
      AV1 sources ship first (smaller); H.264 follows as a fallback for Safari / older browsers.
      The codecs=… in type lets the browser skip AV1 without downloading it.
    -->
    <video
      ref="videoRef"
      preload="none"
      muted
      loop
      playsinline
      disablepictureinpicture
      poster="/videos/preview-poster.webp"
      aria-hidden="true"
      class="preview__video"
    >
      <source
        media="(max-width: 767px)"
        src="/videos/preview-video-720-av1.mp4"
        type='video/mp4; codecs="av01.0.05M.10"'
      />
      <source
        media="(max-width: 767px)"
        src="/videos/preview-video-720.mp4"
        type="video/mp4"
      />
      <source
        src="/videos/preview-video-av1.mp4"
        type='video/mp4; codecs="av01.0.08M.10"'
      />
      <source src="/videos/preview-video.mp4" type="video/mp4" />
      {{ t("pages.home.previewSection.noVideoText") }}
    </video>
  </section>
</template>

<script setup>
const { t } = useI18n();
const videoRef = ref(null);

const startVideo = () => {
  const video = videoRef.value;
  if (!video) return;
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const saveData = navigator.connection?.saveData === true;
  if (reducedMotion || saveData) {
    // the clip starts on black frames: show a still from it instead of a black hero
    video.poster = "/videos/preview-still.webp";
    return;
  }
  video.muted = true;
  video.play().catch(() => {
    video.poster = "/videos/preview-still.webp";
  });
};

onMounted(startVideo);
</script>
