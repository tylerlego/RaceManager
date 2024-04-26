import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginSuccessComponent() {
  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      window.close();
    }, 1500);

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