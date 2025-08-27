import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

export default function AuthSelect() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-6">
      <div className="bg-white bg-opacity-80 backdrop-blur-md p-8 rounded-xl shadow-xl text-center w-full max-w-sm">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">Sign In / Sign Up</h2>
        <div className="space-y-4">
          <Button onClick={() => nav('/candidate/signup')} className="w-full">Candidate Sign Up</Button>
          <Button onClick={() => nav('/candidate/login')} className="w-full bg-gray-200 text-blue-800">Candidate Login</Button>
          <Button onClick={() => nav('/employer/signup')} className="w-full">Employer Sign Up</Button>
          <Button onClick={() => nav('/employer/login')} className="w-full bg-gray-200 text-blue-800">Employer Login</Button>
        </div>
      </div>
    </div>
  );
}
