import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../lib/store';
import { CharacterState } from '../lib/characterSlice'; // Update this import

const CharacterStats: React.FC = () => {
  const character = useSelector((state: RootState) => state.character);

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">{character.name}</h2>
      <p>Race: {character.race}</p>
      <p>Class: {character.class}</p>
      <p>Level: {character.level}</p>
      <h3 className="text-lg font-semibold mt-4 mb-2">Attributes</h3>
      {Object.entries(character.attributes).map(([attr, value]) => (
        <p key={attr}>{attr.charAt(0).toUpperCase() + attr.slice(1)}: {value}</p>
      ))}
      <h3 className="text-lg font-semibold mt-4 mb-2">Skills</h3>
      <p>{Array.from(character.skills).join(', ')}</p>
      <h3 className="text-lg font-semibold mt-4 mb-2">Equipment</h3>
      <p>{character.equipment.join(', ')}</p>
      <h3 className="text-lg font-semibold mt-4 mb-2">Background</h3>
      <p>Name: {character.background.name}</p>
      <p>Personality Traits: {character.background.personalityTraits.join(', ')}</p>
      <p>Ideals: {character.background.ideals.join(', ')}</p>
      <p>Bonds: {character.background.bonds.join(', ')}</p>
      <p>Flaws: {character.background.flaws.join(', ')}</p>
      <h3 className="text-lg font-semibold mt-4 mb-2">Stats</h3>
      <p>Health: {character.health}</p>
      <p>Mana: {character.mana}</p>
      <p>XP: {character.xp}</p>
    </div>
  );
};

export default CharacterStats;