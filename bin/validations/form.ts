
export const patterns = {
  email: /^[\w-\.+]+@([\w-]+\.)+[\w-]{2,4}$/g
}

export const validate = {
  email: (email: string): Boolean => {
    return patterns.email.test(email);
  },
}
