/*
 * Written by Erik Genaro Rodriguez Lazcano <erik.genaro@gmail.com>, August 2019
 * Given a list of .environment files and a blacklist
 * compare if in that given list exists a file named equal as the blacklist,
 * if so remove it
 */

/* eslint no-param-reassign: ["error", { "props": false }] */
const blackListRemover = (list, blackList = []) => {
  Object.keys(list).forEach(key => {
    if (blackList.indexOf(key) >= 0) {
      delete list[key]
    } else {
      list[key] = JSON.stringify(list[key])
    }
  })
}

module.exports = blackListRemover
