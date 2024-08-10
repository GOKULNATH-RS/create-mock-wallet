import { Keypair } from '@solana/web3.js'
import { generateMnemonic } from 'bip39'

export function generateSolanaKeypair(): Keypair {
  const keypair = Keypair.generate()
  const publicKey = keypair.publicKey.toString()
  const secretKey = keypair.secretKey
  console.log('Public Key:', publicKey)
  console.log('Secret Key:', Buffer.from(secretKey).toString('hex'))

  return keypair
}

export function createMnemonic(): string {
  const mnemonic = generateMnemonic()
  return mnemonic
}
