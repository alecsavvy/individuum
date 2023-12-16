import { hedgehog } from './hedgehog'

const main = async () => {
  // wallet is an `ethereumjs-wallet` object that can be used to sign transactions
  let wallet = null

  try {
    if (hedgehog.isLoggedIn()) {
      wallet = hedgehog.getWallet()
    } else {
      wallet = await hedgehog.signUp('username', 'password')
    }
  } catch (e) {
    console.error(e)
  }

  console.log({ wallet })
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
