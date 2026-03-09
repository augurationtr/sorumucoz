'use client'
import { useState } from 'react'
import { supabase } from '../supabase'
import { useRouter } from 'next/navigation'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [mesaj, setMesaj] = useState('')
  const router = useRouter()

  async function handleGiris() {
    setLoading(true)
    setMesaj('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMesaj('Hata: ' + error.message)
    else router.push('/')
    setLoading(false)
  }

  return (
    <main style={{minHeight:'100vh',background:'#f0f4ff',display:'flex',alignItems:'center',justifyContent:'center',padding:'16px'}}>
      <div style={{background:'white',borderRadius:'24px',border:'2px solid #d0d9f0',padding:'32px',width:'100%',maxWidth:'380px',boxShadow:'0 8px 30px rgba(26,86,232,0.1)'}}>
        <div style={{textAlign:'center',marginBottom:'32px'}}>
          <div style={{width:'56px',height:'56px',background:'#1a56e8',borderRadius:'16px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'24px',margin:'0 auto 12px'}}>📚</div>
          <div style={{fontWeight:'900',fontSize:'24px',color:'#0f1b3d'}}>Sorumu<span style={{color:'#ff6b1a'}}>Çöz</span></div>
          <div style={{fontSize:'13px',color:'#8892b0',marginTop:'4px'}}>YKS 2026 Hazırlık Platformu</div>
        </div>
        <input
          type="email"
          placeholder="📧 E-posta"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{width:'100%',background:'#f0f4ff',border:'2px solid #d0d9f0',borderRadius:'12px',padding:'12px 16px',fontSize:'14px',outline:'none',boxSizing:'border-box',fontFamily:'inherit',color:'#0f1b3d',marginBottom:'12px',display:'block'}}
        />
        <input
          type="password"
          placeholder="🔒 Şifre"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{width:'100%',background:'#f0f4ff',border:'2px solid #d0d9f0',borderRadius:'12px',padding:'12px 16px',fontSize:'14px',outline:'none',boxSizing:'border-box',fontFamily:'inherit',color:'#0f1b3d',marginBottom:'12px',display:'block'}}
        />
        {mesaj && (
          <div style={{padding:'12px',borderRadius:'12px',fontSize:'13px',fontWeight:'600',background:mesaj.includes('Hata') ? '#fff0f0' : '#f0fff4',color:mesaj.includes('Hata') ? '#dc2626' : '#16a34a',marginBottom:'12px'}}>
            {mesaj}
          </div>
        )}
        <button
          onClick={handleGiris}
          disabled={loading}
          style={{width:'100%',padding:'14px',background:'#1a56e8',color:'white',fontWeight:'900',borderRadius:'12px',fontSize:'14px',border:'none',cursor:'pointer',fontFamily:'inherit'}}
        >
          {loading ? '⏳ Bekle...' : 'Giriş Yap'}
        </button>
        <div style={{textAlign:'center',marginTop:'16px'}}>
          <a href="/" style={{fontSize:'13px',color:'#8892b0',textDecoration:'none',fontWeight:'600'}}>← Ana Sayfaya Dön</a>
        </div>
      </div>
    </main>
  )
}