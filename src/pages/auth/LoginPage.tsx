import AuthLayout from '@/components/auth/AuthLayout'
import LoginForm from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <AuthLayout showVideo videoHeight={600} videoWidth={500}>
      <LoginForm />
    </AuthLayout>
  )
}
