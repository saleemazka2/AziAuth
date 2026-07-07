import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Sign In to AziAuth
        </h1>
        <SignIn
          appearance={{
            baseTheme: undefined,
            elements: {
              cardBox: 'shadow-lg rounded-lg',
              card: 'bg-white',
              header__title: 'text-2xl font-bold text-gray-900',
              header__subtitle: 'text-gray-600',
              socialButtonsBlockButton:
                'border-2 border-gray-300 hover:border-blue-600 transition-colors',
              formFieldInput:
                'border-2 border-gray-300 rounded focus:border-blue-600 focus:outline-none',
              formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2',
              footerActionLink: 'text-blue-600 hover:text-blue-700',
            },
          }}
        />
      </div>
    </div>
  );
}
