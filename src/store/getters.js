const getters = {
  host: state => state.user.host,
  user: state => state.user,
  rhost: state => state.register.r_host,
  reamil:state => state.register.r_email
}
export default getters
