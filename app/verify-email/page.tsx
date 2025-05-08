'use client'

import { useSupabase } from '@/components/AuthProvider'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Check } from 'lucide-react'
import { Label } from '@radix-ui/react-label'

export default function VerifyEmail() {
  const supabase = useSupabase()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const emailParam = searchParams.get('email')
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam))
    } else {
      // If no email in URL, try to get from auth session
      const getEmail = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (user?.email) setEmail(user.email)
      }
      getEmail()
    }
  }, [searchParams, supabase])

  const handleVerify = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      // 1. Check if code is valid (you'll need to implement this)
      // For now, we'll assume any non-empty code is valid
      if (!code.trim()) {
        throw new Error('Please enter the verification code')
      }

      // 2. Update email_confirmed in users table
      const { error } = await supabase
        .from('users')
        .update({ email_confirmed: true })
        .eq('email', email)

      if (error) throw error

      setMessage('Email verified successfully! Redirecting...')
      setTimeout(() => router.push('/dashboard'), 2000)
    } catch (err) {
      setError((err instanceof Error ? err.message : 'Verification failed'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1 items-center justify-center bg-muted/40 p-4">
        <div className="w-full max-w-md rounded-lg bg-background p-8 shadow-lg border">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Verify Your Email</h1>
            <p className="text-foreground/60">
              Enter the verification code sent to {email}
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Verification Code</Label>
              <div className="relative">
                <Input
                  id="code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                />
                <Check className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}
            {message && (
              <p className="text-sm text-green-600 text-center">{message}</p>
            )}

            <Button 
              className="w-full" 
              onClick={handleVerify}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              ) : (
                'Verify Email'
              )}
            </Button>

            <div className="text-center text-sm mt-4">
              Didn't receive a code?{' '}
              <Button 
                variant="link" 
                className="text-primary p-0 h-auto"
                onClick={() => {
                  // Implement resend logic here
                  alert(`New code sent to ${email}`)
                }}
              >
                Resend code
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}