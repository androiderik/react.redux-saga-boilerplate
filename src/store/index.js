/* Exports the pertinent environment config store */

if (process.env.NODE_ENV === 'production') {
  /* eslint-disable-next-line */
  module.exports = require('./prod-configStore')
} else {
  /* eslint-disable-next-line */
  module.exports = require('./dev-configStore')
}
