

export var validatePhoneEmail = (rule, value, callback) => {
  if (/^((13[0-9])|(15[0-9])|(147)|(17[0-9])|(18[0-9]))\d{8}$/.test(value)) {
    console.log('phone')
    this.$store.commit('SET_INPUT_TYPE', 'phone')
    callback()
  } else if (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
    console.log('email')
    this.$store.commit('SET_INPUT_TYPE', 'email')
  } else {
    callback(new Error('请输入正确的'))
  }
}

export var validateVc = (rule, value, callback) => {
  if (/^([a-zA-z0-9])$/.test(value)) {
    callback()
  } else {
    callback(new Error('Place enter the right verification code'))
  }
}

export var validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Place enter your password'))
  } else {
    callback()
  }
}

export var validatePassConfirm = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Place enter your password again'))
  } else if (value !== this.RegisterForm.password) {
    callback(new Error('Input password is inconsistent'))
  } else {
    callback()
  }
}
