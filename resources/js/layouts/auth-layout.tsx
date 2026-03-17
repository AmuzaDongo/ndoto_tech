import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';

export default function AuthLayout({
    children,
    title,
    description,
    ...props
}: {
    children: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <AuthLayoutTemplate title={title} description={description} {...props}>
            <div className='w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl border border-gray-200 py-8 px-4'>
                {children}
            </div>
        </AuthLayoutTemplate>
    );
}
