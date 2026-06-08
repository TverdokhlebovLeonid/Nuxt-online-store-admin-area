<script setup lang="ts">
const slides = [
  {
    image: '/images/slide/mft7272m.webp',
    title: 'Сигнум MFT/MFD 7272М',
    text: 'Селективный профессиональный металлодетектор с технологией пространственно-гармонической фильтрации (SFT).',
  },
  {
    image: '/images/slide/B5-400.webp',
    title: 'Беркут-5',
    text: 'Логическое развитие популярнейших приборов серии «Кондор» — вобрал в себя все лучшие качества линейки.',
  },
]

const activeIndex = ref(0)
let autoplayTimer: ReturnType<typeof setInterval> | undefined

function goToSlide(index: number) {
  activeIndex.value = (index + slides.length) % slides.length
}

onMounted(() => {
  autoplayTimer = setInterval(() => goToSlide(activeIndex.value + 1), 7000)
})

onUnmounted(() => {
  if (autoplayTimer) clearInterval(autoplayTimer)
})
</script>

<template>
  <section
    class="relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-700 to-brand-900 text-white"
  >
    <div
      class="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:24px_24px]"
    />
    <UiContainer>
      <div class="relative grid items-center gap-8 py-12 lg:grid-cols-2 lg:py-16">
        <div class="flex flex-col gap-4">
          <span
            class="w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide"
          >
            Производитель АКА
          </span>
          <div class="relative min-h-36 sm:min-h-32">
            <Transition
              enter-active-class="transition duration-700 ease-out"
              enter-from-class="opacity-0 translate-x-4"
              leave-active-class="transition duration-700 ease-in"
              leave-to-class="opacity-0 -translate-x-4"
            >
              <div
                :key="activeIndex"
                class="absolute inset-0 flex flex-col gap-3"
              >
                <h2 class="text-3xl font-bold tracking-tight lg:text-4xl">
                  {{ slides[activeIndex]!.title }}
                </h2>
                <p class="max-w-md text-brand-50/90">{{ slides[activeIndex]!.text }}</p>
              </div>
            </Transition>
          </div>
          <div class="mt-2 flex gap-3">
            <UiButton
              variant="secondary"
              size="lg"
              to="/store"
              label="Перейти в магазин"
            />
          </div>
          <div class="mt-4 flex gap-2">
            <button
              v-for="(_, index) in slides"
              :key="index"
              type="button"
              class="h-1.5 rounded-full transition-all"
              :class="index === activeIndex ? 'w-8 bg-white' : 'w-3 bg-white/40 hover:bg-white/70'"
              :aria-label="`Слайд ${index + 1}`"
              @click="goToSlide(index)"
            />
          </div>
        </div>

        <div class="relative hidden h-72 w-full lg:block lg:h-80">
          <Transition
            enter-active-class="transition duration-700 ease-out"
            enter-from-class="opacity-0 scale-95"
            leave-active-class="transition duration-700 ease-in"
            leave-to-class="opacity-0 scale-95"
          >
            <NuxtImg
              :key="activeIndex"
              :src="slides[activeIndex]!.image"
              :alt="slides[activeIndex]!.title"
              width="480"
              height="320"
              :fetchpriority="activeIndex === 0 ? 'high' : 'auto'"
              :loading="activeIndex === 0 ? 'eager' : 'lazy'"
              class="absolute inset-0 m-auto max-h-full w-auto object-contain drop-shadow-2xl"
            />
          </Transition>
        </div>
      </div>
    </UiContainer>
  </section>
</template>
