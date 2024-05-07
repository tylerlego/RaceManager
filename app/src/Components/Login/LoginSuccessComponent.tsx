import { useEffect } from 'react';

export default function LoginSuccessComponent() {
  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      window.close();
    }, 1);

    return () => {
      clearTimeout(redirectTimeout);
    };
  }, []);

  return (
    <div>
      <p>Boogity, boogity, boogity...let's go racing!</p>
    </div>
  );
}