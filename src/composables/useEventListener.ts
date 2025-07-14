import { onMounted, onUnmounted } from "vue";

export function useEventListener(
  target: EventTarget | string,
  event: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions,
) {
  onMounted(() => {
    const element =
      typeof target === "string"
        ? document.querySelector(target) || window
        : target;

    element.addEventListener(event, handler, options);
  });

  onUnmounted(() => {
    const element =
      typeof target === "string"
        ? document.querySelector(target) || window
        : target;

    element.removeEventListener(event, handler, options);
  });
}
