const isEmpty = (value: string) => !value || !value.trim().length;

const isEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export {
  isEmpty,
  isEmail
}