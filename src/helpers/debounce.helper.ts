let timeout: any;

export function debounce(func: any, delay: number) {
  return function () {
    // @ts-ignore
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}
