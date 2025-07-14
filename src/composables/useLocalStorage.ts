import { ref, watch, Ref } from "vue";

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  serializer = JSON,
): [Ref<T>, (value: T) => void] {
  const storedValue = localStorage.getItem(key);

  const initial =
    storedValue !== null ? serializer.parse(storedValue) : defaultValue;

  const state = ref<T>(initial);

  const setValue = (value: T) => {
    state.value = value;
  };

  watch(
    state,
    (newValue) => {
      localStorage.setItem(key, serializer.stringify(newValue));
    },
    { deep: true },
  );

  return [state, setValue];
}
