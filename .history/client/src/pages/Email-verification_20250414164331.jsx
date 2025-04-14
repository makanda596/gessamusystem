import React from 'react'

const Email-verification = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!code) {
            setMessage({ text: 'Please enter verification code', type: 'error' });
            return;
        }

        setIsLoading(true);
        setMessage({ text: '', type: '' });

        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/email-verification`, { code });

            setMessage({
                text: 'Email verified successfully! Redirecting...',
                type: 'success'
            });

            window.location.href = "/home";
        } catch (error) {
            setMessage({
                text: error.response?.data?.message || 'Verification failed. Please try again.',
                type: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };
  return (
    <>
     <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                                Verification Code
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="code"
                                    name="code"
                                    type="text"
                                    required
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Enter 6-digit code"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                            >
                                {isLoading ? 'Verifying...' : 'Verify Email'}
                            </button>
                        </div>
                    </form>
    </>
    
  )
}

export default Email-verification