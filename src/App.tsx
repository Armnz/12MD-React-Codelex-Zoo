import React, { useState } from 'react';
import './App.css';

type Animal = {
  id: number;
  name: string;
  species: string;
  gender: 'female' | 'male';
  createdAt: Date;
}

const App: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [newName, setNewName] = useState('');
  const [newSpecies, setNewSpecies] = useState('');
  const [newGender, setNewGender] = useState<'female' | 'male'>('female');

  const addAnimal = () => {
    if (!newName || !newSpecies || !newGender) {
      alert('Please fill out all fields');
      return;
    }

    const newAnimal = {
      id: Math.random(), // Unique ID for each animal
      name: newName,
      species: newSpecies,
      gender: newGender,
      createdAt: new Date() // Store the current date and time
    };

    setAnimals([...animals, newAnimal]);
    setNewName('');
    setNewSpecies('');
    setNewGender('female');
  };

  const deleteAnimal = (id: number) => {
    setAnimals(animals.filter(animal => animal.id !== id));
  };

  const timeSince = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000; // Calculate interval in years
    if (interval > 1) return `${Math.floor(interval)} years ago`;

    interval = seconds / 2592000; // Calculate interval in months
    if (interval > 1) return `${Math.floor(interval)} months ago`;

    interval = seconds / 86400; // Calculate interval in days
    if (interval > 1) return `${Math.floor(interval)} days ago`;

    interval = seconds / 3600; // Calculate interval in hours
    if (interval > 1) return `${Math.floor(interval)} hours ago`;

    interval = seconds / 60; // Calculate interval in minutes
    if (interval > 1) return `${Math.floor(interval)} minutes ago`;

    return `${Math.floor(seconds)} seconds ago`; // Default to seconds
  };

  return (
    <div className="App">
      <h1>Codelex Zoo</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Species"
          value={newSpecies}
          onChange={(e) => setNewSpecies(e.target.value)}
          required
        />
        <select
          value={newGender}
          onChange={(e) => setNewGender(e.target.value as 'female' | 'male')}
        >
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
        <button onClick={addAnimal}>Add</button>
      </div>
      <div className="animal-list">
        {animals.map((animal) => (
          <div key={animal.id} className="animal-card">
            <img src={`https://loremflickr.com/320/240/${animal.species.replace(/\s/g, '_')}`} alt={`${animal.species}`} />
            <h3>{animal.name}</h3>
            <p>Species: {animal.species}</p>
            <p>Gender: {animal.gender}</p>
            <p>Added: {timeSince(animal.createdAt)}</p>
            <button onClick={() => deleteAnimal(animal.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
