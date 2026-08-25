import React from 'react'

const Register = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isRunning, setIsRunning] = React.useState<boolean>(false);

  
     async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      setIsRunning(true);
      e.preventDefault();
      try {
        const response = 1;
        console.log(response)
      } catch (err) {
        } finally {
          setIsRunning(false)
        } 
      }

  return (
     <form onSubmit={handleSubmit}>
      <label htmlFor="email">Name</label>
      <input
        id='name'
        type="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="email">Email</label>
      <input
        id='email'
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">Senha</label>
      <input
        id='password'
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" disabled={isRunning}>Enviar</button>
    </form>
  )
}

export default Register