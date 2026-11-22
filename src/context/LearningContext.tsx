'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MASTER_CURRICULUM_150, MasterCurriculumItem } from '@/data/master-catalog/master150Curriculum';

export interface ActiveStudentState {
  currentLevelId: number;
  totalBananas: number;
  completedMissions: number[];
  activeCode: string;
  activeTopic: string;
  smartTrickQuestionCount: number;
}

interface LearningContextType {
  state: ActiveStudentState;
  currentItem: MasterCurriculumItem;
  setLevel: (levelId: number) => void;
  updateActiveCode: (newCode: string) => void;
  addBananas: (amount: number) => void;
  markMissionComplete: (levelId: number) => void;
  triggerNextTrickQuestion: () => void;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLevelId, setCurrentLevelId] = useState<number>(1);
  const [totalBananas, setTotalBananas] = useState<number>(150);
  const [completedMissions, setCompletedMissions] = useState<number[]>([]);
  const [activeCode, setActiveCode] = useState<string>(
    MASTER_CURRICULUM_150[0].codingApproaches.beginnerFriendly.code
  );
  const [smartTrickCount, setSmartTrickCount] = useState<number>(0);

  const currentItem =
    MASTER_CURRICULUM_150.find((m) => m.id === currentLevelId) || MASTER_CURRICULUM_150[0];

  const setLevel = (levelId: number) => {
    const item = MASTER_CURRICULUM_150.find((m) => m.id === levelId) || MASTER_CURRICULUM_150[0];
    setCurrentLevelId(levelId);
    setActiveCode(item.codingApproaches.beginnerFriendly.code);
  };

  const updateActiveCode = (newCode: string) => {
    setActiveCode(newCode);
  };

  const addBananas = (amount: number) => {
    setTotalBananas((prev) => prev + amount);
  };

  const markMissionComplete = (levelId: number) => {
    if (!completedMissions.includes(levelId)) {
      setCompletedMissions((prev) => [...prev, levelId]);
      addBananas(50);
    }
  };

  const triggerNextTrickQuestion = () => {
    setSmartTrickCount((prev) => prev + 1);
  };

  return (
    <LearningContext.Provider
      value={{
        state: {
          currentLevelId,
          totalBananas,
          completedMissions,
          activeCode,
          activeTopic: currentItem.title,
          smartTrickQuestionCount: smartTrickCount
        },
        currentItem,
        setLevel,
        updateActiveCode,
        addBananas,
        markMissionComplete,
        triggerNextTrickQuestion
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearningContext = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearningContext must be used within a LearningProvider');
  }
  return context;
};
