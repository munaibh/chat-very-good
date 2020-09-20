module.exports = (env) => {
  const target = env.target
  const argv = process.argv.splice(2)
  return require(`./webpack.${target}.js`)(env, argv)
}