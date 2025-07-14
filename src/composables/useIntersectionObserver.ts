import { ref, onMounted, onUnmounted } from "vue";

interface IntersectionOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
}

export function useIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionOptions = {},
) {
  const target = ref<Element | null>(null);
  const isIntersecting = ref<boolean>(false);

  let observer: IntersectionObserver | null = null;

  const defaultOptions: IntersectionOptions = {
    threshold: 0.1,
    rootMargin: "0px",
    root: null,
    ...options,
  };

  const observe = (element: Element) => {
    if (observer) {
      observer.observe(element);
    }
  };

  const unobserve = (element: Element) => {
    if (observer) {
      observer.unobserve(element);
    }
  };

  onMounted(() => {
    observer = new IntersectionObserver((entries) => {
      isIntersecting.value = entries.some((entry) => entry.isIntersecting);
      callback(entries);
    }, defaultOptions);

    if (target.value) {
      observe(target.value);
    }
  });

  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
    }
  });

  return {
    target,
    isIntersecting,
    observe,
    unobserve,
  };
}
