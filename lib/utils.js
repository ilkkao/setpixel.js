function trunc(value) {
  return value << 0;
}

function abs(value) {
  if (value > 0) {
    return value;
  }

  return value * -1;
}

export { trunc, abs };
