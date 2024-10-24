import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface AnalysisResult {
  instance_ID: number;
  extractedDataDownloadURL?: string;
  'context-before': Array<{ time: number; author: string; message: string }>;
  flagged: Array<{ time: number; author: string; message: string }>;
  'context-after': Array<{ time: number; author: string; message: string }>;
}

interface Report {
  id: string;
  name: string;
  date: string;
  platform: string;
  results: AnalysisResult[];
}

interface ReportsContextType {
  reports: Report[];
  addReport: (report: Report) => void;
}

const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

export const useReports = () => {
  const context = useContext(ReportsContext);
  if (context === undefined) {
    throw new Error('useReports must be used within a ReportsProvider');
  }
  return context;
};

export const ReportsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [reports, setReports] = useState<Report[]>([]);

  const addReport = (report: Report) => {
    setReports((prevReports) => [...prevReports, report]);
  };

  return (
    <ReportsContext.Provider value={{ reports, addReport }}>
      {children}
    </ReportsContext.Provider>
  );
};
