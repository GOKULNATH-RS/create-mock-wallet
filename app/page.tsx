'use client'

import { useState } from 'react'

import { createMnemonic, generateSolanaKeypair } from '@/utils'

export default function Home() {
  const [home, setHome] = useState(true)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')
  const [showPrivateKey, setShowPrivateKey] = useState(false)
  const [showPrivateKeyVerify, setShowPrivateKeyVerify] = useState(false)
  const [Wallets, setWallets] = useState<
    | {
        publicKey: string
        secretKey: string
      }[]
  >([])

  const [currWallet, setCurrWallet] = useState<{
    publicKey: string
    secretKey: string
  }>({
    publicKey: '',
    secretKey: ''
  })
  const [inWallet, setInWallet] = useState(false)
  const [passwordCheck, setPasswordCheck] = useState(false)

  const handleCreatePassword = () => {
    if (password === confirmPassword) {
      setPasswordCheck(true)
    } else {
      setPasswordCheck(false)
    }
  }

  const mnemonic = createMnemonic()

  const handleCreateWallet = () => {
    console.log('Creating Wallet')

    const keypair = generateSolanaKeypair()
    const publicKey = keypair.publicKey.toString()
    const secretKey = Buffer.from(keypair.secretKey).toString('hex')

    setWallets((prev) => [...prev, { publicKey, secretKey }])
    if (Wallets.length === 0) {
      setCurrWallet({ publicKey, secretKey })
    }
    alert('Wallet Created')
    setInWallet(true)
  }

  return (
    <div className='h-screen w-full flex justify-center items-center'>
      {home ? (
        <div className='flex flex-col  justify-center items-center'>
          <div>
            <h1 className='text-4xl font-semibold'>
              Welcome to Wallet Creation
            </h1>
          </div>
          <button
            onClick={() => setHome(false)}
            className='bg-neutral-950 border m-6 border-gray-500 p-4 rounded-xl h-10 w-60 flex justify-center items-center'
          >
            Create Your Wallet
          </button>
        </div>
      ) : (
        <div>
          {!passwordCheck && (
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col gap-1'>
                <label>Password</label>
                <input
                  type='text'
                  placeholder='Password'
                  className='p-2 rounded-xl bg-transparent placeholder:opacity-15 border-gray-400 border'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <label>Confirm Password</label>
                <input
                  type='password'
                  placeholder='Password'
                  className='p-2 rounded-xl bg-transparent placeholder:opacity-15 border-gray-400 border'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button
                className='bg-slate-900 p-2 rounded-lg my-6'
                onClick={handleCreatePassword}
              >
                Continue
              </button>
            </div>
          )}

          {passwordCheck && !inWallet && (
            <div className='flex flex-col gap-2 items-center'>
              <div className='flex flex-wrap gap-4 justify-center w-[500px]'>
                {mnemonic.split(' ').map((item, index) => (
                  <div
                    key={index}
                    className='border rounded-xl  border-gray-500 p-2 px-4 font-semibold'
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className='flex flex-col items-start'>
                <div className='flex gap-1 '>
                  <input
                    type='checkbox'
                    className='bg-transparent border-gray-400 border rounded-xl p-2'
                  />
                  <p className='font-light font-sans text-gray-400'>
                    I have copied the secret phrase securly
                  </p>
                </div>
                <button
                  className='bg-slate-900 p-2 rounded-lg my-6 w-80'
                  onClick={handleCreateWallet}
                >
                  Continue to Wallet
                </button>
              </div>
            </div>
          )}

          {inWallet && (
            <div>
              <h1 className='text-2xl'>No of Wallets : {Wallets.length}</h1>
              <div className='flex gap-4'>
                <select
                  name='wallet'
                  value={currWallet.publicKey}
                  onChange={(event) => {
                    setShowPrivateKey(false)
                    setShowPrivateKeyVerify(false)
                    const wallet = Wallets.find(
                      (wallet) => wallet.publicKey === event.target.value
                    )
                    if (!wallet) return
                    setCurrWallet(wallet)
                  }}
                  className='bg-gray-900 p-2 rounded-lg my-6 w-80'
                >
                  {Wallets.map((wallet, index) => (
                    <option
                      key={index}
                      value={wallet.publicKey}
                      className='bg-gray-900 p-2 rounded-lg my-6 w-80'
                    >
                      {wallet.publicKey}
                    </option>
                  ))}
                </select>
                <button
                  className='bg-slate-900 p-2 rounded-lg my-6'
                  onClick={handleCreateWallet}
                >
                  Create New Wallet
                </button>
              </div>
              <h2>Your PublicKey</h2>
              <p>{currWallet.publicKey}</p>

              <button
                className='bg-slate-900 p-2 rounded-lg my-6 w-80'
                onClick={() => setShowPrivateKeyVerify(true)}
              >
                Show Private Key
              </button>
              {showPrivateKeyVerify && (
                <div className='my-6'>
                  <h2>Enter Password</h2>
                  <div className='flex gap-3'>
                    <input
                      type='password'
                      placeholder='Password'
                      onChange={(e) => setVerifyPassword(e.target.value)}
                      className='p-2 rounded-xl bg-transparent placeholder:opacity-15 border-gray-400 border h-10 items-center justify-center'
                    />
                    <button
                      className='bg-slate-900 p-2 rounded-lg '
                      onClick={() => {
                        if (verifyPassword == password) {
                          setShowPrivateKey(true)
                        } else {
                          alert('Incorrect Password')
                        }
                      }}
                    >
                      Verify
                    </button>
                  </div>
                </div>
              )}
              {showPrivateKey && (
                <div className='flex flex-col gap-2'>
                  <h2>Your Private Key</h2>
                  <div className='max-w-300px bg-gray-900 rounded-xl p-4'>
                    {currWallet.secretKey}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
