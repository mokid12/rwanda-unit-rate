'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

type Joke = { category: string; type: 'single' | 'twopart'; joke?: string; setup?: string; delivery?: string; error?: boolean };
const categories = ['Any', 'Programming', 'Misc', 'Dark', 'Pun', 'Spooky', 'Christmas'];

export default function JokesClient() {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [category, setCategory] = useState('Any');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const getJoke = useCallback(async (selected = category) => {
    setLoading(true); setError('');
    try {
      const response = await fetch(`https://v2.jokeapi.dev/joke/${selected}?type=twopart,single&safe-mode`);
      const data = (await response.json()) as Joke;
      if (!response.ok || data.error) throw new Error('joke unavailable');
      setJoke(data);
    } catch { setError('We could not load a joke. Please try again.'); }
    finally { setLoading(false); }
  }, [category]);
  useEffect(() => { void getJoke(); }, [getJoke]);
  const selectCategory = (value: string) => { setCategory(value); void getJoke(value); };
  return <main className="jokes-shell"><header className="jokes-header"><Link href="/" className="jokes-brand"><span className="brand-badge">RW</span> RWANDA UNIT RATE</Link><Link href="/dashboard" className="secondary-btn">Back to dashboard</Link></header><section className="joke-card"><p className="eyebrow">A quick break between BOQ estimates</p><h1>Random joke generator</h1><p className="joke-intro">Get a safe, random joke from the JokeAPI external service.</p><label className="joke-category-label" htmlFor="joke-category">Category</label><select id="joke-category" value={category} onChange={(event) => selectCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select><div className="joke-display" aria-live="polite">{loading && <p className="joke-status">Finding a joke...</p>}{!loading && error && <p className="error-text">{error}</p>}{!loading && !error && joke && (joke.type === 'twopart' ? <><p className="joke-setup">{joke.setup}</p><p className="joke-delivery">{joke.delivery}</p></> : <p className="joke-setup">{joke.joke}</p>)}</div><button type="button" className="primary-btn joke-button" onClick={() => void getJoke()} disabled={loading}>{loading ? 'Loading...' : 'Tell me another joke'}</button><p className="joke-source">Powered by <a href="https://jokeapi.dev/" target="_blank" rel="noreferrer">JokeAPI</a></p></section></main>;
}
