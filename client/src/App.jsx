import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/Login';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import Subjects from './pages/Subjects';
import SubjectDetail from './pages/SubjectDetail';
import StudyMaterial from './pages/StudyMaterial';
import SearchPage from './pages/Search';
import Bookmarks from './pages/Bookmarks';
import PracticeHub from './pages/Practice';
import MCQsPage from './pages/MCQsPage';
import CodingPractice from './pages/Coding';
import SQLPractice from './pages/SQLPractice';
import Flashcards from './pages/Flashcards';
import MockInterview from './pages/MockInterview';
import RevisionMode from './pages/Revision';
import ProgressPage from './pages/Progress';
import SettingsPage from './pages/Settings';
import QuestionsPage from './pages/Questions';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes (Requires verified Google SSO session) */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/subjects" element={<Subjects />} />
              <Route path="/subjects/:subject" element={<SubjectDetail />} />
              <Route path="/topic/:topicId" element={<StudyMaterial />} />
              <Route path="/topics/:topicId" element={<StudyMaterial />} />
              <Route path="/learn/:topicId" element={<StudyMaterial />} />
              <Route path="/learn" element={<Navigate to="/subjects" replace />} />
              <Route path="/questions" element={<QuestionsPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/practice" element={<PracticeHub />} />
              <Route path="/practice/mcqs" element={<MCQsPage />} />
              <Route path="/mcqs" element={<MCQsPage />} />
              <Route path="/coding" element={<CodingPractice />} />
              <Route path="/sql" element={<SQLPractice />} />
              <Route path="/flashcards" element={<Flashcards />} />
              <Route path="/mock-interview" element={<MockInterview />} />
              <Route path="/revision" element={<RevisionMode />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Route>

          {/* Fallback 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
