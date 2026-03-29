'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [stores, setStores] = useState<any[]>([])

  const fetchStores = async () => {
    const res = await fetch('/api/get-businesses')
    const data = await res.json()
    setStores(data)
  }

  useEffect(() => {
    fetchStores()
  }, [])

  const handleSubmit = async () => {
    if (loading) return

    setLoading(true)

    try {
      await fetch('/api/create-business', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      })

      setName('')
      setDescription('')
      fetchStores()
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>MAADRIM</h1>

      <input
        placeholder="Business name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Creating...' : 'Create'}
      </button>

      <hr style={{ margin: '30px 0' }} />

      <h2>Stores:</h2>

      {stores.map((store) => (
        <div key={store.id}>
          <strong>{store.name}</strong> - {store.service}
        </div>
      ))}
    </main>
  )
}