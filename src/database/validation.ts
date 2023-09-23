export function minimumLength(min: number, msg = '') {
  return {
    validator: function (value: any) {
      return value.length >= min;
    },
    msg,
  };
}
