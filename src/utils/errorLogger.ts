// This is a mock implementation. In a real-world scenario, you'd want to send this to a server or a third-party error tracking service.
export const logError = (error: any) => {
  const errorLog = {
    message: error.message || 'Unknown error',
    stack: error.stack,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
  };

  // In a real implementation, you'd send this to your server or a service like Sentry
  console.log('Logged error:', errorLog);

  // You could also store it in localStorage for debugging purposes
  const storedErrors = JSON.parse(localStorage.getItem('errorLogs') || '[]');
  storedErrors.push(errorLog);
  localStorage.setItem('errorLogs', JSON.stringify(storedErrors));
};